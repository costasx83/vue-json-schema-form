import Ajv from 'ajv';
import i18n from '../i18n';
import retrieveSchema from './retriev';

import {
    isObject, deepEquals
} from '../utils';
import { getUserErrOptions } from '../formUtils';

let ajv = createAjvInstance();

let formerCustomFormats = null;
let formerMetaSchema = null;

// Create instance
function createAjvInstance() {
    const ajvInstance = new Ajv({
        errorDataPath: 'property',
        allErrors: true,
        multipleOfPrecision: 8,
        schemaId: 'auto',
        unknownFormats: 'ignore',
    });

    // 添加base-64 format
    ajvInstance.addFormat(
        'data-url',
        /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/
    );

    // 添加color format
    ajvInstance.addFormat(
        'color',
        // eslint-disable-next-line max-len
        /^(#?([0-9A-Fa-f]{3,4}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgba?|hsla?)\(.*\))$/
    );
    return ajvInstance;
}

/**
 * Transform error output from ajv to the format used by jsonschema
 * At some point, components should be updated to support ajv.
 */
function transformAjvErrors(errors = []) {
    if (errors === null) {
        return [];
    }

    return errors.map((e) => {
        const {
            dataPath, keyword, message, params, schemaPath
        } = e;
        const property = `${dataPath}`;

        // put data in expected format
        return {
            name: keyword,
            property,
            message,
            params, // specific to ajv
            stack: `${property} ${message}`.trim(),
            schemaPath,
        };
    });
}

/**
 * Validate formData through schema and return error information
 * @param formData Data to validate
 * @param schema
 * @param transformErrors function - Transform errors, such as personalized configuration
 * @param additionalMetaSchemas Array - Add ajv metaSchema
 * @param customFormats Add ajv custom formats
 * @returns {{errors: ([]|{stack: string, schemaPath: *, name: *, property: string, message: *, params: *}[])}}
 */
export function ajvValidateFormData({
    formData,
    schema,
    transformErrors,
    additionalMetaSchemas = [],
    customFormats = {}
} = {}) {
    const hasNewMetaSchemas = !deepEquals(formerMetaSchema, additionalMetaSchemas);
    const hasNewFormats = !deepEquals(formerCustomFormats, customFormats);

    // Changed Meta or adjusted format config, reset new instance
    if (hasNewMetaSchemas || hasNewFormats) {
        ajv = createAjvInstance();
    }

    // Add more schemas to validate
    if (
        additionalMetaSchemas
        && hasNewMetaSchemas
        && Array.isArray(additionalMetaSchemas)
    ) {
        ajv.addMetaSchema(additionalMetaSchemas);
        formerMetaSchema = additionalMetaSchemas;
    }

    // Register custom formats - unchanged, register only once - otherwise recreate instance
    if (customFormats && hasNewFormats && isObject(customFormats)) {
        Object.keys(customFormats).forEach((formatName) => {
            ajv.addFormat(formatName, customFormats[formatName]);
        });

        formerCustomFormats = customFormats;
    }

    let validationError = null;
    try {
        ajv.validate(schema, formData);
    } catch (err) {
        validationError = err;
    }

    // ajv default multilingual processing
    i18n.getCurrentLocalize()(ajv.errors);

    let errors = transformAjvErrors(ajv.errors);

    // Clear errors
    ajv.errors = null;

    // Handle exceptions
    const noProperMetaSchema = validationError
        && validationError.message
        && typeof validationError.message === 'string'
        && validationError.message.includes('no schema with key or ref ');

    if (noProperMetaSchema) {
        errors = [
            ...errors,
            {
                stack: validationError.message,
            },
        ];
    }

    // Transform errors, such as passing in custom errors
    if (typeof transformErrors === 'function') {
        errors = transformErrors(errors);
    }

    return {
        errors
    };
}

// Validate formData and transform error messages
export function validateFormDataAndTransformMsg({
    formData,
    schema,
    uiSchema,
    transformErrors,
    additionalMetaSchemas = [],
    customFormats = {},
    errorSchema = {},
    required = false,
    propPath = '',
    isOnlyFirstError = true, // Only take first error message
} = {}) {
    // Whether to filter root node errors, fixed to root only
    const filterRootNodeError = true;

    // Validate required information, isEmpty check
    // Special handling for array types configured with format
    const emptyArray = (schema.type === 'array' && Array.isArray(formData) && formData.length === 0);
    const isEmpty = formData === undefined || emptyArray;

    if (required) {
        if (isEmpty) {
            const requireErrObj = {
                keyword: 'required',
                params: {
                    missingProperty: propPath
                }
            };

            // User set validation message
            const errSchemaMsg = getUserErrOptions({
                schema,
                uiSchema,
                errorSchema
            }).required;
            if (errSchemaMsg) {
                requireErrObj.message = errSchemaMsg;
            } else {
                // Process multilingual require message (ajv modifies original reference)
                i18n.getCurrentLocalize()([requireErrObj]);
            }
            return [requireErrObj];
        }
    } else if (isEmpty && !emptyArray) {
        // Non-required, empty, validation passes
        return [];
    }

    // Validate ajv error messages
    let ajvErrors = ajvValidateFormData({
        formData,
        schema,
        transformErrors,
        additionalMetaSchemas,
        customFormats,
    }).errors;

    // Filter top-level errors
    if (filterRootNodeError) {
        ajvErrors = ajvErrors.filter(
            item => (item.property === ''
                && (!item.schemaPath.includes('#/anyOf/') && !item.schemaPath.includes('#/oneOf/')))
            || item.name === 'additionalProperties'
        );
    }

    const userErrOptions = getUserErrOptions({
        schema,
        uiSchema,
        errorSchema
    });

    return (isOnlyFirstError && ajvErrors.length > 0 ? [ajvErrors[0]] : ajvErrors).reduce((preErrors, errorItem) => {
        // Get errorSchema config with priority
        errorItem.message = userErrOptions[errorItem.name] !== undefined ? userErrOptions[errorItem.name] : errorItem.message;
        preErrors.push(errorItem);
        return preErrors;
    }, []);
}

/**
 * Validate data according to schema, return true if data is valid, otherwise return false. If schema is invalid, this function will return false.
 * @param schema
 * @param data
 * @returns {boolean|PromiseLike<any>}
 */
export function isValid(schema, data) {
    try {
        return ajv.validate(schema, data);
    } catch (e) {
        return false;
    }
}

// ajv valida
export function ajvValid(schema, data) {
    return ajv.validate(schema, data);
}

// If not found
// return -1
export function getMatchingIndex(formData, options, rootSchema, haveAllFields = false) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < options.length; i++) {
        const option = retrieveSchema(options[i], rootSchema, formData);

        // If the schema describes an object then we need to add slightly more
        // strict matching to the schema, because unless the schema uses the
        // "requires" keyword, an object will match the schema as long as it
        // doesn't have matching keys with a conflicting type. To do this we use an
        // "anyOf" with an array of requires. This augmentation expresses that the
        // schema should match if any of the keys in the schema are present on the
        // object and pass validation.
        if (option.properties) {
            // Create an "anyOf" schema that requires at least one of the keys in the
            // "properties" object
            const requiresAnyOf = {
                // If descendant nodes have $ref, need normal reference
                ...(rootSchema.definitions ? {
                    definitions: rootSchema.definitions
                } : {}),
                anyOf: Object.keys(option.properties).map(key => ({
                    required: [key],
                })),
            };

            let augmentedSchema;

            // If the "anyOf" keyword already exists, wrap the augmentation in an "allOf"
            if (option.anyOf) {
                // Create a shallow clone of the option
                const { ...shallowClone } = option;

                if (!shallowClone.allOf) {
                    shallowClone.allOf = [];
                } else {
                    // If "allOf" already exists, shallow clone the array
                    shallowClone.allOf = shallowClone.allOf.slice();
                }

                shallowClone.allOf.push(requiresAnyOf);

                augmentedSchema = shallowClone;
            } else {
                augmentedSchema = Object.assign({}, option, requiresAnyOf);
            }

            // Remove the "required" field as it's likely that not all fields have
            // been filled in yet, which will mean that the schema is not valid

            // For edit backfill data scenarios, can directly use required for judgment
            if (!haveAllFields) delete augmentedSchema.required;


            if (isValid(augmentedSchema, formData)) {
                return i;
            }
        } else if (isValid(option, formData)) {
            return i;
        }
    }

    // Try to find const config
    if (options[0] && options[0].properties) {
        const constProperty = Object.keys(options[0].properties).find(k => options[0].properties[k].const);
        if (constProperty) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < options.length; i++) {
                if (
                    options[i].properties
                    && options[i].properties[constProperty]
                    && options[i].properties[constProperty].const === formData[constProperty]) {
                    return i;
                }
            }
        }
    }
    return -1;
}

// oneOf anyOf find current matching item index through formData value
export function getMatchingOption(formData, options, rootSchema, haveAllFields = false) {
    const index = getMatchingIndex(formData, options, rootSchema, haveAllFields);
    return index === -1 ? 0 : index;
}

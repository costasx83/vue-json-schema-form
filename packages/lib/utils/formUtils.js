import retrieveSchema from './schema/retriev';
import { getPathVal } from './vueCommonUtils';

import { getSchemaType, isObject } from './utils';

// General expression handling method
// This breaks the JSON Schema specification
const regExpression = /{{(.*)}}/;
function handleExpression(rootFormData, curNodePath, expression, fallBack) {
    // Not configured
    if (undefined === expression) {
        return undefined;
    }

    // Configured mustache expression
    const matchExpression = regExpression.exec(expression);
    regExpression.lastIndex = 0; // Reset index
    if (matchExpression) {
        const code = matchExpression[1].trim();

        // eslint-disable-next-line no-new-func
        const fn = new Function('parentFormData', 'rootFormData', `return ${code}`);

        return fn(getPathVal(rootFormData, curNodePath, 1), rootFormData);
    }

    // Fallback
    return fallBack();
}

export function replaceArrayIndex({ schema, uiSchema } = {}, index) {
    const itemUiOptions = getUiOptions({
        schema,
        uiSchema,
        containsSpec: false
    });

    return ['title', 'description'].reduce((preVal, curItem) => {
        if (itemUiOptions[curItem]) {
            preVal[`ui:${curItem}`] = String(itemUiOptions[curItem]).replace(/\$index/g, index + 1);
        }
        return preVal;
    }, {});
}

// Is hidden Widget
export function isHiddenWidget({
    schema = {},
    uiSchema = {},
    curNodePath = '',
    rootFormData = {}
}) {
    const widget = uiSchema['ui:widget'] || schema['ui:widget'];
    const hiddenExpression = uiSchema['ui:hidden'] || schema['ui:hidden'];

    // Support configuring ui:hidden expression
    return widget === 'HiddenWidget'
        || widget === 'hidden'
        || !!handleExpression(rootFormData, curNodePath, hiddenExpression, () => {
            // Configured function
            if (typeof hiddenExpression === 'function') {
                return hiddenExpression(getPathVal(rootFormData, curNodePath, 1), rootFormData);
            }

            // Configured constant ??
            return hiddenExpression;
        });
}

// Resolve current node ui field
export function getUiField(FIELDS_MAP, {
    schema = {},
    uiSchema = {},
}) {
    const field = schema['ui:field'] || uiSchema['ui:field'];

    // Vue component, or registered component name
    if (typeof field === 'function' || typeof field === 'object' || typeof field === 'string') {
        return {
            field,
            fieldProps: uiSchema['ui:fieldProps'] || schema['ui:fieldProps'], // Custom field, support passing additional props
        };
    }

    // Type default field
    const fieldCtor = FIELDS_MAP[getSchemaType(schema)];
    if (fieldCtor) {
        return {
            field: fieldCtor
        };
    }

    // If contains oneOf anyOf return empty without error
    // SchemaField will append oneOf anyOf information
    if (!fieldCtor && (schema.anyOf || schema.oneOf)) {
        return {
            field: null
        };
    }

    // Unsupported type
    console.error('Current schema:', schema);
    throw new Error(`Unsupported field type, type: ${schema.type}`);
}

// Resolve user configured uiSchema options
export function getUserUiOptions({
    schema = {},
    uiSchema = {},
    curNodePath, // undefined does not process expression
    rootFormData = {}
}) {
    // Support uiSchema configured in schema file
    return Object.assign({}, ...[schema, uiSchema].map(itemSchema => Object.keys(itemSchema)
        .reduce((options, key) => {
            const value = itemSchema[key];
            // Merge options inside and outside
            if (key === 'ui:options' && isObject(value)) {
                return { ...options, ...value };
            }

            // https://github.com/lljj-x/vue-json-schema-form/issues/170
            // ui:hidden needs to be used as a built-in property and cannot be directly passed to widget component.
            //  If component needs it, it can only be passed using hidden in ui:options
            if (key !== 'ui:hidden') {
                // Handle ui:xxx parameters
                if (key.indexOf('ui:') === 0) {
                    // Only support expression for ui:xxx configuration format
                    return {
                        ...options,
                        [key.substring(3)]: curNodePath === undefined ? value : handleExpression(rootFormData, curNodePath, value, () => value)
                    };
                }

                // Handle fui:xxx parameters, support all options configured through function
                if (key.indexOf('fui:') === 0) {
                    return {
                        ...options,
                        [key.substring(4)]: value.call(
                            null,
                            getPathVal(rootFormData, curNodePath, 1),
                            rootFormData,
                            curNodePath
                        )
                    };
                }
            }

            return options;
        }, {})));
}

// Resolve ui options parameters of current node
export function getUiOptions({
    schema = {},
    uiSchema = {},
    containsSpec = true,
    curNodePath,
    rootFormData,
}) {
    const spec = {};
    if (containsSpec) {
        spec.readonly = !!schema.readOnly;
        if (undefined !== schema.multipleOf) {
            // Component counter step
            spec.step = schema.multipleOf;
        }
        if (schema.minimum || schema.minimum === 0) {
            spec.min = schema.minimum;
        }
        if (schema.maximum || schema.maximum === 0) {
            spec.max = schema.maximum;
        }

        if (schema.minLength || schema.minLength === 0) {
            spec.minlength = schema.minLength;
        }
        if (schema.maxLength || schema.maxLength === 0) {
            spec.maxlength = schema.maxLength;
        }

        if (schema.format === 'date-time' || schema.format === 'date') {
            // Array type time range
            // Breaks schema specification, type array configured with format
            if (schema.type === 'array') {
                spec.isRange = true;
                spec.isNumberValue = !(schema.items && schema.items.type === 'string');
            } else {
                // String ISO time
                spec.isNumberValue = !(schema.type === 'string');
            }
        }
    }

    if (schema.title) spec.title = schema.title;
    if (schema.description) spec.description = schema.description;

    // Calculate ui configuration
    return {
        ...spec,

        // User configuration has highest priority
        ...getUserUiOptions({
            schema,
            uiSchema,
            curNodePath,
            rootFormData
        })
    };
}

// Get ui configuration of current node (options + widget)
// Process into format needed by Widget component
export function getWidgetConfig({
    schema = {},
    uiSchema = {},
    curNodePath,
    rootFormData,
}, fallback = null) {
    const uiOptions = getUiOptions({
        schema,
        uiSchema,
        curNodePath,
        rootFormData,
    });

    // No Widget configured, each Field component judges by type
    if (!uiOptions.widget && fallback) {
        Object.assign(uiOptions, fallback({
            schema,
            uiSchema
        }));
    }

    const {
        widget,
        title: label,
        labelWidth,
        description,
        attrs: widgetAttrs,
        class: widgetClass,
        style: widgetStyle,
        widgetListeners,
        fieldAttrs,
        fieldStyle,
        fieldClass,
        emptyValue,
        width,
        getWidget,
        renderScopedSlots,
        renderChildren,
        onChange,
        required: uiRequired,
        ...uiProps
    } = uiOptions;

    return {
        widget,
        label,
        labelWidth,
        description,
        widgetAttrs,
        widgetClass,
        widgetStyle,
        fieldAttrs,
        width,
        fieldStyle,
        fieldClass,
        emptyValue,
        getWidget,
        renderScopedSlots,
        renderChildren,
        onChange,
        widgetListeners,
        uiProps,
        uiRequired
    };
}

// Resolve user configured errorSchema options
export function getUserErrOptions({
    schema = {},
    uiSchema = {},
    errorSchema = {}
}) {
    return Object.assign({}, ...[schema, uiSchema, errorSchema].map(itemSchema => Object.keys(itemSchema)
        .reduce((options, key) => {
            const value = itemSchema[key];
            // options 内外合并
            if (key === 'err:options' && isObject(value)) {
                return { ...options, ...value };
            }

            if (key.indexOf('err:') === 0) {
                return { ...options, [key.substring(4)]: value };
            }

            return options;
        }, {})));
}

// ui:order object-> properties sorting
export function orderProperties(properties, order) {
    if (!Array.isArray(order)) {
        return properties;
    }

    const arrayToHash = arr => arr.reduce((prev, curr) => {
        prev[curr] = true;
        return prev;
    }, {});
    const errorPropList = arr => (arr.length > 1
        ? `properties '${arr.join("', '")}'`
        : `property '${arr[0]}'`);
    const propertyHash = arrayToHash(properties);
    const orderFiltered = order.filter(
        prop => prop === '*' || propertyHash[prop]
    );
    const orderHash = arrayToHash(orderFiltered);

    const rest = properties.filter(prop => !orderHash[prop]);
    const restIndex = orderFiltered.indexOf('*');
    if (restIndex === -1) {
        if (rest.length) {
            throw new Error(
                `uiSchema order list does not contain ${errorPropList(rest)}`
            );
        }
        return orderFiltered;
    }
    if (restIndex !== orderFiltered.lastIndexOf('*')) {
        throw new Error('uiSchema order list contains more than one wildcard item');
    }

    const complete = [...orderFiltered];
    complete.splice(restIndex, 1, ...rest);
    return complete;
}

/**
 * Single match
 * Constant, or only one enum
 */
export function isConstant(schema) {
    return (
        (Array.isArray(schema.enum) && schema.enum.length === 1)
        || schema.hasOwnProperty('const')
    );
}

export function toConstant(schema) {
    if (Array.isArray(schema.enum) && schema.enum.length === 1) {
        return schema.enum[0];
    } if (schema.hasOwnProperty('const')) {
        return schema.const;
    }
    throw new Error('schema cannot be inferred as a constant');
}

/**
 * Is select list
 * Enum or oneOf anyOf where each item has only one fixed constant value
 * @param _schema
 * @param rootSchema
 * @returns {boolean|*}
 */
export function isSelect(_schema, rootSchema = {}) {
    const schema = retrieveSchema(_schema, rootSchema);
    const altSchemas = schema.oneOf || schema.anyOf;
    if (Array.isArray(schema.enum)) {
        return true;
    } if (Array.isArray(altSchemas)) {
        return altSchemas.every(altSchemasItem => isConstant(altSchemasItem));
    }
    return false;
}

// Items are all objects
export function isFixedItems(schema) {
    return (
        Array.isArray(schema.items)
        && schema.items.length > 0
        && schema.items.every(item => isObject(item))
    );
}

// Is multi-select
export function isMultiSelect(schema, rootSchema = {}) {
    if (!schema.uniqueItems || !schema.items) {
        return false;
    }
    return isSelect(schema.items, rootSchema);
}

// array additionalItems
// https://json-schema.org/understanding-json-schema/reference/array.html#tuple-validation
export function allowAdditionalItems(schema) {
    if (schema.additionalItems === true) {
        console.warn('additionalItems=true is currently not supported');
    }
    return isObject(schema.additionalItems);
}

// Dropdown options
export function optionsList(schema, uiSchema, curNodePath, rootFormData) {
    // enum
    if (schema.enum) {
        const uiOptions = getUserUiOptions({
            schema,
            uiSchema,
            curNodePath,
            rootFormData
        });

        // ui configured enumNames has priority
        const enumNames = uiOptions.enumNames || schema.enumNames;
        return schema.enum.map((value, i) => {
            const label = (enumNames && enumNames[i]) || String(value);
            return { label, value };
        });
    }

    // oneOf | anyOf
    const altSchemas = schema.oneOf || schema.anyOf;
    const altUiSchemas = uiSchema.oneOf || uiSchema.anyOf;
    return altSchemas.map((curSchema, i) => {
        const uiOptions = (altUiSchemas && altUiSchemas[i]) ? getUserUiOptions({
            schema: curSchema,
            uiSchema: altUiSchemas[i],
            curNodePath,
            rootFormData
        }) : {};
        const value = toConstant(curSchema);
        const label = uiOptions.title || curSchema.title || String(value);
        return { label, value };
    });

}

export function fallbackLabel(oriLabel, isFallback, curNodePath) {
    if (oriLabel) return oriLabel;
    if (isFallback) {
        const backLabel = curNodePath.split('.').pop();

        // Filter pure numeric strings
        if (backLabel && (backLabel !== `${Number(backLabel)}`)) return backLabel;
    }

    return '';
}

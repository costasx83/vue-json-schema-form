/**
 * Created by Liu.Jun on 2020/3/31 11:30 AM.
 */

import { getDefaultFormState } from '@lljj/vue3-form-vuetify';
import { genId } from 'demo-common/utils/id';
import { isObject, isEmptyObject } from './utils';

// Generate a new editor item
export function generateEditorItem(toolItem) {
    const currentComponentPack = toolItem.componentPack;

    const ids = [currentComponentPack.viewSchema.format, currentComponentPack.viewSchema.type, genId()];
    const id = ids.filter(item => !!item).join('_');

    return {
        ...toolItem,
        isEdit: false,
        toolBar: {
            moveDownDisabled: false,
            moveUpDisabled: false,
            copyDisabled: false,
            removeDisabled: false,
        },
        componentValue: {
            ...!toolItem.componentValue || isEmptyObject(toolItem.componentValue) ? getDefaultFormState(
                currentComponentPack.propsSchema,
                {}, // Initial value is empty
                currentComponentPack.propsSchema
            ) : toolItem.componentValue,
            property: (toolItem.componentValue && toolItem.componentValue.property) || id
        },
        id,
        ...(currentComponentPack.viewSchema.properties || (currentComponentPack.viewSchema.items && currentComponentPack.viewSchema.items.properties))
            ? { childList: [] }
            : {}
    };
}

// Format formLabel
export function formatFormLabelWidth(value) {
    return value ? `${value * 4}px` : undefined;
}

// Convert back
export function deFormatFormLabelWidth(value) {
    return parseFloat(value) / 4;
}

function filterObj(obj, filter = (key, value) => (isObject(value) && !isEmptyObject(value)) || value !== undefined) {
    const result = {};
    if (!isObject(obj)) return result;

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const filterVal = filter(key, obj[key]);
            // Return value is Bool
            const isBoolOrUndefined = filterVal === undefined || Boolean(filterVal) === filterVal;

            // If it's a Boolean type, use the original value
            if (isBoolOrUndefined && filterVal) {
                result[key] = obj[key];
            }

            // For non-Boolean types, use the returned value
            if (!isBoolOrUndefined) {
                result[key] = filterVal;
            }
        }
    }

    return result;
}

export function editorItem2SchemaFieldProps(editorItem, formData) {
    // baseValue
    const {
        schemaOptions: baseSchemaOptions,
        uiOptions: {
            required,
            ...baseUiOptions
        } = {}
    } = editorItem.componentValue.baseValue;

    // options
    const {
        schemaOptions,
        uiOptions
    } = editorItem.componentValue.options || {};

    // rules
    const {
        schemaOptions: ruleSchemaOptions,
        uiOptions: ruleUiOptions,
    } = editorItem.componentValue.rules || {};

    // schema
    const schema = {
        ...JSON.parse(JSON.stringify(editorItem.componentPack.viewSchema)),
        ...filterObj({
            ...baseSchemaOptions,
            ...schemaOptions,
            ...ruleSchemaOptions
        })
    };

    // Attribute values that can be omitted when false
    // todo: This needs optimization to automatically compare default values
    const ignoreAttrs = {
        // slider
        showInput: false,
        showStops: false,
        showInputControls: true,
        showTooltip: true,
        debounce: 300,

        // input number
        controlsPosition: 'default',
        stepStrictly: false,

        // input
        clearable: false,
        disabled: false,
        showPassword: false,
        showWordLimit: false,
        type: 'text',

        showTitle: true,
        showDescription: true,
    };

    // uiSchema
    const {
        hidden, widget, field, fieldProps, ...mergeUiOptions
    } = filterObj({
        ...baseUiOptions,
        ...uiOptions,
        ...ruleUiOptions
    }, (key, value) => {
        // Omit default values
        if (ignoreAttrs[key] === value) return false;

        if (key === 'labelWidth') {
            return formatFormLabelWidth(value);
        }

        // Filter undefined
        return value !== undefined;
    });

    const uiSchema = {
        ...Object.entries({
            hidden, widget, field, fieldProps
        }).reduce((preVal, [key, value]) => {
            if (value !== undefined) {
                preVal[`ui:${key}`] = value;
            }
            return preVal;
        }, {}),
        ...isEmptyObject(mergeUiOptions) ? {} : {
            'ui:options': mergeUiOptions
        }
    };

    return {
        rootSchema: schema,
        schema,
        required,
        rootFormData: formData,
        curNodePath: editorItem.componentValue.property || '',
        uiSchema
    };
}

function genBaseObj() {
    return {
        type: 'object',
        required: [],
        properties: {},
        'ui:order': []
    };
}

export function componentList2JsonSchema(componentList) {
    const baseObj = genBaseObj();

    let parentObj = baseObj;
    let queue = [{ $$parentFlag: parentObj }, ...componentList];

    const hasChild = data => Array.isArray(data.childList) && data.childList.length > 0;

    // Breadth-first queue, mark parent node simultaneously
    while (queue.length) {
        // Dequeue
        const item = queue.shift();

        // Mark node, switch parent
        if (item.$$parentFlag) {
            parentObj = item.$$parentFlag;
        } else {
            const { schema, required, uiSchema } = editorItem2SchemaFieldProps(item, {});
            const curSchema = {
                ...schema,
                ...uiSchema
            };

            // Enqueue
            if (hasChild(item)) {
                queue = [...queue, { $$parentFlag: curSchema }, ...item.childList];
            }

            // Connect data
            (parentObj.properties || parentObj.items.properties)[item.componentValue.property] = curSchema;

            // Set ui:order
            (parentObj['ui:order'] || parentObj.items['ui:order']).push(item.componentValue.property);

            // Set required
            if (required) {
                (parentObj.required || parentObj.items.required).push(item.componentValue.property);
            }
        }
    }

    return baseObj;
}

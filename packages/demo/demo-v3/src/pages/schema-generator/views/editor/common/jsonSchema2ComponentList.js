/**
 * Created by Liu.Jun on 2020/12/9 16:59.
 */

import { formUtils, getDefaultFormState } from '@lljj/vue3-form-vuetify';
import { generateEditorItem, deFormatFormLabelWidth } from './editorData';
import { isObject } from './utils';

function flatToolItems(toolItems) {
    return toolItems.reduce((preVal, curVal) => [
        ...preVal,
        ...curVal.componentList
    ], []);
}

const getDefaultFormDataBySchema = (() => {
    // cache to avoid redundant calculations
    const cacheValueMap = new Map();

    return (schema) => {
        if (!cacheValueMap.has(schema)) {
            // Get configured data structure
            const formData = getDefaultFormState(schema, {}, schema);
            cacheValueMap.set(schema, formData);
        }

        return cacheValueMap.get(schema);
    };
})();

function schemaIncludes(target = {}, baseSchema = {}) {
    const keys = Object.keys(baseSchema);
    return keys.every((k) => {
        // Skip title attribute
        if (k === 'title') return true;

        // Array type does not need comparison for now
        if (Array.isArray(target[k])) return true;

        // Object recursion
        if (isObject(target[k]) && isObject(baseSchema[k])) {
            return schemaIncludes(target[k], baseSchema[k]);
        }

        return target[k] === baseSchema[k];
    });
}

function viewSchemaMatch(target, toolItem) {
    const baseViewSchema = toolItem.componentPack.viewSchema;

    // Calculate if target contains toolItem
    // If imported property contains ui:widget then original value must also contain it
    return schemaIncludes(target, baseViewSchema)
        && (target['ui:widget'] ? !!baseViewSchema['ui:widget'] : true)
        && (target.format ? !!baseViewSchema.format : true);
}

const errorNode = [];

function getUserConfigByViewSchema(curSchema, toolConfigList) {
    const toolItem = toolConfigList.find(item => viewSchemaMatch(curSchema, item));

    if (toolItem) {
        let componentValue = {};

        // Need to calculate value
        if (curSchema.$$key) {
            const curSchemaUiOptions = formUtils.getUserUiOptions({
                schema: curSchema
            });
            const emptyComponentValue = getDefaultFormDataBySchema(toolItem.componentPack.propsSchema);

            componentValue.property = curSchema.$$key;
            componentValue = ['baseValue', 'options', 'rules'].reduce((preVal, curVal) => {
                if (emptyComponentValue[curVal]) {
                    preVal[curVal] = {};

                    const { schemaOptions, uiOptions } = emptyComponentValue[curVal];

                    // Backfill schema options
                    if (schemaOptions) {
                        preVal[curVal].schemaOptions = {};
                        for (const k in schemaOptions) {
                            if (schemaOptions.hasOwnProperty(k)) {
                                const tmpVal = curSchema[k];
                                if (tmpVal !== undefined) preVal[curVal].schemaOptions[k] = tmpVal;
                            }
                        }
                    }

                    // Backfill ui options
                    if (uiOptions) {
                        preVal[curVal].uiOptions = {};
                        for (const k in uiOptions) {
                            if (uiOptions.hasOwnProperty(k)) {
                                const tmpVal = curSchemaUiOptions[k];
                                if (tmpVal !== undefined) preVal[curVal].uiOptions[k] = k === 'labelWidth' ? deFormatFormLabelWidth(tmpVal) : tmpVal;
                            }
                        }
                    }
                }

                return preVal;
            }, componentValue);
        }

        return generateEditorItem({
            ...toolItem,

            // todo: Calculate default value
            componentValue
        });
    }

    // Error only records title and type
    errorNode.push({
        title: curSchema.title,
        type: curSchema.type,
    });

    // Abnormal data
    return null;
}

export default function jsonSchema2ComponentList(code, toolItems) {
    // Clear error messages
    errorNode.length = 0;

    if (String(code).trim() === '') return null;

    const toolConfigList = flatToolItems(toolItems);
    const data = JSON.parse(code);
    const {
        schema, formFooter, formProps, /* uiSchema, */
    } = data;

    // Breadth-first queue
    let eachQueue = [schema];

    // Record output list
    const componentList = [];

    //
    const getChildList = curSchema => (curSchema.$$parentEditorItem && curSchema.$$parentEditorItem.childList) || componentList;

    // Delete additional data
    const deleteAdditionalData = (curSchema) => {
        delete curSchema.$$parentEditorItem;
        delete curSchema.$$key;
    };

    while (eachQueue.length > 0) {
        const curSchema = eachQueue.shift();

        if (curSchema.properties || (curSchema.items && curSchema.items.properties)) {
            // Object || array of objects
            const curObjNode = curSchema.properties ? curSchema : curSchema.items;

            // Calculate current node
            const curItem = getUserConfigByViewSchema(curSchema, toolConfigList);

            // Associate parent-child
            (getChildList(curSchema)).push(curItem);
            deleteAdditionalData(curSchema);

            // Process child nodes
            const properties = Object.keys(curObjNode.properties);
            const orderedProperties = formUtils.orderProperties(properties, curObjNode['ui:order']);

            // Directly extend current node
            const childSchema = orderedProperties.map(item => ({
                $$parentEditorItem: curItem,
                $$key: item,
                ...curObjNode.properties[item],
                'ui:required': curObjNode.required && curObjNode.required.includes(item)
            }));

            eachQueue = [...eachQueue, ...childSchema];
        } else {
            // Calculate current node
            const curItem = getUserConfigByViewSchema(curSchema, toolConfigList);

            // Associate parent-child
            if (curItem) {
                (getChildList(curSchema)).push(curItem);
            }
            deleteAdditionalData(curSchema);
        }
    }

    const formConfig = {};
    if (formFooter) formConfig.formFooter = formFooter;
    if (formProps) {
        formConfig.formProps = {
            ...formProps,
            ...formProps.labelWidth ? {
                labelWidth: deFormatFormLabelWidth(formProps.labelWidth)
            } : {}
        };
    }

    return {
        componentList: componentList[0].childList,
        errorNode,
        formConfig
    };
}

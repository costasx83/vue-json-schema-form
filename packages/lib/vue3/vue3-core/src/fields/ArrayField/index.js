/**
 * Created by Liu.Jun on 2020/4/24 11:23.
 */


import {
    ref, computed, h, watch, toRaw
} from 'vue';

import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';

import {
    allowAdditionalItems, isFixedItems, isMultiSelect, getUserUiOptions
} from '@lljj/vjsf-utils/formUtils';
import { getPathVal, setPathVal } from '@lljj/vjsf-utils/vue3Utils';
import { genId, lowerCase } from '@lljj/vjsf-utils/utils';

import * as arrayMethods from '@lljj/vjsf-utils/arrayUtils';
import Widget from '../../components/Widget';

import vueProps from '../props';

import ArrayFieldNormal from './arrayTypes/ArrayFieldNormal';
import ArrayFieldMultiSelect from './arrayTypes/ArrayFieldMultiSelect';
import ArrayFieldTuple from './arrayTypes/ArrayFieldTuple';
import ArrayFieldSpecialFormat from './arrayTypes/ArrayFieldSpecialFormat';

export default {
    name: 'ArrayField',
    props: vueProps,
    setup(props) {
        // Get current value
        const getCurFormData = () => {
            const { rootFormData, curNodePath } = props;
            const value = getPathVal(rootFormData, curNodePath);

            if (Array.isArray(value)) return value;

            console.error('error: type array, value must be array type');

            return [];
        };

        // Solve list key problem by maintaining a copy of keys and a copy of values
        const formKeys = ref(getCurFormData().map(() => genId()));

        // Current formData
        const curFormData = computed(() => getCurFormData());
        watch(curFormData, (newVal, oldVal) => {
            // Reference type, when values are not equal, it means it has been reassigned
            // Should compare original values here
            if (newVal !== oldVal && toRaw(newVal) !== toRaw(oldVal) && Array.isArray(newVal)) {
                formKeys.value = newVal.map(() => genId());
            }
        }, {
            deep: true
        });

        // FormData with processed keys
        const itemsFormData = computed(() => curFormData.value.map((item, index) => ({
            key: formKeys.value[index],
            value: item
        })));

        // Current node UI configuration
        const uiOptions = computed(() => getUserUiOptions({
            schema: props.schema,
            uiSchema: props.uiSchema,
            curNodePath: props.curNodePath,
            rootFormData: props.rootFormData
        }));

        // Get a new item
        const getNewFormDataRow = () => {
            const { schema, rootSchema } = props;
            let itemSchema = schema.items;

            // https://json-schema.org/understanding-json-schema/reference/array.html#tuple-validation
            // Array as collection of items with additionalItems property needs special handling
            if (isFixedItems(schema) && allowAdditionalItems(schema)) {
                itemSchema = schema.additionalItems;
            }
            return getDefaultFormState(itemSchema, undefined, rootSchema);
        };

        const handleArrayOperate = ({
            command,
            data
        }) => {
            // Uniformly handle array data changes such as add, delete, sort, etc.
            const strategyMap = {
                moveUp(target, { index }) {
                    arrayMethods.moveUpAt(target, index);
                },
                moveDown(target, { index }) {
                    arrayMethods.moveDownAt(target, index);
                },
                remove(target, { index }) {
                    arrayMethods.removeAt(target, index);
                },
                add(target, { newRowData }) {
                    target.push(newRowData);
                },
                batchPush(target, { pushArray }) {
                    pushArray.forEach((item) => {
                        target.push(item);
                    });
                },
                setNewTarget(target, { formData, nodePath, newTarget }) {
                    setPathVal(formData, nodePath, newTarget);
                }
            };

            const curStrategy = strategyMap[command];
            if (curStrategy) {
                let formDataPrams = data;
                let keysParams = data;

                if (command === 'add') {
                    // Single add
                    formDataPrams = { newRowData: getNewFormDataRow() };
                    keysParams = { newRowData: genId() };
                } else if (command === 'batchPush') {
                    // Batch add
                    keysParams = {
                        pushArray: formDataPrams.pushArray.map(item => genId())
                    };
                } else if (command === 'setNewTarget') {
                    // Set
                    formDataPrams = {
                        formData: props.rootFormData,
                        nodePath: props.curNodePath,
                        newTarget: formDataPrams.newTarget
                    };
                    keysParams = {
                        formData: formKeys,
                        nodePath: 'value',
                        newTarget: formDataPrams.newTarget.map(item => genId())
                    };
                }

                // Sync modify formData keys
                curStrategy.apply(null, [formKeys.value, keysParams]);

                // Modify formData data
                curStrategy.apply(null, [curFormData.value, formDataPrams]);

                // onArrayOperate
                if (uiOptions.value.afterArrayOperate) {
                    this.uiOptions.afterArrayOperate.call(null, curFormData.value, command, data);
                }
            } else {
                throw new Error(`Error - Unknown operation: [${command}]`);
            }
        };

        return () => {
            const {
                schema,
                uiSchema,
                rootSchema,
                rootFormData,
                curNodePath,
                globalOptions
            } = props;

            if (!schema.hasOwnProperty('items')) {
                throw new Error(`[${schema}] Please define items property first`);
            }

            // Multi-select type
            if (isMultiSelect(schema, rootSchema)) {
                // item is enum fixed value
                return h(ArrayFieldMultiSelect, {
                    ...props,
                    class: {
                        [lowerCase(ArrayFieldMultiSelect.name)]: true
                    }
                });
            }

            // Special handling for date datetime time url-upload
            // array supports ui:widget configuration
            // Date time range or ui:widget special configuration
            if (schema.format || schema['ui:widget'] || uiSchema['ui:widget']) {
                return h(ArrayFieldSpecialFormat, {
                    ...props,
                    class: {
                        [lowerCase(ArrayFieldSpecialFormat.name)]: true
                    }
                });
            }

            // https://json-schema.org/understanding-json-schema/reference/array.html#list-validation
            // https://json-schema.org/understanding-json-schema/reference/array.html#tuple-validation
            const CurrentField = isFixedItems(schema) ? ArrayFieldTuple : ArrayFieldNormal;

            return h('div', [
                h(CurrentField, {
                    itemsFormData: itemsFormData.value,
                    ...props,
                    onArrayOperate: handleArrayOperate,
                    class: {
                        [lowerCase(CurrentField.name)]: true
                    }
                }),

                // Insert a Widget to validate array - maxItems, minItems, uniqueItems and other properties outside items
                props.needValidFieldGroup ? h(Widget, {
                    key: 'validateWidget-array',
                    class: {
                        validateWidget: true,
                        'validateWidget-array': true
                    },
                    schema: Object.entries(schema).reduce((preVal, [key, value]) => {
                        if (key !== 'items') preVal[key] = value;
                        return preVal;
                    }, {}),
                    uiSchema,
                    errorSchema: props.errorSchema,
                    curNodePath,
                    rootFormData,
                    globalOptions
                }) : null
            ]);
        };
    },
};

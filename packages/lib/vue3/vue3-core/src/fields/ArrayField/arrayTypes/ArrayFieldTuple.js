/**
 * Created by Liu.Jun on 2020/4/24 11:56.
 */

import { h } from 'vue';

import { allowAdditionalItems, getUiOptions, replaceArrayIndex } from '@lljj/vjsf-utils/formUtils';
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import { computedCurPath } from '@lljj/vjsf-utils/vue3Utils';
import { cutOff } from '@lljj/vjsf-utils/arrayUtils';
import FieldGroupWrap from '@lljj/vjsf-utils/components/FieldGroupWrap.vue';
import vueProps from '../../props';

import SchemaField from '../../SchemaField';
import ArrayOrderList from '../components/ArrayOrderList';

export default {
    name: 'ArrayFieldTuple',
    props: {
        ...vueProps,
        itemsFormData: {
            type: Array,
            default: () => []
        }
    },
    emits: ['arrayOperate'],
    setup(props, { emit, attrs }) {
        // Compatibility for data with insufficient length
        const fixItemsFormData = () => {
            const isNoArray = !Array.isArray(props.itemsFormData);
            if (isNoArray || props.itemsFormData.length < props.schema.items.length) {
                // Need to fill in default data, calculate required data
                const curSchemaState = getDefaultFormState(props.schema, undefined, props.rootSchema);

                if (isNoArray) {
                    // Data repair - reset to a new value
                    emit('arrayOperate', {
                        command: 'setNewTarget',
                        data: {
                            newTarget: curSchemaState
                        }
                    });
                } else {
                    // Data repair - append insufficient data
                    emit('arrayOperate', {
                        command: 'batchPush',
                        data: {
                            pushArray: curSchemaState.slice(props.itemsFormData.length)
                        }
                    });
                }
            }
        };
        fixItemsFormData();

        return () => {
            if (!Array.isArray(props.itemsFormData)) return null;

            const {
                schema, uiSchema, errorSchema, curNodePath, globalOptions
            } = props;

            const {
                title,
                description,
                addable,
                showIndexNumber,
                sortable,
                removable,
                showTitle,
                showDescription,
                fieldClass,
                fieldAttrs,
                fieldStyle,
            } = getUiOptions({
                schema,
                uiSchema,
                curNodePath,
                rootFormData: props.rootFormData,
            });

            // Split into tuple and additional
            const cutOfArr = cutOff(props.itemsFormData, props.schema.items.length - 1);

            const tupleVNodeArr = cutOfArr[0].map((item, index) => h(
                SchemaField,
                {
                    key: item.key,
                    ...props,
                    required: !([].concat(schema.items[index].type).includes('null')),
                    schema: schema.items[index],
                    uiSchema: uiSchema.items ? uiSchema.items[index] : {},
                    errorSchema: errorSchema.items ? errorSchema.items[index] : {},
                    curNodePath: computedCurPath(curNodePath, index)
                }
            ));

            // Sortable handling through order component
            const additionalVNodeArr = cutOfArr[1].map((item, index) => {
                const tempUiSchema = replaceArrayIndex({
                    schema: schema.additionalItems,
                    uiSchema: uiSchema.additionalItems
                }, index);

                return {
                    key: item.key,
                    vNode: h(
                        SchemaField,
                        {
                            key: item.key,
                            ...props,
                            schema: schema.additionalItems,
                            required: !([].concat(schema.additionalItems.type).includes('null')),
                            uiSchema: {
                                ...uiSchema.additionalItems,
                                ...tempUiSchema
                            },
                            errorSchema: errorSchema.additionalItems,
                            curNodePath: computedCurPath(props.curNodePath, index + schema.items.length)
                        }
                    )
                };
            });

            // Whether addable is also restricted by additionalItems property
            const trueAddable = (addable === undefined ? true : addable) && allowAdditionalItems(props.schema);

            // Default loop of fixed configured data, use ArrayOrderList to render beyond length
            return h(
                FieldGroupWrap,
                {
                    title,
                    description,
                    showTitle,
                    showDescription,
                    curNodePath,
                    ...fieldAttrs,
                    class: fieldClass,
                    style: fieldStyle,
                },
                {
                    default: () => [
                        // Display tuple fixed items first
                        ...tupleVNodeArr,

                        // additional items
                        h(
                            ArrayOrderList,
                            {
                                onArrayOperate: (...args) => emit('arrayOperate', ...args),
                                vNodeList: additionalVNodeArr,
                                tupleItemsLength: schema.items.length,
                                addable: trueAddable,
                                showIndexNumber,
                                sortable,
                                removable,
                                maxItems: schema.maxItems,
                                minItems: schema.minItems,
                                globalOptions,
                            }
                        )
                    ]
                }
            );
        };
    }
};

/**
 * Created by Liu.Jun on 2020/5/19 10:15 PM.
 */


import { ref, watch, h } from 'vue';
import {
    getPathVal, setPathVal, deletePathVal, nodePath2ClassName
} from '@lljj/vjsf-utils/vue3Utils';
import {
    isEmptyObject, filterObject, isObject, getSchemaType
} from '@lljj/vjsf-utils/utils';

import {
    getWidgetConfig, getUiOptions, getUserErrOptions
} from '@lljj/vjsf-utils/formUtils';

import retrieveSchema from '@lljj/vjsf-utils/schema/retriev';
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import { getMatchingOption, isValid } from '@lljj/vjsf-utils/schema/validate';

import vueProps from '../../props';
import Widget from '../../../components/Widget';
import SchemaField from '../../SchemaField';

export default {
    name: 'SelectLinkageField',
    props: {
        ...vueProps,
        combiningType: {
            type: String,
            default: 'anyOf' // anyOf oneOf
        },
        selectList: {
            type: Array,
            require: true
        }
    },
    setup(props) {
        const computedCurSelectIndexByFormData = (formData) => {
            const index = getMatchingOption(formData, props.selectList, props.rootSchema, true);
            return index || 0;
        };

        // Currently selected option item
        const curSelectIndex = ref(computedCurSelectIndexByFormData(getPathVal(props.rootFormData, props.curNodePath)));

        // Dropdown option VNode
        const getSelectBoxVNode = () => {
            // Dropdown option parameters
            const selectWidgetConfig = getWidgetConfig({
                schema: props.schema[`${props.combiningType}Select`] || {}, // Extend oneOfSelect, anyOfSelect fields
                uiSchema: props.uiSchema[`${props.combiningType}Select`] || {}, // Configure UI info through uiSchema['oneOf']
                curNodePath: props.curNodePath,
                rootFormData: props.rootFormData,
            }, () => ({
                // Enum parameters
                widget: 'SelectWidget'
            }));

            // title description fallback to schema config, but don't use uiSchema config here
            // select ui config needs to use (oneOf|anyOf)Select
            selectWidgetConfig.label = selectWidgetConfig.label || props.schema.title;
            selectWidgetConfig.description = selectWidgetConfig.description || props.schema.description;

            // Dropdown list enum values
            if (!selectWidgetConfig.uiProps.enumOptions) {
                const uiSchemaSelectList = props.uiSchema[props.combiningType] || [];
                selectWidgetConfig.uiProps.enumOptions = props.selectList.map((option, index) => {
                    const curUiOptions = getUiOptions({
                        schema: option,
                        uiSchema: uiSchemaSelectList[index],
                        containsSpec: false,
                        // curNodePath: props.curNodePath,
                        // rootFormData: props.rootFormData,
                    });
                    return {
                        label: curUiOptions.title || `Option ${index + 1}`,
                        value: index,
                    };
                });
            }

            // oneOf option rendering
            // Select box VNode
            return h(
                Widget,
                {
                    key: `fieldSelect_${props.combiningType}`,
                    class: {
                        [`fieldSelect_${props.combiningType}`]: true
                    },
                    isFormData: false,
                    curValue: curSelectIndex.value,
                    curNodePath: props.curNodePath,
                    rootFormData: props.rootFormData,
                    globalOptions: props.globalOptions,
                    ...selectWidgetConfig,
                    onOtherDataChange: (event) => {
                        curSelectIndex.value = event;
                    }
                }
            );
        };

        // Object switched select
        // If object type option has added properties, remove them here
        // Calculate default value for new option
        watch(curSelectIndex, (newVal, oldVal) => {
            const curFormData = getPathVal(props.rootFormData, props.curNodePath);

            // Calculate new option default value
            const newOptionData = getDefaultFormState(props.selectList[newVal], undefined, props.rootSchema);

            const hasOwn = Object.prototype.hasOwnProperty;

            // Remove old key
            if (isObject(curFormData)) {
                const oldSelectSchema = retrieveSchema(
                    props.selectList[oldVal],
                    props.rootSchema
                );
                if (getSchemaType(oldSelectSchema) === 'object') {
                    // Remove properties added by old schema
                    // Object.keys(oldSelectSchema.properties)
                    for (const key in oldSelectSchema.properties) {
                        if (
                            hasOwn.call(oldSelectSchema.properties, key)
                            && !hasOwn.call(newOptionData, key)
                        ) {
                            deletePathVal(curFormData, key);
                        }
                    }
                }
            }

            // Set new value
            if (isObject(newOptionData)) {
                Object.entries(newOptionData).forEach(([key, value]) => {
                    if (
                        value !== undefined
                        && (
                            curFormData[key] === undefined
                            || isObject(value)
                            || ((() => {
                                const newSelectSchema = retrieveSchema(
                                    props.selectList[newVal],
                                    props.rootSchema
                                );

                                return newSelectSchema.properties[key]?.const !== undefined;
                            })())
                        )
                    ) {
                        // Haven't found a reasonable way to merge old and new values here
                        //
                        // 1. If anyOf contains const config in same-name property schema, new value is generated and overwrite here
                        // 2. Other scenarios keep old value of same-name key
                        setPathVal(curFormData, key, value);
                    }
                });
            } else {
                setPathVal(
                    props.rootFormData,
                    props.curNodePath,
                    (newOptionData === undefined && isValid(retrieveSchema(
                        props.selectList[newVal],
                        props.rootSchema
                    ), curFormData)) ? curFormData : newOptionData
                );
            }
        });

        return () => {
            const { curNodePath } = props;
            const pathClassName = nodePath2ClassName(curNodePath);

            // is object
            const isTypeObject = (props.schema.type === 'object' || props.schema.properties);

            // Select attached node
            const childrenVNodeList = [getSelectBoxVNode()];

            // Current option content
            let curSelectSchema = props.selectList[curSelectIndex.value];

            // Merge schema of current selected node
            if (curSelectSchema) {
                // Override parent properties
                const {
                    // eslint-disable-next-line no-unused-vars
                    properties,
                    // eslint-disable-next-line no-unused-vars
                    [props.combiningType]: combiningType,
                    // eslint-disable-next-line no-unused-vars
                    [`${props.combiningType}Select`]: combiningTypeSelect,
                    ...parentSchema
                } = props.schema;

                curSelectSchema = Object.assign({}, parentSchema, curSelectSchema);
            }

            // Object type but no attached properties
            const isObjectEmptyAttachProperties = isTypeObject && isEmptyObject(curSelectSchema && curSelectSchema.properties);

            if (curSelectSchema && !isObjectEmptyAttachProperties) {
                // Current node's ui err config, used to support unified config for all options
                // Extract oneOf anyOf same-level config, then merge into currently selected schema
                const userUiOptions = filterObject(getUiOptions({
                    schema: props.schema,
                    uiSchema: props.uiSchema,
                    containsSpec: false,
                    curNodePath,
                    rootFormData: props.rootFormData,
                }), key => (key === props.combiningType ? undefined : `ui:${key}`));

                const userErrOptions = filterObject(getUserErrOptions({
                    schema: props.schema,
                    uiSchema: props.uiSchema,
                    errorSchema: props.errorSchema
                }), key => (key === props.combiningType ? undefined : `err:${key}`));

                childrenVNodeList.push(
                    h(
                        SchemaField,
                        {
                            key: `appendSchema_${props.combiningType}`,
                            ...props,
                            schema: {
                                'ui:showTitle': false, // Don't show title by default
                                'ui:showDescription': false, // Don't show description by default
                                ...curSelectSchema,
                            },
                            required: props.required,
                            uiSchema: {
                                ...userUiOptions, // Merge oneOf level config
                                ...((props.uiSchema[props.combiningType] || [])[curSelectIndex.value])
                            },
                            errorSchema: {
                                ...userErrOptions, // Merge oneOf level config
                                ...((props.errorSchema[props.combiningType] || [])[curSelectIndex.value])
                            },
                            // needValidFieldGroup: false // Validate separately, no need to handle here
                        }
                    )
                );
            }

            // object needs to keep original properties, render separately if original properties exist
            let originVNode = null;
            if (isTypeObject && !isEmptyObject(props.schema.properties)) {
                const {
                    // eslint-disable-next-line no-unused-vars
                    title, description, properties, ...optionSchema
                } = curSelectSchema;

                // object original item rendering also needs to merge anyOf content
                const origSchema = Object.assign({}, props.schema, optionSchema);
                delete origSchema[props.combiningType];

                originVNode = h(SchemaField, {
                    key: `origin_${props.combiningType}`,
                    class: {
                        [`${props.combiningType}_originBox`]: true,
                        [`${pathClassName}-originBox`]: true
                    },
                    ...props,
                    schema: origSchema,
                    // needValidFieldGroup: false // Validate separately, no need to handle here
                });
            }

            // oneOf validation VNode
            childrenVNodeList.push(
                h(Widget, {
                    key: `validateWidget-${props.combiningType}`,
                    class: {
                        validateWidget: true,
                        [`validateWidget-${props.combiningType}`]: true
                    },
                    schema: props.schema,
                    uiSchema: props.uiSchema,
                    errorSchema: props.errorSchema,
                    curNodePath: props.curNodePath,
                    rootFormData: props.rootFormData,
                    globalOptions: props.globalOptions
                })
            );

            return h('div', [
                originVNode,
                h('div', {
                    key: `appendBox_${props.combiningType}`,
                    class: {
                        appendCombining_box: true,
                        [`${props.combiningType}_appendBox`]: true,
                        [`${pathClassName}-appendBox`]: true
                    }
                }, childrenVNodeList)
            ]);
        };
    }
};

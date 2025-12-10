/**
 * Created by Liu.Jun on 2020/4/23 11:24.
 */

import {
    computed, h, ref, watch, inject
} from 'vue';

import { IconQuestion } from '@lljj/vjsf-utils/icons';

import { validateFormDataAndTransformMsg } from '@lljj/vjsf-utils/schema/validate';
import { fallbackLabel } from '@lljj/vjsf-utils/formUtils';

import {
    isRootNodePath, path2prop, getPathVal, setPathVal, resolveComponent
} from '@lljj/vjsf-utils/vue3Utils';

export default {
    name: 'Widget',
    props: {
        // Whether to sync formData value, form elements need this by default
        // Select in oneOf anyOf belongs to data outside of formData
        isFormData: {
            type: Boolean,
            default: true
        },
        // When isFormData = false, current value needs to be passed in, otherwise it will be automatically calculated through curNodePath
        curValue: {
            type: null,
            default: 0
        },
        schema: {
            type: Object,
            default: () => ({})
        },
        uiSchema: {
            type: Object,
            default: () => ({})
        },
        errorSchema: {
            type: Object,
            default: () => ({})
        },
        customFormats: {
            type: Object,
            default: () => ({})
        },
        // Custom validation
        customRule: {
            type: Function,
            default: null
        },
        widget: {
            type: [String, Function, Object],
            default: null
        },

        // Calculated from the defined schema
        required: {
            type: Boolean,
            default: false
        },

        // Props passed through UI schema configuration
        uiRequired: {
            type: Boolean
        },
        // Resolve difference in required judgment for empty string between JSON Schema and actual input elements
        // When element input is '' use the value of emptyValue
        emptyValue: {
            type: null,
            default: undefined
        },
        rootFormData: {
            type: null
        },
        curNodePath: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        // width -> formItem width
        width: {
            type: String,
            default: ''
        },
        labelWidth: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        // Widget attrs
        widgetAttrs: {
            type: Object,
            default: () => ({})
        },
        // Widget className
        widgetClass: {
            type: Object,
            default: () => ({})
        },
        // Widget style
        widgetStyle: {
            type: Object,
            default: () => ({})
        },
        // Field attrs
        fieldAttrs: {
            type: Object,
            default: () => ({})
        },
        // Field className
        fieldClass: {
            type: Object,
            default: () => ({})
        },
        // Field style
        fieldStyle: {
            type: Object,
            default: () => ({})
        },
        // props
        uiProps: {
            type: Object,
            default: () => ({})
        },
        formProps: null,
        getWidget: null,
        renderScopedSlots: null, // Scoped slots
        globalOptions: null, // Global configuration
        onChange: null
    },
    emits: ['otherDataChange'],
    inheritAttrs: true,
    setup(props, { emit }) {
        const genFormProvide = inject('genFormProvide');
        const widgetValue = computed({
            get() {
                if (props.isFormData) return getPathVal(props.rootFormData, props.curNodePath);

                return props.curValue;
            },
            set(value) {
                // Most components will reset to null when empty value is deleted.
                const trueValue = (value === '' || value === null) ? props.emptyValue : value;
                if (props.isFormData) {
                    setPathVal(props.rootFormData, props.curNodePath, trueValue);
                } else {
                    emit('otherDataChange', trueValue);
                }
            }
        });
        const realRequired = computed(() => props.uiRequired ?? props.required);

        // Enum type default value is first option
        if (props.uiProps.enumOptions
            && props.uiProps.enumOptions.length > 0
            && widgetValue.value === undefined
            && widgetValue.value !== props.uiProps.enumOptions[0]
        ) {
            // array rendered as multi-select defaults to empty array
            if (props.schema.items) {
                widgetValue.value = [];
            } else if (realRequired.value && props.formProps.defaultSelectFirstOption) {
                widgetValue.value = props.uiProps.enumOptions[0].value;
            }
        }

        // Get widget component instance
        const widgetRef = ref(null);
        // Provide a special config allowing direct access to widget vm
        if (typeof props.getWidget === 'function') {
            watch(widgetRef, () => {
                props.getWidget.call(null, widgetRef.value);
            });
        }

        return () => {
            // Check if it's root node
            const isRootNode = isRootNodePath(props.curNodePath);

            const isMiniDes = props.formProps && props.formProps.isMiniDes;
            const miniDesModel = isMiniDes ?? props.globalOptions.HELPERS.isMiniDes(props.formProps);
            const descriptionVNode = (props.description) ? h(
                'div',
                {
                    innerHTML: props.description,
                    class: {
                        genFromWidget_des: true,
                        genFromWidget_des_mini: miniDesModel
                    }
                },
            ) : null;

            const { COMPONENT_MAP } = props.globalOptions;
            const miniDescriptionVNode = (miniDesModel && descriptionVNode) ? h(resolveComponent(COMPONENT_MAP.popover), {
                style: {
                    margin: '0 2px',
                    fontSize: '16px',
                    cursor: 'pointer'
                },
                placement: 'top',
                trigger: 'hover',
                ...props.formProps?.popover
            }, {
                default: () => descriptionVNode,
                reference: () => h(IconQuestion)
            }) : null;

            // form-item style
            const formItemStyle = {
                ...props.fieldStyle,
                ...(props.width ? {
                    width: props.width,
                    flexBasis: props.width,
                    paddingRight: '10px'
                } : {})
            };

            // Runtime config fallback to property name
            const label = fallbackLabel(props.label, (props.widget && genFormProvide.fallbackLabel.value), props.curNodePath);
            return h(
                resolveComponent(COMPONENT_MAP.formItem),
                {
                    class: {
                        ...props.fieldClass,
                        genFormItem: true
                    },
                    style: formItemStyle,
                    ...props.fieldAttrs,

                    ...props.labelWidth ? { labelWidth: props.labelWidth } : {},
                    ...props.isFormData ? {
                        // Mark root node with special flag to bypass elementUi no prop attribute no validation
                        prop: isRootNode ? '__$$root' : path2prop(props.curNodePath),
                        rules: [
                            {
                                validator(rule, value, callback) {
                                    if (isRootNode) value = props.rootFormData;

                                    // Validation expands schema level by level, only capture root node errors here
                                    const errors = validateFormDataAndTransformMsg({
                                        formData: value,
                                        schema: props.schema,
                                        uiSchema: props.uiSchema,
                                        customFormats: props.customFormats,
                                        errorSchema: props.errorSchema,
                                        required: realRequired.value,
                                        propPath: path2prop(props.curNodePath)
                                    });

                                    // Validation failed fields exist
                                    if (errors.length > 0) {
                                        if (callback) return callback(errors[0].message);
                                        return Promise.reject(errors[0].message);
                                    }

                                    // customRule if custom validation exists
                                    const curCustomRule = props.customRule;
                                    if (curCustomRule && (typeof curCustomRule === 'function')) {
                                        return curCustomRule({
                                            field: props.curNodePath,
                                            value,
                                            rootFormData: props.rootFormData,
                                            callback
                                        });
                                    }

                                    // Validation success
                                    if (callback) return callback();
                                    return Promise.resolve();
                                },
                                trigger: 'change'
                            }
                        ]
                    } : {},
                },
                {
                    // Error can only display one line, excess...
                    error: slotProps => (slotProps.error ? h('div', {
                        class: {
                            formItemErrorBox: true
                        },
                        title: slotProps.error
                    }, [slotProps.error]) : null),

                    // label
                    /*
                        TODO: Slot going from nothing to something causes elements not to render properly, suspect Vue3 bug
                        If rendering in error form, ElementPlus label labelWrap has no check, using slots.default?.() will get undefined
                    */
                    ...label ? {
                        label: () => h('span', {
                            class: {
                                genFormLabel: true,
                                genFormItemRequired: realRequired.value,
                            },
                        }, [
                            `${label}`,
                            ...miniDescriptionVNode ? [miniDescriptionVNode] : [],
                            `${(props.formProps && props.formProps.labelSuffix) || ''}`
                        ])
                    } : {},

                    // default
                    default: otherAttrs => [
                        // description
                        // Display description in non-mini mode
                        ...(!miniDesModel && descriptionVNode) ? [descriptionVNode] : [],

                        ...props.widget ? [
                            h( // Key input component
                                resolveComponent(props.widget),
                                {
                                    style: props.widgetStyle,
                                    class: props.widgetClass,

                                    ...props.widgetAttrs,
                                    ...props.uiProps,
                                    modelValue: widgetValue.value, // v-model
                                    ref: widgetRef,
                                    'onUpdate:modelValue': function updateModelValue(event) {
                                        const preVal = widgetValue.value;
                                        if (preVal !== event) {
                                            widgetValue.value = event;
                                            if (props.onChange) {
                                                props.onChange({
                                                    curVal: event,
                                                    preVal,
                                                    parentFormData: getPathVal(props.rootFormData, props.curNodePath, 1),
                                                    rootFormData: props.rootFormData
                                                });
                                            }
                                        }
                                    },
                                    ...otherAttrs ? (() => Object.keys(otherAttrs).reduce((pre, k) => {
                                        pre[k] = otherAttrs[k];

                                        // Ensure UI config methods with same name execute UI methods first
                                        [
                                            props.widgetAttrs[k],
                                            props.uiProps[k]
                                        ].forEach((uiConfFn) => {
                                            if (uiConfFn && typeof uiConfFn === 'function') {
                                                pre[k] = (...args) => {
                                                    uiConfFn(...args);
                                                    pre[k](...args);
                                                };
                                            }
                                        });

                                        return pre;
                                    }, {}))() : {}
                                },
                                {
                                    ...(props.renderScopedSlots ? (
                                        typeof props.renderScopedSlots === 'function' ? props.renderScopedSlots() : props.renderScopedSlots
                                    ) : {})
                                }
                            )
                        ] : []
                    ]
                }
            );
        };
    }
};

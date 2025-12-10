/**
 * Created by Liu.Jun on 2019/11/29 11:25.
 */

import {
    h, ref, onMounted, defineComponent
} from 'vue';
import createVue3Core, { fieldProps, SchemaField } from '@lljj/vue3-form-core';

import i18n from '@lljj/vjsf-utils/i18n';
import * as vueUtils from '@lljj/vjsf-utils/vue3Utils';
import * as formUtils from '@lljj/vjsf-utils/formUtils';
import * as schemaValidate from '@lljj/vjsf-utils/schema/validate';
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import WIDGET_MAP from './config/widgets/WIDGET_MAP.js';

import { modelValueComponent } from './config/utils';

import './style.css';

const globalOptions = {
    WIDGET_MAP,
    COMPONENT_MAP: {
        form: defineComponent({
            inheritAttrs: false,
            setup(props, { attrs, slots }) {
                // Handle conversion between labelPosition parameter and layout
                const labelPositionMap = {
                    top: {
                        layout: 'vertical'
                    },
                    left: {
                        layout: 'horizontal',
                        labelAlign: 'left'
                    },
                    right: {
                        layout: 'horizontal',
                        labelAlign: 'right'
                    }
                };

                // Return current form ref
                const formRef = ref(null);
                if (attrs.setFormRef) {
                    onMounted(() => {
                        // Attach a validate method on form component instance
                        formRef.value.$$validate = (callBack) => {
                            formRef.value.validate().then((res) => {
                                callBack(true, res);
                            }).catch((err) => {
                                callBack(false, err.errorFields);
                            });
                        };
                        attrs.setFormRef(formRef.value);
                    });
                }

                return () => {
                    const {
                        // eslint-disable-next-line no-unused-vars
                        setFormRef, labelPosition, labelWidth, model, ...otherAttrs
                    } = attrs;

                    if (otherAttrs.inline) {
                        Object.assign(otherAttrs, {
                            layout: 'inline',
                            // labelCol: undefined,
                            // wrapperCol: undefined
                        });
                    }

                    return h(vueUtils.resolveComponent('a-form'), {
                        ref: formRef,
                        model: model.value,
                        ...labelPositionMap[labelPosition || 'top'],
                        ...otherAttrs,
                        colon: false
                    }, slots);
                };
            }
        }),
        formItem: defineComponent({
            inheritAttrs: false,
            setup(props, { attrs, slots }) {
                const formItemRef = ref(null);
                return () => {
                    const { prop, rules, ...originAttrs } = attrs;

                    return h(vueUtils.resolveComponent('a-form-item'), {
                        ...originAttrs,
                        ref: formItemRef,

                        // Remove callback and use promise mode
                        rules: (rules || []).map(validateRule => ({
                            ...validateRule,
                            validator(rule, value) {
                                return validateRule.validator.apply(this, [rule, value]);
                            }
                        })),
                        name: prop ? prop.split('.') : prop
                    }, {
                        ...slots,
                        default: function proxySlotDefault() {
                            // Fix: a-form-item only hijacks the first child element and listens
                            // to blur and change events. If the first element is a description, validation won't work
                            // @blur="() => {$refs.name.onFieldBlur()}"
                            // @change="() => {$refs.name.onFieldChange()}"
                            return slots.default.call(this, {
                                onBlur: () => {
                                    if (formItemRef.value.$el.querySelector('.genFromWidget_des')) {
                                        // Description exists, need to manually trigger validation event
                                        formItemRef.value.onFieldBlur();
                                    }
                                },
                                onChange: () => {
                                    if (formItemRef.value.$el.querySelector('.genFromWidget_des')) {
                                        // Description exists, need to manually trigger validation event
                                        formItemRef.value.onFieldChange();
                                    }
                                }
                            });
                        }
                    });
                };
            }
        }),
        button: 'a-button',
        popover: defineComponent({
            setup(props, { attrs, slots }) {
                return () => h(vueUtils.resolveComponent('a-popover'), attrs, {
                    default: slots.reference,
                    content: slots.default,
                });
            }
        }),
    },
    HELPERS: {
        // Whether to display description in mini mode
        isMiniDes(formProps) {
            return formProps && (
                ['left', 'right'].includes(formProps.labelPosition)
                || formProps.layout === 'horizontal' || formProps.inline === true
            );
        }
    }
};

const JsonSchemaForm = createVue3Core(globalOptions);
const JsonSchemaFormAntdV4 = createVue3Core({
    ...globalOptions,
    COMPONENT_MAP: {
        ...globalOptions.COMPONENT_MAP,
        formItem: defineComponent({
            inheritAttrs: false,
            setup(props, { attrs, slots }) {
                return () => {
                    const {
                        style, class: className, ...originAttrs
                    } = attrs;

                    return h('div', {
                        style,
                        class: className
                    }, [
                        h(
                            globalOptions.COMPONENT_MAP.formItem,
                            originAttrs,
                            slots
                        )
                    ]);
                };
            }
        })
    }
});

export default JsonSchemaForm;

export {
    JsonSchemaFormAntdV4,
    globalOptions,
    SchemaField,
    getDefaultFormState,
    fieldProps,
    vueUtils,
    formUtils,
    schemaValidate,
    i18n,
    modelValueComponent
};

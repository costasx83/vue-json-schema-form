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

import './style.css';

const globalOptions = {
    WIDGET_MAP,
    COMPONENT_MAP: {
        form: defineComponent({
            inheritAttrs: false,
            setup(props, { attrs, slots }) {
                // Handle relationship between labelPosition parameter and label-placement
                const labelPositionMap = {
                    top: {
                        labelAlign: 'left',
                        labelPlacement: 'top',
                    },
                    left: {
                        labelAlign: 'left',
                        labelPlacement: 'left',
                    },
                    right: {
                        labelAlign: 'right',
                        labelPlacement: 'left',
                    }
                };

                const formRef = ref(null);
                if (attrs.setFormRef) {
                    onMounted(() => {
                        // Reset a validate method on form component instance
                        formRef.value.$$validate = (callBack) => {
                            formRef.value.validate((errors) => {
                                if (errors) {
                                    return callBack(false, errors);
                                }

                                return callBack(true);
                            });
                        };

                        attrs.setFormRef(formRef.value);
                    });
                }

                return () => {
                    const {
                        // eslint-disable-next-line no-unused-vars
                        setFormRef, labelPosition, model, ...otherAttrs
                    } = attrs;

                    return h(vueUtils.resolveComponent('n-form'), {
                        ref: formRef,
                        model: model.value, // Won't auto-unwrap
                        ...labelPositionMap[labelPosition || 'top'],
                        ...otherAttrs
                    }, slots);
                };
            }
        }),
        formItem: defineComponent({
            inheritAttrs: false,
            setup(props, { attrs, slots }) {
                return () => {
                    const { prop, rules, ...originAttrs } = attrs;
                    const childAttrs = {
                        ...originAttrs,
                        path: prop,
                        rule: (rules || []).map(validateRule => ({
                            trigger: validateRule.trigger,
                            asyncValidator(rule, value, callback) {
                                return validateRule.validator(rule, value, callback);
                            }
                        })),
                    };
                    return h(vueUtils.resolveComponent('n-form-item'), childAttrs, slots);
                };
            }
        }),
        button: 'n-button',
        // popover: ,
        popover: defineComponent({
            setup(props, { attrs, slots }) {
                return () => h(vueUtils.resolveComponent('n-popover'), attrs, {
                    trigger: slots.reference,
                    default: slots.default,
                });
            }
        }),
    },
    HELPERS: {
        // Whether to display description in mini mode
        isMiniDes(formProps) {
            return formProps && ['left', 'right'].includes(formProps.labelPosition);
        }
    }
};

const JsonSchemaForm = createVue3Core(globalOptions);

export default JsonSchemaForm;

const modelValueComponent = vueUtils.modelValueComponent;

export {
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

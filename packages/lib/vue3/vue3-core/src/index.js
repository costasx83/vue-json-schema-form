/**
 * Created by Liu.Jun on 2020/4/16 17:32.
 */

import {
    getCurrentInstance, watch, ref, computed, h, provide, toRef
} from 'vue';

import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';

// Generate form default data
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import { deepEquals } from '@lljj/vjsf-utils/utils';

// Base common styles
import '@lljj/vjsf-utils/style/baseForm.css';

import vueProps from './props';

// Default form footer
import FormFooter from './components/FormFooter.js';

import SchemaField from './fields/SchemaField';
import fieldProps from './fields/props';

export {
    fieldProps,
    SchemaField
};

export default function createForm(globalOptions = {}) {
    const Form = {
        name: 'VueForm',
        props: vueProps,
        emits: ['update:modelValue', 'change', 'cancel', 'submit', 'validation-failed', 'form-mounted'],
        setup(props, { slots, emit }) {
            // global components
            const internalInstance = getCurrentInstance();
            if (!Form.installed && globalOptions.WIDGET_MAP.widgetComponents) {
                Object.entries(globalOptions.WIDGET_MAP.widgetComponents).forEach(
                    ([componentName, component]) => internalInstance.appContext.app.component(componentName, component)
                );

                // Register only once
                Form.installed = true;
            }

            // Use provide to pass cross-component data
            const fallbackLabel = toRef(props, 'fallbackLabel');
            provide('genFormProvide', {
                fallbackLabel,
            });
            // rootFormData
            const rootFormData = ref(getDefaultFormState(props.schema, props.modelValue, props.schema, props.strictMode));
            const footerParams = computed(() => ({
                show: true,
                okBtn: 'Save',
                okBtnProps: {},
                cancelBtn: 'Cancel',
                ...props.formFooter
            }));

            // Form component instance, does not need to be reactive
            let formRef = null;

            // Update formData
            const emitFormDataChange = (newValue, oldValue) => {
                // Support v-model, reference type
                emit('update:modelValue', newValue);

                // Change event, reference type modifies newValue property
                emit('change', {
                    newValue,
                    oldValue
                });
            };

            // Update props
            const willReceiveProps = (newVal, oldVal) => {
                if (!deepEquals(newVal, oldVal)) {
                    const tempVal = getDefaultFormState(props.schema, props.modelValue, props.schema, props.strictMode);
                    if (!deepEquals(rootFormData.value, tempVal)) {
                        rootFormData.value = tempVal;
                    }
                }
            };

            // Emit v-model, synchronize values
            watch(rootFormData, (newValue, oldValue) => {
                emitFormDataChange(newValue, oldValue);
            }, {
                deep: true
            });

            // Schema is reassigned
            watch(() => props.schema, (newVal, oldVal) => {
                willReceiveProps(newVal, oldVal);
            });

            // Model value changes
            watch(() => props.modelValue, (newVal, oldVal) => {
                willReceiveProps(newVal, oldVal);
            });

            // Maintain v-model bidirectional data timeliness
            emitFormDataChange(rootFormData.value, props.modelValue);

            const getDefaultSlot = () => {
                if (slots.default) {
                    return slots.default({
                        formData: rootFormData,
                        formRefFn: () => formRef
                    });
                }

                if (footerParams.value.show) {
                    return h(FormFooter, {
                        globalOptions,
                        okBtn: footerParams.value.okBtn,
                        okBtnProps: footerParams.value.okBtnProps,
                        cancelBtn: footerParams.value.cancelBtn,
                        formItemAttrs: footerParams.value.formItemAttrs,
                        onCancel() {
                            emit('cancel');
                        },
                        async onSubmit() {
                            const validateFn = formRef.$$validate || formRef.validate;

                            if (!validateFn) {
                                console.error('No validate function found on form');
                                return;
                            }

                            try {
                                // Check if validateFn returns a Promise (Vuetify 3) or uses callback (old style)
                                const result = validateFn((isValid, resData) => {
                                    // Callback style (old)
                                    if (isValid) {
                                        return emit('submit', rootFormData);
                                    }
                                    console.warn(resData);
                                    return emit('validation-failed', resData);
                                });

                                // If it's a Promise (Vuetify 3)
                                if (result && typeof result.then === 'function') {
                                    const isValid = await result;

                                    if (isValid) {
                                        emit('submit', rootFormData);
                                    } else {
                                        emit('validation-failed', { valid: false });
                                    }
                                }
                            } catch (error) {
                                console.error('Validation error:', error);
                                emit('validation-failed', error);
                            }
                        }
                    });
                }

                return [];
            };

            return () => {
                const {
                    // eslint-disable-next-line no-unused-vars
                    layoutColumn = 1, inlineFooter, labelSuffix, isMiniDes, defaultSelectFirstOption, popover, ...uiFormProps
                } = props.formProps;

                const { inline = false, labelPosition = 'top' } = uiFormProps;

                const schemaProps = {
                    schema: props.schema,
                    uiSchema: props.uiSchema,
                    errorSchema: props.errorSchema,
                    customFormats: props.customFormats,
                    customRule: props.customRule,
                    rootSchema: props.schema,
                    rootFormData: rootFormData.value, // Root node data
                    curNodePath: '', // Current node path
                    globalOptions, // Global configuration, differentiated UI framework
                    formProps: {
                        labelPosition,
                        labelSuffix: '：',
                        defaultSelectFirstOption: true,
                        inline,
                        ...props.formProps
                    }
                };

                return h(
                    resolveComponent(globalOptions.COMPONENT_MAP.form),
                    {
                        class: {
                            genFromComponent: true,
                            formInlineFooter: inlineFooter,
                            formInline: inline,
                            [`genFromComponent_${props.schema.id}Form`]: !!props.schema.id,
                            layoutColumn: !inline,
                            [`layoutColumn-${layoutColumn}`]: !inline
                        },
                        setFormRef: (form) => {
                            formRef = form;
                            internalInstance.ctx.$$uiFormRef = formRef;

                            emit('form-mounted', form, {
                                formData: rootFormData.value
                            });
                        },
                        // Prevent form default submit
                        onSubmit(e) {
                            e.preventDefault();
                        },
                        model: rootFormData,
                        labelPosition,
                        inline,
                        ...uiFormProps
                    },
                    {
                        default: () => [
                            h(
                                SchemaField,
                                schemaProps
                            ),
                            getDefaultSlot(),
                        ]
                    }
                );
            };
        },
    };

    Form.install = (vueApp, options = {}) => {
        vueApp.component(options.name || Form.name, Form);
    };

    return Form;
}

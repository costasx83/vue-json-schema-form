/**
 * Created by Liu.Jun on 2020/4/16 17:32.
 */


import Vue from 'vue';

// Generate default form data
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import { deepEquals } from '@lljj/vjsf-utils/utils';

// Basic common styles
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
    // global components
    if (globalOptions.WIDGET_MAP.widgetComponents) {
        Object.entries(globalOptions.WIDGET_MAP.widgetComponents).forEach(([key, value]) => Vue.component(key, value));
    }

    return {
        name: 'VueForm',
        props: vueProps,
        provide() {
            return {
                genFormProvide: this.genFormProvide
            };
        },
        data() {
            const formData = getDefaultFormState(this.$props.schema, this.$props.value, this.$props.schema, this.$props.strictMode);

            // Keep v-model two-way data timely
            this.emitFormDataChange(formData, this.value);

            return {
                formData
            };
        },
        computed: {
            genFormProvide() {
                return this.$props;
            },
            footerParams() {
                return {
                    show: true,
                    okBtn: 'Save',
                    cancelBtn: 'Cancel',
                    ...this.formFooter
                };
            }
        },
        watch: {
            formData: {
                handler(newValue, oldValue) {
                    this.emitFormDataChange(newValue, oldValue);
                },
                deep: true
            },

            // Used for initialized formData, watch for changes to recalculate formData
            schema(newVal, oldVal) {
                this.willReceiveProps(newVal, oldVal);
            },
            value(newVal, oldVal) {
                this.willReceiveProps(newVal, oldVal);
            }
        },

        methods: {
            emitFormDataChange(newValue, oldValue) {
                // Support v-model, reference type
                this.$emit('input', newValue);

                // Change event, reference type modifies property newValue
                this.$emit('on-change', {
                    newValue,
                    oldValue
                });
            },

            // Avoid circular calls that may be caused by v-model two-way binding
            willReceiveProps(newVal, oldVal) {
                if (!deepEquals(newVal, oldVal)) {
                    const formData = getDefaultFormState(this.$props.schema, this.$props.value, this.$props.schema, this.$props.strictMode);
                    if (!deepEquals(this.formData, formData)) {
                        this.formData = formData;
                    }
                }
            },
        },
        mounted() {
            this.$$uiFormRef = this.$refs.genEditForm;
            this.$emit('on-form-mounted', this.$refs.genEditForm, {
                formData: this.formData
            });
        },
        render(h) {
            const self = this;
            // default scoped slot
            const defaultSlot = this.$scopedSlots.default
                ? this.$scopedSlots.default({
                    formData: self.formData,
                    formRefFn: () => self.$refs.genEditForm
                })
                : this.footerParams.show
                    ? h(FormFooter, {
                        props: {
                            globalOptions,
                            okBtn: self.footerParams.okBtn,
                            okBtnProps: self.footerParams.okBtnProps,
                            cancelBtn: self.footerParams.cancelBtn,
                            formItemAttrs: self.footerParams.formItemAttrs,
                        },
                        on: {
                            onCancel() {
                                self.$emit('on-cancel');
                            },
                            onSubmit() {
                                self.$refs.genEditForm.validate((isValid, resData) => {
                                    if (isValid) {
                                        return self.$emit('on-submit', self.formData);
                                    }
                                    console.warn(resData);
                                    return self.$emit('on-validation-failed', resData);
                                });
                            }
                        }
                    }) : undefined;

            const {
                // eslint-disable-next-line no-unused-vars
                layoutColumn = 1, inlineFooter, labelSuffix, isMiniDes, defaultSelectFirstOption, popover, ...uiFormProps
            } = self.$props.formProps;

            const { inline = false, labelPosition = 'top' } = uiFormProps;

            const props = {
                schema: this.schema,
                uiSchema: this.uiSchema,
                errorSchema: this.errorSchema,
                customFormats: this.customFormats,
                customRule: this.customRule,
                rootSchema: this.schema,
                rootFormData: this.formData, // Root node data
                curNodePath: '', // Current node patht node path
                globalOptions, // Global configuration, differentiate UI frameworks
                formProps: {
                    labelPosition,
                    labelSuffix: '：',
                    defaultSelectFirstOption: true,
                    inline,
                    ...self.$props.formProps
                }
            };

            return h(
                globalOptions.COMPONENT_MAP.form,
                {
                    class: {
                        genFromComponent: true,
                        formInlineFooter: inlineFooter,
                        formInline: inline,
                        [`genFromComponent_${this.schema.id}Form`]: !!this.schema.id,
                        layoutColumn: !inline,
                        [`layoutColumn-${layoutColumn}`]: !inline
                    },
                    nativeOn: {
                        submit(e) {
                            e.preventDefault();
                        }
                    },
                    ref: 'genEditForm',
                    props: {
                        model: self.formData,
                        labelPosition,
                        inline,
                        ...uiFormProps
                    }
                },
                [
                    h(
                        SchemaField,
                        {
                            props
                        }
                    ),
                    defaultSlot,
                ]
            );
        }
    };
}

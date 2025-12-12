<template>
    <div :class="$style.container">
        <EditorHeaderVT
            v-model="activeHeaderTab"
            version="vue3"
            :show-version="true"
        >
            <div :class="$style.btns">
                <template v-if="isUseLabelWidth">
                    <span style="font-size: 13px; margin-right: 8px;">Label:</span>
                    <v-slider
                        v-model="formProps.labelWidth"
                        style="width: 100px; margin-right: 16px;"
                        density="compact"
                        :format-tooltip="sliderFormat"
                        hide-details
                    ></v-slider>
                </template>

                <template v-else>
                    <span style="font-size: 13px; margin-right: 8px;">labelCol：</span>
                    <v-slider
                        v-model="formProps.labelColSpan"
                        :min="3"
                        :max="15"
                        style="width: 100px; margin-right: 16px;"
                        density="compact"
                        hide-details
                    ></v-slider>
                    <span style="font-size: 13px; margin-right: 8px;">wrapperCol：</span>
                    <v-slider
                        v-model="formProps.wrapperColSpan"
                        :min="5"
                        :max="24"
                        style="width: 100px; margin-right: 16px;"
                        density="compact"
                        hide-details
                    ></v-slider>
                </template>

                <v-checkbox
                    v-model="formProps.inline"
                    style="margin-right: 6px;"
                    density="compact"
                    label="Inline"
                    hide-details
                ></v-checkbox>
                <v-checkbox
                    v-model="formFooter.show"
                    style="margin-right: 6px;"
                    density="compact"
                    label="Footer"
                    hide-details
                ></v-checkbox>
                <v-select
                    v-model="formProps.layoutColumn"
                    placeholder="Layout"
                    density="compact"
                    variant="outlined"
                    :items="[{value: 1, title: 'One Column'}, {value: 2, title: 'Two Columns'}, {value: 3, title: 'Three Columns'}]"
                    style="margin-right: 6px; width: 140px;"
                    hide-details
                ></v-select>
                <v-select
                    v-model="formProps.labelPosition"
                    placeholder="Align"
                    density="compact"
                    variant="outlined"
                    :items="[{value: 'top', title: 'Label Top'}, {value: 'left', title: 'Label Left'}, {value: 'right', title: 'Label Right'}]"
                    style="margin-right: 6px; width: 130px;"
                    hide-details
                ></v-select>
                <v-btn
                    prepend-icon="mdi-share"
                    color="primary"
                    size="small"
                    @click="handlePreview"
                >
                    Share
                </v-btn>
            </div>
        </EditorHeaderVT>
        <div :class="$style.box">
            <div :class="$style.typeList">
                <router-link
                    v-for="item in typeItems"
                    :key="item"
                    v-slot="{ href, route, navigate, isActive, isExactActive }"
                    :class="{
                        [$style.linkItem]: true,
                        [$style.active]: item === curType
                    }"
                    :to="{
                        name: 'demo',
                        query: {
                            ui: curVueForm,
                            type: item
                        }
                    }"
                >
                    <v-btn
                        :color="item === curType ? 'primary' : 'default'"
                        size="small"
                        @click="navigate"
                    >
                        {{ item }}
                    </v-btn>
                </router-link>
            </div>
            <v-row>
                <v-col
                    :class="$style.middleBox"
                    cols="12"
                    md="8"
                >
                    <v-row>
                        <v-col
                            cols="12"
                            md="5"
                        >
                            <CodeEditor
                                v-model="curFormDataCode"
                                title="FormData"
                            ></CodeEditor>
                        </v-col>
                        <v-col
                            cols="12"
                            md="7"
                        >
                            <CodeEditor
                                v-model="curSchemaCode"
                                title="Schema"
                            ></CodeEditor>
                        </v-col>
                    </v-row>
                    <v-row style="margin-top: 10px;">
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <CodeEditor
                                v-model="curUiSchemaCode"
                                title="Ui Schema"
                            ></CodeEditor>
                        </v-col>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <CodeEditor
                                v-model="curErrorSchemaCode"
                                title="Error Schema"
                            ></CodeEditor>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col
                    :class="[$style.middleBox]"
                    cols="12"
                    md="4"
                >
                    <v-card
                        elevation="2"
                        :class="[$style.card, $style.middleBox_form, $style.formBox]"
                    >
                        <component
                            :is="curVueForm"
                            ref="schemaForm"
                            :key="pageKey"
                            v-model="formData"
                            :schema="schema"
                            :ui-schema="uiSchema"
                            :error-schema="errorSchema"
                            :custom-formats="customFormats"
                            :form-footer="trueFormFooter"
                            :form-props="trueFormProps"
                            :fallback-label="true"
                            @keyup.native.enter="handleSearch"
                            @form-mounted="handleFormMounted"
                            @change="handleDataChange"
                            @cancel="handleCancel"
                            @submit="handleSubmit"
                            @validation-failed="handleValidationFailed"
                        >
                        </component>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <v-snackbar
            v-model="snackbar"
            :color="snackbarColor"
            :timeout="3000"
        >
            {{ snackbarText }}
        </v-snackbar>
    </div>
</template>

<script>
import { defineAsyncComponent, getCurrentInstance, h } from 'vue';
import EditorHeaderVT from 'demo-common/components/Vuetify/EditorHeaderVT.vue';
import CodeEditor from 'demo-common/components/CodeEditor';
import schemaTypes from 'demo-common/schemaTypes';

const VueDynamicForm = defineAsyncComponent(() => import('@lljj/vue3-form-vuetify'));


const typeItems = Object.keys(schemaTypes);

export default {
    name: 'Demo',
    components: {
        CodeEditor,
        VueDynamicForm,
        EditorHeaderVT
    },
    data() {
        return {
            typeItems,
            curVueForm: 'VueDynamicForm',
            ...this.getDefaultSchemaMap(),
            snackbar: false,
            snackbarText: '',
            snackbarColor: 'info',
            activeHeaderTab: 'playground',
            formComponents: [{
                name: 'Vuetify',
                component: 'VueDynamicForm'
            }],
            customFormats: {
                price(value) {
                    return value !== '' && /^[0-9]\d*$|^\d+(\.\d{1,2})$/.test(value) && value >= 0 && value <= 999999.99;
                }
            }
        };
    },
    computed: {
        pageKey() {
            return this.$route.query.type;
        },
        isUseLabelWidth() {
            return true;
        },
        trueFormProps() {
            if (!this.formProps) return {};
            const {
                labelColSpan,
                wrapperColSpan,
                labelWidth,
                ...otherProps
            } = this.formProps;
            return {
                ...otherProps,
                ...this.isUseLabelWidth ? {
                    labelWidth: labelWidth ? `${labelWidth * 4}px` : undefined
                } : {
                    labelCol: {
                        span: labelColSpan
                    },
                    wrapperCol: {
                        span: wrapperColSpan
                    }
                }
            };
        },
        trueFormFooter() {
            // const {
            // labelColSpan,
            // wrapperColSpan
            // } = this.formProps;

            return this.isUseLabelWidth ? (this.formFooter || {}) : {
                formItemAttrs: {
                    wrapperCol: {
                        span: 24,
                        offset: 0
                    }
                }
            };
        },
        curType() {
            return this.$route.query.type || 'Simple';
        },
        curSchemaCode: {
            get() {
                return this.genCodeStrComputedGetter('schema');
            },
            set(val) {
                return this.genCodeStrComputedSetter('schema', val);
            }
        },
        curUiSchemaCode: {
            get() {
                return this.genCodeStrComputedGetter('uiSchema');
            },
            set(val) {
                return this.genCodeStrComputedSetter('uiSchema', val);
            }
        },
        curFormDataCode: {
            get() {
                return this.genCodeStrComputedGetter('formData');
            },
            set(val) {
                return this.genCodeStrComputedSetter('formData', val);
            }
        },
        curErrorSchemaCode: {
            get() {
                return this.genCodeStrComputedGetter('errorSchema');
            },
            set(val) {
                return this.genCodeStrComputedSetter('errorSchema', val);
            }
        },
        // trueFormProps:
    },
    watch: {
        $route() {
            this.initData();
        }
    },
    created() {
        this.initData();
    },
    methods: {
        sliderFormat(value) {
            return value ? `${value * 4}px` : undefined;
        },
        getDefaultSchemaMap() {
            return {
                schema: {},
                uiSchema: {},
                formData: {},
                errorSchema: {},
                formFooter: {
                    show: true
                },
                formProps: {
                    labelWidth: 25,
                    inline: false,
                    labelPosition: 'top',
                    inlineFooter: false,
                    labelColSpan: 6,
                    wrapperColSpan: 16,
                    layoutColumn: 1,
                    // defaultSelectFirstOption: false
                },
            };
        },
        genCodeStrComputedGetter(vmKey) {
            try {
                return this[vmKey] ? JSON.stringify(this[vmKey], null, 4) : '{}';
            } catch (e) {
                return '{}';
            }
        },
        genCodeStrComputedSetter(vmKey, val) {
            try {
                this[vmKey] = val ? JSON.parse(val) : {};
            } catch (e) {
                // Do not update data when unable to parse
                // this[vmKey] = {};
            }
        },
        initData() {
            // eslint-disable-next-line no-unused-vars
            const { type, ui, ...queryParams } = this.$route.query;

            let queryParamsObj = {};
            try {
                queryParamsObj = Object.entries(queryParams).reduce((preVal, [key, value]) => {
                    preVal[key] = JSON.parse(String(value));
                    return preVal;
                }, {});
            } catch (e) {
                // nothing ...
            }

            // Restore labelWidth
            if (queryParamsObj.formProps && queryParamsObj.formProps.labelWidth) {
                queryParamsObj.formProps.labelWidth = parseFloat(queryParamsObj.formProps.labelWidth) / 4;
            }

            const defaultState = this.getDefaultSchemaMap();
            const formProps = {
                ...defaultState.formProps,
                ...(queryParamsObj.formProps || {})
            };

            Object.assign(this, defaultState, Object.assign(schemaTypes[this.curType], queryParamsObj, {
                formProps
            }));
        },
        handleSearch() {
            console.log('$$uiFormRef', this.$refs.schemaForm.$$uiFormRef);
        },
        handleFormMounted(formRef) {
            console.log('Ui form component:', formRef);
        },
        handleDataChange() {
            console.log('Data change');
        },
        handleSubmit() {
            console.log('Submit');
        },
        clipboard(value) {
            if (document.execCommand) {
                const input = document.createElement('input');
                document.body.appendChild(input);
                input.setAttribute('value', value);
                input.select();

                document.execCommand('copy');
                document.body.removeChild(input);

                return true;
            }

            this.snackbarText = value;
            this.snackbarColor = 'info';
            this.snackbar = true;
            return false;
        },
        handleCancel() {
            console.log('cancel');
        },
        handleValidationFailed(errorObj) {
            console.warn(errorObj);
        },
        handlePreview() {
            const formatStr = jsonCode => JSON.stringify(JSON.parse(jsonCode));

            const genRoute = this.$router.resolve({
                query: {
                    ui: this.curVueForm,
                    type: 'Test',
                    schema: formatStr(this.curSchemaCode),
                    formData: formatStr(this.curFormDataCode),
                    uiSchema: formatStr(this.curUiSchemaCode),
                    errorSchema: formatStr(this.curErrorSchemaCode),
                    formFooter: formatStr(JSON.stringify(this.trueFormFooter)),
                    formProps: formatStr(JSON.stringify(this.trueFormProps)),
                }
            });
            const url = `${window.location.origin}${window.location.pathname}${genRoute.href}`;

            if (this.clipboard(url)) {
                this.snackbarText = 'Preview URL copied successfully';
                this.snackbarColor = 'success';
                this.snackbar = true;
            }
        }
    }
};
</script>

<style module lang="postcss">
.card{
        padding: 20px;
}
.btns {
    display: flex;
    align-items: center;
    justify-content: center;
}
.box {
    padding: 0 15px;
}
.typeList {
    padding: 10px 0 20px;
    font-size: 0;
}
.linkItem {
    display: inline-block;
    margin-right: 8px;
    margin-top: 8px;
    margin-left: auto !important;
}
.middleBox {
    :global {
        .v-card {
            overflow: visible;
        }
        .v-card-title {
            padding: 10px 20px;
            font-size: 14px;
            font-weight: bold;
            background: #FFFFFF;
            z-index: 3;
        }
    }
}
.middleBox_form {
    position: sticky;
    top: 0;
}
.formBox {
    max-height: calc(100vh - 40px);
    overflow: auto !important;
    :global .v-card-title {
        position: sticky;
        top: 0;
    }
}
</style>

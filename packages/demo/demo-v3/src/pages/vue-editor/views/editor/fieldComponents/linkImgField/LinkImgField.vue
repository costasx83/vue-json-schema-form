<template>
    <div :class="$style.box">
        <v-col :class="$style.elFormItem">
            <label
                v-if="selectProps.title"
                class="v-label"
            >
                {{ selectProps.title }}
                <span
                    v-if="elItemRequired"
                    class="text-error"
                > *</span>
            </label>
            <div
                v-if="selectProps.description"
                :class="$style.description"
                v-html="selectProps.description"
            ></div>
            <div :class="$style.formItem">
                <div
                    :class="$style.uploadBox"
                    @click="selectImg"
                >
                    <img
                        v-if="imgUrl"
                        :src="imgUrl"
                        alt=""
                        style="max-width: 100%;max-height: 100%;"
                    >
                    <v-icon
                        v-else
                        size="large"
                    >
                        mdi-plus
                    </v-icon>
                </div>
                <v-text-field
                    v-model="imgLink"
                    :class="$style.input"
                    :placeholder="placeholder"
                    density="compact"
                    variant="outlined"
                ></v-text-field>
            </div>
        </v-col>
    </div>
</template>

<script>
    // Override default field for custom product selection and link input
import {
    fieldProps,
    vueUtils,
    formUtils,
    schemaValidate
} from '@lljj/vue3-form-vuetify';

export default {
    name: 'LinkImgField',
    props: {
        ...fieldProps,
        fieldProps: {
            type: null,
            default: null
        }
    },
    data() {
        return {
            schemaValidate,
            vueUtils
        };
    },
    computed: {
        elItemRequired() {
            // Display red dot for required properties
            return this.schema.required.length > 0;
        },
        placeholder() {
            const imgLinkOptions = formUtils.getUiOptions({
                schema: this.schema.properties.imgLink,
                uiSchema: this.uiSchema.imgLink || {}
            });
            return imgLinkOptions.placeholder || 'Please enter a valid link';
        },
        selectProps() {
            return formUtils.getUiOptions({
                schema: this.schema,
                uiSchema: this.uiSchema
            });
        },
        curValue() {
            return vueUtils.getPathVal(this.rootFormData, this.curNodePath);
        },
        imgUrl: {
            get() {
                return this.curValue.imgUrl;
            },
            set(value) {
                vueUtils.setPathVal(this.rootFormData, vueUtils.computedCurPath(this.curNodePath, 'imgUrl'), value);
            }
        },
        imgLink: {
            get() {
                return this.curValue.imgLink;
            },
            set(value) {
                vueUtils.setPathVal(this.rootFormData, vueUtils.computedCurPath(this.curNodePath, 'imgLink'), value);
            }
        }
    },
    methods: {
        selectImg() {
            const imgs = [
                'https://m.360buyimg.com/babel/jfs/t1/136164/18/4633/216335/5f1176b9E0d2e6f59/e41c72e01932fd73.jpg.webp',
                'https://gw.alicdn.com/tfs/TB1DKP9zCtYBeNjSspkXXbU8VXa-1920-450.jpg_Q90.jpg',
                'https://aecpm.alicdn.com/simba/img/TB1W4nPJFXXXXbSXpXXSutbFXXX.jpg',
                'https://aecpm.alicdn.com/simba/img/TB1_JXrLVXXXXbZXVXXSutbFXXX.jpg',
                'https://img.alicdn.com/tfs/TB1FrlZPAzoK1RjSZFlXXai4VXa-1000-320.jpg',
                'https://img.alicdn.com/tfs/TB1n5sCMYvpK1RjSZPiXXbmwXXa-900-320.jpg',
                'https://img.alicdn.com/tps/i4/TB1ecCsOCzqK1RjSZPxSuw4tVXa.jpg',
                'https://img.alicdn.com/tps/i4/TB1tVhuNhnaK1RjSZFBSuwW7VXa.jpg',
                'https://img.alicdn.com/tfs/TB1IyonQVXXXXXCXXXXXXXXXXXX-750-200.jpg',
                'https://gw.alicdn.com/tfs/TB1hJ2KX6ihSKJjy0FlXXadEXXa-254-318.png',
                'https://gw.alicdn.com/tfs/TB1UE5RaCWD3KVjSZSgXXcCxVXa-720-400.jpg',
                'https://gw.alicdn.com/tfs/TB11iC2uAzoK1RjSZFlXXai4VXa-254-318.jpg',
                'https://gw.alicdn.com/tfs/TB1xo26qeH2gK0jSZFEXXcqMpXa-330-316.jpg',
                'https://img.alicdn.com/bao/uploaded/i3/2781891994/O1CN01usHqqQ1QbILCMqrJm_!!2781891994.jpg',
                'https://img.alicdn.com/bao/uploaded/i1/TB1M31ANFXXXXaOXpXXwu0bFXXX.png',
                'https://img.alicdn.com/imgextra/i2/143584903/O1CN01qdnUD81m5cPPJlXog_!!143584903.jpg',
                'https://img.alicdn.com/tps/i4/TB1Q2Mnd2zO3e4jSZFxwu1P_FXa.png_500x1000q75.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB1t2dzOvb2gK0jSZK9wu1EgFXa.png_500x1000q75.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB1ZJtFOAL0gK0jSZFAwu3A9pXa.png_500x1000q75.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB1y4tuOxz1gK0jSZSgSuuvwpXa.jpg_500x1000q75s0.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB1y4tuOxz1gK0jSZSgSuuvwpXa.jpg_500x1000q75s0.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB1fbhiawoQMeJjy0FnSuv8gFXa.jpg_490x490q100.jpg_.webp',
                'https://gw.alicdn.com/tfs/TB1UzOqoWL7gK0jSZFBXXXZZpXa-468-602.jpg',
                'https://img.alicdn.com/tfs/TB1XjMYnfb2gK0jSZK9XXaEgFXa-468-1236.jpg',
                'https://img.alicdn.com/tps/i4/TB1MesKcWmWQ1JjSZPhwu0CJFXa.png',
                'https://gw.alicdn.com/tfs/TB1xVR9oFP7gK0jSZFjXXc5aXXa-468-602.jpg',
                'https://img.alicdn.com/tps/i4/TB1R8tlXxvbeK8jSZPfSuuriXXa.jpg_490x490q100.jpg_.webp'
            ];
            this.$message.success('Image selected successfully, randomly choosing one image');
            this.imgUrl = imgs[Math.floor(Math.random() * imgs.length)];
        }
    }
};
</script>

<style module>
    @import 'demo-common/css/variable.css';
    .box {
        :global {
            .v-col.error {
                :local {
                    .uploadBox {
                        color: #F56C6C;
                    }
                }
            }
        }
    }
    :global {
        .arrayOrderList_item {
            :local {
                .elFormItem {
                    margin-bottom: 0;
                }
            }
        }
    }
    .formItem {
        align-items: center;
        display: flex;
    }
    .input {
        flex: 1;
        margin-left: 15px;
    }
    .description {
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 10px;
        color: var(--color-text-light)
    }
    .uploadBox {
        cursor: pointer;
        width: 80px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e2e2e2;
    }
</style>

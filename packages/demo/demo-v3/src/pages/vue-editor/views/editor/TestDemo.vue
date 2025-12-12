<template>
    <div
        v-if="true"
        class="demo-wrapper"
    >
        <VueElementForm
            v-model="formData"
            strict-mode
            class="demo-form-box"
            :schema="schema"
            @on-submit="handleSubmit"
        >
        </VueElementForm>
    </div>
</template>

<script>
import VueElementForm from '@lljj/vue3-form-vuetify';

export default {
    components: {
        VueElementForm
    },
    data() {
        return {
            formData: {
                item: [
                    {
                        text: 'Author'
                    },
                    {
                        imgUrl: '',
                        step: 1,
                        text: 'Organization'
                    }
                ]
            },
            schema: {
                title: 'DEMO',
                type: 'object',
                properties: {
                    item: {
                        title: 'Left Click Menu',
                        type: 'array',
                        required: [],
                        minItems: 1,
                        items: {
                            title: 'Menu Type',
                            type: 'object',
                            anyOf: [
                                {
                                    title: 'Unique Clickable Menu',
                                    required: ['text', 'imgUrl', 'step'],
                                    properties: {
                                        text: {
                                            type: 'string',
                                            title: 'Menu Name'
                                        },
                                        imgUrl: {
                                            title: 'Click Popup Image',
                                            type: 'string',
                                        },
                                        step: {
                                            title: 'First Step',
                                            type: 'number',
                                            const: 1,
                                            default: 1,
                                            'ui:disabled': true,
                                            'ui:hidden': true
                                        }
                                    }
                                },
                                {
                                    title: 'Other Menu',
                                    required: ['text'],
                                    properties: {
                                        text: {
                                            type: 'string',
                                            title: 'Menu Name'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
        };
    },
    created() {
        // Initial data
        // this.formData = {
        //     item: [
        //         {
        //             text: 'Author'
        //         },
        //         {
        //             imgUrl: '',
        //             step: 1,
        //             text: 'Organization'
        //         }
        //     ]
        // };
    },
    methods: {
        handleSubmit(formData) {
            debugger;
        }
    }
};
</script>


<style scoped>
    .demo-wrapper {
        z-index: 1000;
        position: fixed;
        width: 100%;
        height: 100%;
        background: #FFFFFF;
    }
    .demo-form-box {
        margin: 0 auto;
        width: 600px;
    }
</style>

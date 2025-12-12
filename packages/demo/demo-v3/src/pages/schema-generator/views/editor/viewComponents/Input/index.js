/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Input',
    type: 'string'
};
export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: 'Options',
            required: [],
            properties: {
                uiOptions: {
                    type: 'object',
                    properties: {
                        placeholder: {
                            type: 'string',
                            title: 'Placeholder',
                            default: 'Please enter'
                        },
                        clearable: {
                            title: 'Show Clear Button',
                            type: 'boolean',
                            default: false
                        },
                        showWordLimit: {
                            title: 'Show Word Limit',
                            type: 'boolean',
                            default: false
                        },
                        showPassword: {
                            title: 'Password Field',
                            type: 'boolean',
                            default: false
                        },
                        type: {
                            type: 'string',
                            title: 'Input Type',
                            enum: [
                                'text',
                                'textarea'
                            ],
                            enumNames: [
                                'Input',
                                'Textarea'
                            ]
                        },
                    }
                }
            }
        },
        rules: {
            type: 'object',
            title: 'Validation Rules',
            required: [],
            properties: {
                schemaOptions: {
                    type: 'object',
                    properties: {
                        maxLength: {
                            title: 'Max Length',
                            type: 'number'
                        },
                        minLength: {
                            title: 'Min Length',
                            type: 'number'
                        }
                    }
                }
            }
        }
    })
};

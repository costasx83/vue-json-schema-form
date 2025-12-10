/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Number Input',
    type: 'number'
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: 'Options',
            required: [],
            properties: {
                schemaOptions: {
                    type: 'object',
                    properties: {
                        multipleOf: {
                            title: 'Step',
                            type: 'number',
                            default: 1
                        },
                    }
                },
                uiOptions: {
                    type: 'object',
                    properties: {
                        stepStrictly: {
                            title: 'Strict Step',
                            type: 'boolean',
                            default: false
                        },
                        precision: {
                            title: 'Precision',
                            type: 'number',
                            minimum: 0
                        },
                        controlsPosition: {
                            type: 'string',
                            title: 'Control Position',
                            enum: [
                                'default',
                                'right'
                            ],
                            enumNames: [
                                'Default Both Sides',
                                'Right Side'
                            ],
                            default: 'default'
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
                        minimum: {
                            title: 'Minimum',
                            type: 'number'
                        },
                        maximum: {
                            title: 'Maximum',
                            type: 'number'
                        },
                    }
                }
            }
        }
    }, 'number')
};

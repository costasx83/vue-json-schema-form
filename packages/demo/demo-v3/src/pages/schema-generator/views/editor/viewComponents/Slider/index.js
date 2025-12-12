/**
 * Created by Liu.Jun on 2020/10/30 16:25.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Number (slider)',
    type: 'number',
    'ui:widget': 'v-slider'
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
                        showInput: {
                            title: 'Show Input',
                            type: 'boolean',
                            default: false
                        },
                        showInputControls: {
                            title: 'Control Buttons',
                            type: 'boolean',
                            default: true
                        },
                        showStops: {
                            title: 'Show Stops',
                            type: 'boolean',
                            default: false
                        },
                        showTooltip: {
                            title: 'Show Tooltip',
                            type: 'boolean',
                            default: true
                        },
                        debounce: {
                            title: 'Debounce (ms)',
                            type: 'number',
                            default: 300
                        }
                    }
                },
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

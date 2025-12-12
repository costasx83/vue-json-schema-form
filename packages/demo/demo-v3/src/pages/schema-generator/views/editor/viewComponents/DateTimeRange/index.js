/**
 * Created by Liu.Jun on 2020/10/30 17:10.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'DateTime Range (timestamp)',
    type: 'array',
    format: 'date-time',
    items: {
        type: 'number'
    }
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
                        startPlaceholder: {
                            type: 'string',
                            title: 'Start Placeholder',
                            default: 'Start Date'
                        },
                        endPlaceholder: {
                            type: 'string',
                            title: 'End Placeholder',
                            default: 'End Date'
                        }
                    }
                }
            }
        }
    })
};

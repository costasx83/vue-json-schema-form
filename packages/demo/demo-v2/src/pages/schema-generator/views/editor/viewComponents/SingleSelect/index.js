/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Single Select',
    type: 'string'
};

const selectOptionsSchema = {
    enum: {
        title: 'Option Values',
        type: 'array',
        minItems: 1,
        'ui:showIndexNumber': true,
        default: ['1', '2', '3'],
        items: {
            title: 'Option Value',
            type: 'string'
        }
    },
    enumNames: {
        title: 'Option Names',
        type: 'array',
        minItems: 1,
        'ui:showIndexNumber': true,
        default: ['One', 'Two', 'Three'],
        items: {
            title: 'Option Name',
            type: 'string'
        }
    }
};

export {
    selectOptionsSchema
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
                    properties: selectOptionsSchema
                }
            },
        }
    })
};

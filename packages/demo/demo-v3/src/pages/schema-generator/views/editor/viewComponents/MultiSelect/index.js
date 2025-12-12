/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import genSchema from '../genSchema.js';
import { selectOptionsSchema } from '../SingleSelect';

const viewSchema = {
    // title: 'Multi-select Type',
    type: 'array',
    uniqueItems: true,
    items: {
        type: 'string'
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
                schemaOptions: {
                    type: 'object',
                    properties: {
                        uniqueItems: {
                            type: 'boolean',
                            'ui:widget': 'hidden',
                            default: true
                        },
                        items: {
                            type: 'object',
                            properties: {
                                type: {
                                    type: 'string',
                                    default: 'string',
                                    'ui:hidden': true,
                                },
                                ...selectOptionsSchema,
                            }
                        },
                    }
                }
            }
        }
    }, 'array', true)
};

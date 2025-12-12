/**
 * Created by Liu.Jun on 2020/12/10 15:16.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Boolean (Radio)',
    type: 'boolean',
    'ui:widget': 'RadioWidget'
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: 'Options',
            properties: {
                schemaOptions: {
                    type: 'object',
                    properties: {
                        enumNames: {
                            type: 'array',
                            items: [{
                                title: 'Active Text',
                                type: 'string',
                                default: 'Yes'
                            }, {
                                title: 'Inactive Text',
                                type: 'string',
                                default: 'No'
                            }]
                        }
                    }
                }
            }
        }
    })
};

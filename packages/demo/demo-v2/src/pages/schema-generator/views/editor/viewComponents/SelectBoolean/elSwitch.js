/**
 * Created by Liu.Jun on 2020/12/10 15:15.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Boolean (Switch)',
    type: 'boolean'
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: 'Options',
            properties: {
                uiOptions: {
                    type: 'object',
                    properties: {
                        activeText: {
                            title: 'Active Text',
                            type: 'string'
                        },
                        inactiveText: {
                            title: 'Inactive Text',
                            type: 'string'
                        }
                    }
                }
            }
        }
    })
};

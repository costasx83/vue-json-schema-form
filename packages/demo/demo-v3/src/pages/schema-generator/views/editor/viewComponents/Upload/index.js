/**
 * Created by Liu.Jun on 2020/11/27 11:03 PM.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Single File',
    type: 'string',
    'ui:widget': 'UploadWidget',
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
                    required: ['action'],
                    properties: {
                        action: {
                            title: 'Upload URL',
                            type: 'string',
                            format: 'uri',
                            default: 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca'
                        },
                        btnText: {
                            title: 'Button Text',
                            type: 'string'
                        }
                    }
                }
            }
        }
    })
};

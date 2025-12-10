/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

import baseData from './index';

export default {
    viewSchema: {
        ...baseData.viewSchema,
        title: 'DateTime (string)',
        type: 'string'
    },
    propsSchema: baseData.propsSchema
};

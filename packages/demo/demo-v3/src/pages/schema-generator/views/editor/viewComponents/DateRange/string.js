/**
 * Created by Liu.Jun on 2020/12/10 16:57.
 */

import baseData from './index';

export default {
    viewSchema: {
        ...baseData.viewSchema,
        title: 'Date Range (string)',
        items: {
            type: 'string'
        }
    },
    propsSchema: baseData.propsSchema
};

/**
 * Created by Liu.Jun on 2020/12/10 15:41.
 */

import baseRadio from './index';

const viewSchema = {
    title: 'Single Select (Radio)',
    type: 'string',
    'ui:widget': 'RadioWidget'
};

export default {
    viewSchema,
    propsSchema: baseRadio.propsSchema
};

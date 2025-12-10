/**
 * Created by Liu.Jun on 2020/5/19 9:49 PM.
 */

import { h } from 'vue';
import SelectLinkageField from '../SelectLinkageField';

export default {
    name: 'AnyOfField',
    setup(props, { attrs, slots }) {
        return () => h(SelectLinkageField, {
            ...attrs,
            combiningType: 'anyOf',
            selectList: attrs.schema.anyOf
        }, slots);
    }
};

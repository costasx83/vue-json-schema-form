/**
 * Created by Liu.Jun on 2019/12/4 15:06.
 */
import { defineAsyncComponent } from 'vue';

import propsSchema from './schema.json';
import uiSchema from './uiSchema.js';
import errorSchema from './errorSchema.js';

const View = defineAsyncComponent(() => import('./component/View.vue'));

export default {
    View,
    propsSchema,
    uiSchema,
    errorSchema
};

/**
 * Created by Liu.Jun on 2019/11/25 19:51.
 */
import { defineAsyncComponent } from 'vue';

import propsSchema from './schema.js';
import uiSchema from './uiSchema.js';

const View = defineAsyncComponent(() => import('./View.vue'));

export default {
    View,
    propsSchema,
    uiSchema
};

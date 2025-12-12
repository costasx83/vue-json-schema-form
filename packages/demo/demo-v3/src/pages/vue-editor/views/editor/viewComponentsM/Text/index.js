/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */
import { defineAsyncComponent } from 'vue';

import propsSchema from './propsSchema.json';
import uiSchema from './uiSchema.js';

const View = defineAsyncComponent(() => import('./View.vue'));

export default {
    View,
    propsSchema,
    uiSchema
};

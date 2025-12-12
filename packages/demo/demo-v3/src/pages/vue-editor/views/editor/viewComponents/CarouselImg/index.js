/**
 * Created by Liu.Jun on 2019/12/4 15:06.
 */
import { defineAsyncComponent } from 'vue';

import propsSchema from './CarouselImg.json';
import uiSchema from './uiSchema.js';
import errorSchema from './errSchema.js';

const View = defineAsyncComponent(() => import('./View.vue'));

export default {
    View,
    propsSchema,
    uiSchema,
    errorSchema
};

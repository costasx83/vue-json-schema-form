/**
 * Created by Liu.Jun on 2019/11/25 19:51.
 */
import { defineAsyncComponent } from 'vue';

import propsSchema from './AllGoodsList.json';

const View = defineAsyncComponent(() => import('./component/View.vue'));

export default {
    View,
    propsSchema
};

/**
 * Created by Liu.Jun on 2020/4/24 10:59.
 */

import Vue from 'vue';

const ExtraComponents = {
    // Additional Field that needs to be registered, select image and link through image
    LinkImgField: () => import('../fieldComponents/linkImgField/LinkImgField')
};

Object.entries(ExtraComponents).forEach(([key, value]) => {
    Vue.component(key, value);
});

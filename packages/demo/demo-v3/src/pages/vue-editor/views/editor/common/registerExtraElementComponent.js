/**
 * Created by Liu.Jun on 2020/4/24 10:59.
 */
import { defineAsyncComponent } from 'vue';

// Export components to be registered in main app
export const ExtraComponents = {
    // Additional Field that needs to be registered, select image and link through image
    LinkImgField: defineAsyncComponent(() => import('../fieldComponents/linkImgField/LinkImgField'))
};

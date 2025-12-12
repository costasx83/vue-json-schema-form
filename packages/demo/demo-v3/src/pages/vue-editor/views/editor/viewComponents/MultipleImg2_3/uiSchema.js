/**
 * Created by Liu.Jun on 2020/4/30 17:13.
 */

import genImgItem from '../_commonConfig/ui/genImgItem';

const line2Item = genImgItem({
    width: 383,
    height: 500,
});

export default {
    imgItem1_1: {
        'ui:title': 'Image top left',
        ...genImgItem({
            width: 786,
            height: 420,
        })
    },
    imgItem1_2: {
        'ui:title': 'Image top right',
        ...line2Item
    },
    imgItem2_1: {
        'ui:title': 'Image bottom left',
        ...line2Item
    },
    imgItem2_2: {
        'ui:title': 'Image bottom center',
        ...line2Item
    },
    imgItem2_3: {
        'ui:title': 'Image bottom right',
        ...line2Item
    }
};

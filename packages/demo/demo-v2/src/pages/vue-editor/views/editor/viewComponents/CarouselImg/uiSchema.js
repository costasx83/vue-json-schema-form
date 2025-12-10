/**
 * Created by Liu.Jun on 2020/4/30 17:13.
 */

import genImgItem from '../_commonConfig/ui/genImgItem';

export default {
    imgList: {
        'ui:options': {
            title: 'Add image',
            description: 'Image width 1920px, height fixed 500px. <span>Default field and validation prompt used here</span>',
            showIndexNumber: true
        },
        items: {
            ...genImgItem({
                width: 1920,
                height: 500,
            }),
            'ui:title': 'Carousel image configuration'
        }
    }
};

/**
 * Created by Liu.Jun on 2020/7/25 15:47.
 */

import genImgItem from '../_commonConfig/ui/genImgItem';

export default {
    title: {
        'ui:placeholder': 'Please enter title'
    },
    subTitle: {
        'ui:placeholder': 'Please enter subtitle'
    },
    banner: {
        link: {
            ...genImgItem()
        },
        bannerTitle: {
            'ui:placeholder': 'Please enter banner title'
        },
        bannerSubTitle: {
            'ui:placeholder': 'Please enter banner subtitle'
        }
    },
    goodsList: {
        'ui:showIndexNumber': true,
        items: {
            ...genImgItem()
        }
    }
};

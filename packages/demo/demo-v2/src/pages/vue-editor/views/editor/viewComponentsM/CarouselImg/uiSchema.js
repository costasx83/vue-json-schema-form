/**
 * Created by Liu.Jun on 2020/4/30 17:13.
 */

import genImgItem from '../../viewComponents/_commonConfig/ui/genImgItem';

export default {
    imgList: {
        'ui:options': {
            title: 'Add image',
            description: 'Image width 750px, height fixed 400px. <span>Default field and validation prompt used here</span>'
        },
        items: {
            ...genImgItem({
                width: 1920,
                height: 500,
            }),
            imgLink: {
                'err:format': 'Please enter a valid link address',
                'err:required': 'Cannot be empty'
            },
            'ui:title': 'Carousel image configuration'
        }
    }
};

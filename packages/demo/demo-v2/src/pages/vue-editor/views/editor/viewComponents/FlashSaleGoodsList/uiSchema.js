import genImgItem from '../_commonConfig/ui/genImgItem';

export default {
    startTime: {
        'ui:options': {
            placeholder: 'Select start time',
            style: {
                width: '100%'
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                }
            }
        }
    },
    seckillBrand: {
        ...genImgItem(),
        'ui:title': 'Right fixed ad space configuration'
    },
    goodsList: {
        'ui:options': {
            title: 'Add product',
            description: 'Add flash sale products. This should be combined with specific business logic for adding products',
            showIndexNumber: true
        },
        items: {
            ...genImgItem({
                width: 1920,
                height: 500,
            }),
            'ui:title': 'Product configuration'
        }
    }
};

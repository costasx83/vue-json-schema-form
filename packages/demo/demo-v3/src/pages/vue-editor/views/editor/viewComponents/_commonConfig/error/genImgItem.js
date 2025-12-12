/**
 * Created by Liu.Jun on 2020/4/30 17:04.
 */

// errorSchema imgItem
export default function genImgItem() {
    return {
        imgUrl: {
            'err:format': 'Please select an image properly',
            'err:required': 'Please select the image you want to configure'
        },
        imgLink: {
            'err:format': 'Please enter a valid link address',
            'err:required': 'Please enter a valid link address'
        }
    };
}

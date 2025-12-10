/**
 * Created by Liu.Jun on 2020/11/27 16:42.
 */
export default {
    schema: {
        title: 'File Upload',
        type: 'object',
        description: (
            'File upload uses el-upload component, supports all el-upload parameters,' +
            '<br/>slot can be passed as VNode array list through slots parameter'
        ),
        properties: {
            imgUrl: {
                title: 'Single Image',
                type: 'string',
                default: 'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',
                'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
                'ui:widget': 'UploadWidget',
                'ui:btnText': 'Upload button text configuration'
            },
            imgUrlList: {
                title: 'Multiple Images',
                type: 'array',
                'ui:widget': 'UploadWidget',
                'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
                // eslint-disable-next-line max-len
                default: [
                    'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp'
                ],
                items: {
                    type: 'string',
                }
            }
        }
    },
    formData: {}
};

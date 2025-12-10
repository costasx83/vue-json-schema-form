export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Single text input component',
    description: 'Single text input component, used to configure a text message on the page',
    type: 'object',
    required: ['txt'],
    properties: {
        /* imgUrl: {
            title: 'Test image upload',
            type: 'string',
            default: 'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',
            'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
            'ui:widget': 'UploadWidget',
            'ui:btnText': 'Upload button text configuration',
            'ui:responseFileUrl': (res) => {}
        }, */
        txt: {
            title: 'Text',
            type: 'string',
            'err:required': 'Title text content must be entered',
            'fui:placeholder': (parent, root, prop) => {
                console.log(parent, root, prop);
                return parent.txtColor;
            },
        },
        txtColor: {
            title: 'Select text color',
            type: 'string',
            format: 'color',
            default: '#ff0132'
        }
    }
};

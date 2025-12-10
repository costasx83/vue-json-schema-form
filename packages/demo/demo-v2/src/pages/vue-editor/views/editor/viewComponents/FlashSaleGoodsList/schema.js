export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    definitions: {
        ImgItem: {
            type: 'object',
            properties: {
                imgUrl: {
                    title: 'Image URL',
                    type: 'string',
                    format: 'uri'
                },
                imgLink: {
                    title: 'Link URL',
                    type: 'string',
                    format: 'uri',
                    default: 'https://www.jd.com'
                }
            },
            required: [
                'imgUrl',
                'imgLink'
            ]
        }
    },
    properties: {
        startTime: {
            title: 'Configure flash sale start time',
            type: 'string',
            format: 'date-time'
        },
        seckillBrand: {
            $ref: '#/definitions/ImgItem'
        },
        goodsList: {
            type: 'array',
            minItems: 4,
            maxItems: 8,
            uniqueItems: true,
            'ui:afterArrayOperate': (formData, command, payload) => {
                debugger;
            },
            items: {
                $ref: '#/definitions/ImgItem'
            }
        }
    },
    required: [
        'startTime'
    ],
    additionalProperties: false
};

/**
 * Created by Liu.Jun on 2020/5/19 15:00.
 */

export default {
    schema: {
        type: 'object',
        definitions: {
            address: {
                type: 'object',
                properties: {
                    street_address: {
                        title: 'Street',
                        type: 'string'
                    },
                    city: {
                        title: 'City',
                        type: 'string'
                    },
                    state: {
                        title: 'State/Country',
                        type: 'string'
                    }
                },
                required: ['street_address', 'city', 'state']
            }
        },
        properties: {
            test: {
                title: 'Test string',
                allOf: [
                    {
                        type: 'string',
                        default: 'xxx',
                    },
                    {
                        maxLength: 5
                    }
                ]
            },
            testAllOfRef: {
                allOf: [
                    {
                        $ref: '#/definitions/address'
                    },
                    {
                        properties: {
                            type: {
                                type: 'string',
                                title: 'allOf enum',
                                enum: ['residential', 'business']
                            }
                        }
                    }
                ],
            }
        },
        allOf: [
            {
                properties: {
                    lorem: {
                        title: 'allOf title',
                        type: ['string', 'boolean'],
                        default: false,
                    },
                },
            },
            {
                properties: {
                    lorem: {
                        type: 'boolean',
                    },
                    ipsum: {
                        title: 'title',
                        type: 'string',
                    },
                },
            },
        ],
    },
    formData: {},
};

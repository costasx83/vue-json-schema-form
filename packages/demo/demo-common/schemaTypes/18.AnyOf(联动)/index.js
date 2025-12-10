/**
 * Created by Liu.Jun on 2020/5/19 15:00.
 */

export default {
    schema: {
        type: 'object',
        required: [
            'age'
        ],
        properties: {
            age: {
                title: 'Test basic type anyOf',
                anyOf: [
                    {
                        title: 'Test basic type anyOf - Multiples of 5',
                        type: 'integer',
                        multipleOf: 5
                    },
                    {
                        title: 'Test basic type anyOf - Multiples of 3',
                        type: 'integer',
                        multipleOf: 3
                    }
                ],
                anyOfSelect: {
                    'ui:widget': 'RadioWidget',
                    'ui:title': 'Select option',
                    'ui:options': {
                    }
                }
            },
            test: {
                title: 'Test const anyOf',
                type: 'string',
                anyOf: [
                    {
                        title: 'schema option1',
                        const: '111'
                    },
                    {
                        'ui:title': 'ui-option2',
                        const: '222'
                    }
                ]
            },
            items: {
                title: 'Test OneOf Array Items',
                type: 'array',
                items: {
                    type: 'object',
                    anyOf: [
                        {
                            properties: {
                                foo: {
                                    type: 'string'
                                }
                            }
                        },
                        {
                            properties: {
                                bar: {
                                    type: 'string'
                                }
                            }
                        }
                    ]
                }
            }
        },
        anyOfSelect: {
            'ui:widget': 'RadioWidget',
            'ui:title': 'Test anyOf object',
            'ui:options': {
                style: {
                    // width: '300px',
                }
            }
        },
        anyOf: [
            {
                'ui:showTitle': true,
                title: 'First method of identification',
                properties: {
                    type: {
                        'ui:hidden': true,
                        type: 'string',
                        default: 'userName',
                        const: 'userName'
                    },
                    firstName: {
                        type: 'string',
                        title: 'First name',
                        default: 'Chuck'
                    },
                    lastName: {
                        type: 'string',
                        title: 'Last name'
                    }
                }
            },
            {
                'ui:showTitle': true,
                title: 'Second method of identification',
                properties: {
                    type: {
                        'ui:hidden': true,
                        type: 'string',
                        default: 'id',
                        const: 'id'
                    },
                    firstName: {
                        type: 'string',
                        title: 'First name'
                    },
                    idCode: {
                        type: 'string',
                        title: 'ID code',
                        default: 'Default id'
                    }
                }
            }
        ]
    },
    uiSchema: {
    },
    formData: {
    }
};

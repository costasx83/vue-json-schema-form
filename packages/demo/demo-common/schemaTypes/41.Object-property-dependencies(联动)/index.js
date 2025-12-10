/**
 * Created by Liu.Jun on 2020/5/19 15:41.
 */

export default {
    schema: {
        title: 'Object property dependencies',
        type: 'object',
        properties: {
            unidirectional: {
                title: 'Unidirectional dependency',
                description: 'Basic property unidirectional dependency, ui-schema configures onlyShowIfDependent to show only when depended upon',
                type: 'object',
                'ui:options': {
                    onlyShowIfDependent: true
                },
                properties: {
                    name: {
                        title: 'Name',
                        type: 'string'
                    },
                    credit_card: {
                        title: 'Credit card',
                        type: 'string'
                    },
                    billing_address: {
                        title: 'Billing address',
                        type: 'string'
                    }
                },
                required: [
                    'name'
                ],
                dependencies: {
                    credit_card: [
                        'billing_address'
                    ]
                }
            },
            bidirectional: {
                title: 'Bidirectional dependency',
                description: 'Explicitly define bidirectional dependency, if onlyShowIfDependent is configured it will cause both to fail rendering when there are no initial values, users need to consider this themselves',
                type: 'object',
                properties: {
                    name: {
                        title: 'Name',
                        type: 'string'
                    },
                    credit_card: {
                        title: 'Credit card',
                        type: 'string'
                    },
                    billing_address: {
                        title: 'Billing address',
                        type: 'string'
                    }
                },
                required: [
                    'name'
                ],
                dependencies: {
                    credit_card: [
                        'billing_address'
                    ],
                    billing_address: [
                        'credit_card'
                    ]
                }
            }
        }
    }
};

export default {
    schema: {
        title: 'Test Registration Form',
        description: 'A simple form example.',
        type: 'object',
        required: ['firstName', 'lastName'],
        'ui:order': [
            'lastName',
            'firstName',
            '*',
            'password',
        ],
        properties: {
            firstName: {
                type: 'string',
                title: 'First name',
                default: 'Jun'
            },
            lastName: {
                type: 'string',
                title: 'Last name',
                'ui:options': {
                    description: 'Please enter your last name'
                },
                'err:required': 'Last Name is required'
            },
            price: {
                type: 'string',
                description: 'Enter up to two decimal places, maximum value 999999.99',
                title: 'Price',
                format: 'price'
            },
            age: {
                type: 'integer',
                title: 'Age',
                maximum: 80,
                minimum: 16
            },
            bio: {
                type: 'string',
                title: 'Bio',
                minLength: 10
            },
            password: {
                type: 'string',
                title: 'Password',
                minLength: 3,
            },
            telephone: {
                type: 'string',
                title: 'Telephone',
                minLength: 10,
            },
        },
    },
    formData: {
        lastName: 'Liu',
        age: 88,
        bio: 'The more you know, the less you know',
        password: 'My.Pass',
        telephone: '1881446xxxx'
    },
    uiSchema: {
        'ui:description': 'Simple form example (overriding default description configuration via UiSchema)',
        firstName: {
            'ui:title': 'First Name',
            'ui:description': 'For example: Li Bai\'s surname is Li, Sun Shangxiang\'s surname is Sun, Marco Polo\'s surname is Marco',
            'ui:emptyValue': '',
            'ui:options': {
                placeholder: 'Please enter your first name',
                attrs: {
                    autofocus: true
                }
            }
        },
        bio: {
            'ui:options': {
                placeholder: 'Please enter your bio',
                type: 'textarea',
                rows: 6
            }
        }
    },
    errorSchema: {
        bio: {
            'err:minLength': 'Bio must be at least 10 characters'
        }
    }
};

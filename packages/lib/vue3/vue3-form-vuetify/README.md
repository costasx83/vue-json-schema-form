# @lljj/vue3-form-vuetify

Generate forms based on [Vuetify](https://vuetifyjs.com/en/components/all/#containment), Vue3, and [JSON Schema](https://json-schema.org/understanding-json-schema/index.html)

> Adapted for Vuetify Vue3 library from [@lljj/vue3-form-core](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue3/vue3-core)

## Installation

```ssh
## npm
npm install --save @lljj/vue3-form-vuetify

## yarn
yarn add @lljj/vue3-form-vuetify
```

## Usage
```html
<VueForm
    v-model="formData"
    :schema="schema"
>
</VueForm>
```

```js
//  Usage
import VueForm from '@lljj/vue3-form-vuetify';

export default {
    name: 'Demo',
    components: {
        VueForm
    },
    data() {
        return {
            formData: {},
            schema: {
                type: 'object',
                required: [
                    'userName',
                    'age',
                ],
                properties: {
                    userName: {
                        type: 'string',
                        title: 'Username',
                        default: 'Liu.Jun',
                    },
                    age: {
                        type: 'number',
                        title: 'Age'
                    },
                    bio: {
                        type: 'string',
                        title: 'Bio',
                        minLength: 10,
                        default: 'The more you know, the less you know',
                        'ui:options': {
                            placeholder: 'Please enter your bio',
                            type: 'textarea',
                            rows: 1
                        }
                    }
                }
            }
        };
    }
};
```

## License
Apache-2.0

# string

## Description
>* Configuration examples for type `string`
>* Official documentation - [JSON Schema string](https://json-schema.org/understanding-json-schema/reference/string.html)

## Data Validation
> You can use minLength and maxLength keywords to restrict the length of strings
### `minLength`
Minimum length

### `maxLength`
Maximum length

### `pattern`
Regular expression

### `format`
Common type validation, such as `uri` `email`, see `JSON Schema` official documentation

## Special Fields

### enum
* `enum` is rendered as a single-select dropdown by default, `enumNames` is rendered as the dropdown label
* `ui:enumNames` can override the default dropdown label

Demonstration below:

`schema`, `ui-schema`, `error-schema` related configurations

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-schema="errorSchema"
    >
        <div slot-scope="{ formData }">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
        </div>
    </vue-form>
</template>
<script>
   export default {
        data() {
            return {
                formData: {},
                schema: {
                    title: 'Demo: type string',
                    type: 'object',
                    required: [
                        'userName'
                    ],
                    properties: {
                        userName: {
                            type: 'string',
                            title: 'Username',
                            minLength: 2,
                            maxLength: 8,
                            default: 'Liu.Jun'
                        },
                        homePage: {
                            type: 'string',
                            description: 'Enter your homepage, hostname must be www.google.com',
                            title: 'Homepage',
                            format: 'uri',
                            pattern: "^https?:\\/\\/www\\.google\\.com.*"
                        },
                        stringEnum: {
                            type: 'string',
                            title: 'String Enum (radio)',
                            enum: ['red', 'yellow', 'blue'],
                            enumNames: ['Color - 1', 'Color - 2', 'Color - 3']
                        }
                    }
                },
                uiSchema: {
                    userName: {
                        'ui:description': 'Must enter 2 - 8 characters',
                        'ui:options': {
                            style: {
                                boxShadow: '0 0 3px 1px red',
                            }
                        }
                    },
                    stringEnum: {
                        'ui:widget': 'RadioWidget',
                        'ui:enumNames': ['UiColor - 1', 'UiColor - 2', 'UiColor - 3']
                    }
                },
                errorSchema: {
                    userName: {
                        'err:options': {
                            required: 'Please enter username'
                        }
                    },
                    homePage: {
                        'err:pattern': 'Please enter correct homepage address - hostname must be www.google.com'
                    }
                }
            }
        }
   }
</script>
```
:::


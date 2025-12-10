# number/integer

## Description
>* Configuration examples for type `number`
>* Official documentation - [JSON Schema number](https://json-schema.org/understanding-json-schema/reference/numeric.html)


## Data Validation
### `integer`
Integer type

### `multipleOf`
Base number, must be a multiple of the base

### `minimum`
Minimum value

### `maximum`
Maximum value


:::tip
* integer needs to be set using type

```js
{ type: 'integer' }
```

* `exclusiveMinimum` `exclusiveMinimum` see schema documentation

* Based on `schema` configuration, the following `props` are passed to the `Widget` component
```js
    const props = {};
    if (undefined !== schema.multipleOf) {
        // Component counter step
        props.step = schema.multipleOf;
    }
    if (schema.minimum || schema.minimum === 0) {
        props.min = schema.minimum;
    }
    if (schema.maximum || schema.maximum === 0) {
        props.max = schema.maximum;
    }
```

* `enum` configuration is the same as `string` type, [view enum](/en/rules/string.html#enum)
:::

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
                    title: 'Demo: type number',
                    type: 'object',
                    required: [
                        'age'
                    ],
                    properties: {
                        age: {
                            type: 'integer',
                            title: 'Age',
                            minimum: 10,
                            maximum: 99,
                            default: 18
                        },
                        price: {
                            type: 'number',
                            description: 'Please enter price, must be a multiple of 0.5',
                            title: 'Price',
                            multipleOf: 0.5,
                            default: 1,
                        },
                        numberEnum: {
                            type: 'number',
                            title: 'Number Enum (select)',
                            enum: [1, 2, 3],
                            enumNames: ['Select - 1', 'Select - 2', 'Select - 3']
                        }
                    }
                },
                uiSchema: {
                    age: {
                        'ui:widget': 'el-slider',
                        'ui:description': 'Age 10 - 99',
                        'ui:options': {
                            style: {
                                boxShadow: '0 0 3px 1px yellow',
                            }
                        }
                    }
                },
                errorSchema: {
                    age: {
                        'err:options': {
                            required: 'Please enter age 10 - 99'
                        }
                    }
                }
            }
        }
   }
</script>
```
:::


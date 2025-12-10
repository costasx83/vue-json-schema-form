# object

## Description
>* Configuration examples for type `object`
>* Official documentation - [JSON Schema object](https://json-schema.org/understanding-json-schema/reference/object.html)

## Data Validation
### `additionalProperties`
Whether other properties can exist. Only supports configuring `false`, others are not supported

### `required`
Array type, containing required property keys

### `minProperties`
Minimum number of object properties

### `maxProperties`
Maximum number of object properties

### `dependencies`
Supports configuring property dependencies

::: warning
* `Dependencies` schema dependencies not supported
* `additionalProperties` only supports configuring `false`
* `Pattern Properties` not supported
:::

Demonstration below:

`schema`, `ui-schema`, `error-schema` related configurations

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :error-schema="errorSchema"
    >
        <div slot-scope="{ formData, formRefFn}">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
            <p><el-button @click="formRefFn().validate()" type="primary">校验数据</el-button></p>
        </div>
    </vue-form>
</template>
<script>
   export default {
        data() {
            return {
                formData: {
                    orderInfo: {
                        a: '11'
                    }
                },
                schema: {
                    id: 'objectSchema',
                    title: 'Demo: type object',
                    type: 'object',
                    properties: {
                        userInfo: {
                            type: 'object',
                            title: 'User Info',
                            description: 'Display user profile',
                            required: ['firstName'],
                            properties: {
                                firstName: {
                                    type: 'string',
                                    title: 'First Name',
                                    default: 'Jun'
                                },
                                lastName: {
                                    type: 'string',
                                    title: 'Last Name'
                                }
                            }
                        },
                        orderInfo: {
                            type: 'object',
                            title: 'Order Info',
                            description: 'Display user order data',
                            additionalProperties: false,
                            properties: {
                                orderId: {
                                    type: 'string',
                                    title: 'Order ID',
                                    default: '12312311123123'
                                }
                            }
                        }
                    }
                },
                errorSchema: {
                    orderInfo: {
                        'err:additionalProperties': 'Order info cannot contain additional properties'
                    }
                }
            }
        }
   }
</script>

<style>
.genFromComponent_objectSchemaForm .__pathRoot_orderInfo .validateWidget-object .formItemErrorBox{
    margin-top: -15px;
}
</style>
```
:::

## Other Configurations

### ui:order
* Supports sorting property rendering order by configuring `ui-schema` `ui:order`.
* See [ui-schema order configuration](https://form.lljj.me/#/demo?type=Simple)

For example:
```js
// Supports * to match other values
uiSchema = {
    'ui:order': ['number', '*'],
    // 'ui:order': ['firstName', 'lastName'],
}
```

### ui:onlyShowIfDependent

Configuring `onlyShowIfDependent: true` in `ui-schema` can hide items that haven't triggered dependencies, [see here](/en/guide/data-linkage.html#object-dependencies-Data Linkage)

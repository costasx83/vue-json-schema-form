# boolean
## Description
>* Configuration examples for type `boolean`
>* Official documentation - [JSON Schema boolean](https://json-schema.org/understanding-json-schema/reference/boolean.html)

## Data Validation
* `boolean` type: `true` and `false`

Demonstration below: `schema`, `ui-schema`, `error-schema` related configurations

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
                    title: 'Demo: type boolean',
                    type: 'object',
                    properties: {
                        switch: {
                            type: 'boolean',
                            title: 'On or Off'
                        }
                    }
                },
                uiSchema: {
                    switch: {
                        'ui:options': {
                            activeText: 'On',
                            inactiveText: 'Off'
                        }
                    }
                },
                errorSchema: {}
            }
        }
   }
</script>
```
:::



# null

## Description
>* Configuration examples for type `null`
>* Official documentation - [JSON Schema null](https://json-schema.org/understanding-json-schema/reference/null.html)

## Data Validation
* `null` type has a fixed value of null, null field is not rendered, `formData` value is `null`

Demonstration below: `schema`, `ui-schema`, `error-schema` related configurations

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
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
                    title: 'Demo: type null',
                    type: 'object',
                    properties: {
                        nullType: {
                            type: 'null'
                        }
                    }
                }
            }
        }
   }
</script>
```



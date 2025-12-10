---
sidebarDepth: 2
---

# combining
>* Official documentation - [JSON Schema combining](https://json-schema.org/understanding-json-schema/reference/combining.html)

Includes the following types:
* [allOf](#allof)
* [anyOf](#anyof)
* [oneOf](#oneof)
* [not](#not)

## allOf
### Description
* Must be valid for all `schema`
* Official documentation - [JSON Schema allOf](https://json-schema.org/understanding-json-schema/reference/combining.html#allof)

### Data Validation
* `allOf` must be valid for all `schema`

> During `schema` data processing, a deep merge operation is performed on each item of `allOf`. For items that cannot be merged, the operation is abandoned.
> ```js
> // For example, the following data is always `false` and cannot be merged
> schema = {
>   "allOf": [
>     { "type": "string" },
>     { "type": "number" }
>  ]
> }
> ```

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
                    title: 'Demo: allOf',
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
                                    title: 'Country',
                                    type: 'string'
                                }
                            },
                            required: ['street_address', 'city', 'state']
                        }
                    },
                    properties: {
                        testAllOfRef: {
                            allOf: [
                                {
                                    $ref: '#/definitions/address'
                                },
                                {
                                    properties: {
                                        type: {
                                            type: 'string',
                                            title: 'Residence Type',
                                            enum: ['residential', 'business']
                                        }
                                    }
                                }
                            ],
                        }
                    }
                },
                uiSchema: {
                    testAllOfRef: {
                        type: {
                            'ui:widget': 'RadioWidget'
                        }
                    }
                },
                errorSchema: {
                    testAllOfRef: {
                        street_address: {
                            'err:required': 'Please enter street address...'
                        }
                    }}
            }
        }
   }
</script>
```
:::

## anyOf

### Description
* Valid for any one `schema`, recommended to use `anyOf` when both `oneOf` and `anyOf` are applicable
* Official documentation - [JSON Schema anyOf](https://json-schema.org/understanding-json-schema/reference/combining.html#anyof)
* Uses `oneOfSelect` `anyOfSelect` to configure dropdown option components
* By default, object and array rendered inside anyOf do not show `title` and `description`. If needed, use `ui:showTitle: true`, `ui:description: true` configuration to display

### Data Validation
* Refer to the use cases below

>* [Demo](https://form.lljj.me/#/demo?type=AnyOf%28联动%29)
>* [Data Linkage](/en/guide/data-linkage.html)

### anyOfSelect, oneOfSelect
`anyOfSelect`, `oneOfSelect` are used to configure the dropdown option component for anyOf or oneOf.

The dropdown option name will use the title field from the corresponding anyOf option, but if you set `ui:enumOptions`, that option will be used directly.

As follows:

```js
const schema = {
    anyOfSelect: {
        'ui:widget': 'RadioWidget',
        'ui:title': 'Select Option',
        'ui:options': {},
        'ui:enumOptions': [{
            label: 'Option One',
            value: 0
        }, {
            label: 'Option Two',
            value: 1
        }]
    }
}
```

### anyOf Data Backfill
When editing a page, the current anyOf option validates each anyOf option based on the current formData, and returns a match if validation succeeds.

**If using the same data structure, to ensure correct matching, you can use the `const` keyword to mark the value of each option to ensure correct matching of the current result**

As follows:
```js
const schema = {
    type: 'object',
    title: 'Option',
    required: [],
    anyOfSelect: {
        'ui:title': 'Render Component'
    },
    anyOf: [{
        title: 'el-switch',
        type: 'object',
        properties: {
            schemaOptions: {
                type: 'object',
                properties: {
                    'ui:widget': {
                        title: 'Component Used',
                        type: 'string',
                        default: 'el-switch',
                        const: 'el-switch',
                        'ui:hidden': true
                    },
                    other: {
                        title: 'Other',
                        type: 'string'
                    }
                }
            }
        }
    }, {
        title: 'el-checkbox component',
        type: 'object',
        properties: {
            schemaOptions: {
                type: 'object',
                properties: {
                    'ui:widget': {
                        title: 'Component Used',
                        type: 'string',
                        default: 'el-checkbox',
                        const: 'el-checkbox',
                        'ui:hidden': true
                    },
                    other: {
                        title: 'Other',
                        type: 'string'
                    }
                }
            }
        }
    }]
}
```

### Special Fields

#### const
* If `const` is included in `anyOf`, it will be rendered as a radio button by default, with `const` as the radio button value and `title` as the radio button label.

Demonstration below: `schema`, `ui-schema`, `error-schema` related configurations

:::demo 1. Use anyOfSelect to configure dropdown option component <br> 2. Configuration at the same level as anyOf will be passed as common configuration to the currently selected child schema
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-schema="errorSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
            <p><el-button @click="formRefFn().validate()" type="primary">校验数据</el-button></p>
        </div>
    </vue-form>
</template>
<script>
   export default {
        data() {
            return {
                formData: {},
                schema: {
                    title: 'Demo: anyOf',
                    type: 'object',
                    properties: {
                        constVal: {
                            title: 'AnyOf const',
                            type: 'string',
                            anyOf: [
                                {
                                    title: 'schema option1',
                                    const: '111'
                                },
                                {
                                    const: '222'
                                }
                            ]
                        },
                        number: {
                            title: 'Basic type anyOf',
                            anyOf: [
                                {
                                    title: 'Number is a multiple of 5',
                                    type: 'integer',
                                    multipleOf: 5
                                },
                                {
                                    title: 'Number is a multiple of 3',
                                    type: 'integer',
                                    multipleOf: 3
                                }
                            ]
                        },
                        userInfo: {
                            title: 'Personal Profile Setting Method',
                            anyOf: [
                                {
                                    title: 'Set by username',
                                    required: ['firstName'],
                                    properties: {
                                        firstName: {
                                            type: 'string',
                                            title: 'First Name',
                                            default: 'Jun'
                                        },
                                        lastName: {
                                            type: 'string',
                                            title: 'Last Name',
                                            default: 'Liu'
                                        }
                                    }
                                },
                                {
                                    title: 'Set by user ID',
                                    properties: {
                                        idCode: {
                                            type: 'string',
                                            title: 'ID',
                                            default: '10086'
                                        }
                                    }
                                }
                            ]
                        },
                    }
                },
                uiSchema: {
                    constVal: {
                        'ui:widget': 'RadioWidget',
                        anyOf: [
                            {},
                            {
                                'ui:title': 'ui-option2'
                            }
                        ]
                    },
                    number: {
                        anyOfSelect: {
                            'ui:widget': 'RadioWidget'
                        },
                        // Configuration at the same level as anyOf will be passed as common configuration to the currently selected child schema
                        'ui:widget': 'el-slider',
                        'ui:options': {
                            description: 'Set each anyOf option through common configuration',
                        }
                    },
                    userInfo: {
                        // Use anyOfSelect to configure dropdown option component
                        anyOfSelect: {
                            'ui:title': 'Select user configuration type',
                            // 'ui:widget': 'RadioWidget',
                            'ui:options': {
                                style: {
                                    width: '100%'
                                }
                            }
                        },
                        anyOf: [
                            {
                                firstName: {
                                    'ui:title': 'ui-schema - title First Name'
                                }
                            },
                            {
                                idCode: {
                                    'ui:title': 'ui-schema - title ID'
                                }
                            }
                        ]
                    }
                },
                errorSchema: {
                    userInfo: {
                        anyOf: [
                            {
                                firstName: {
                                    'err:required': 'Please enter firstName'
                                }
                            }
                        ]
                    }
                }
            }
        }
   }
</script>
```
:::

::: tip
* `anyOf` `oneOf` use `oneOfSelect` `anyOfSelect` to configure dropdown options. Configuring the same key name in `schema` will cause `error-schema` and `ui-schema` to not work properly
* The currently selected `schema` of `anyOf` will do a shallow merge with the original `schema`, `Object.assign({}, this.schema, curSelectSchema)`
* Configuration at the same level as `anyOf` in `ui-schema` and `error-schema` will be passed as common configuration to the currently selected child `schema`
:::

## oneOf
### Description
* Must be valid for one and only one `schema`
* Official documentation - [JSON Schema oneOf](https://json-schema.org/understanding-json-schema/reference/combining.html#oneof)

### Data Validation
Usage is the same as `anyof`, [view anyof](#anyof)

## not
### Description
* Invalid for the current `schema`
* Official documentation - [JSON Schema not](https://json-schema.org/understanding-json-schema/reference/combining.html#not)

### Data Validation
>1. Seems not supported...
>1. Probably no application scenario...
>1. Not supported for now...

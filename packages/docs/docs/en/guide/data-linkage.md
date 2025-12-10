---
sidebarDepth: 2
---

# Data Linkage
There are multiple methods to implement data linkage, also supports some UI configuration not based on `JSON Schema` specification, **it is recommended to prioritize using solutions based on JSON Schema specification**.

Following `JSON Schema` specification includes the following methods:
* [JSON Schema anyOf configuration](#anyof-data-linkage)
* [object dependencies linkage](#object-dependencies-data-linkage)
* [Todo: Linkage through if else](#if-else-data-linkage)

Through UI configuration:
* [Configure expressions through ui-schema](#ui-schema-expression-configuration)
* [Custom ui:field using existing cascade components](#ui-field-calling-your-own-cascade-component)
* [ui-schema dynamic styles](#ui-schema-dynamic-styles)

:::warning
When using UI configuration methods, it may break `JSON Schema` specification, so care must be taken to avoid conflicts with the data structure described by `JSON Schema`.
> For example: configured `required`, but ui-schema also configured `ui:hidden: true`, must input but not display ....

If there is a conflict, because the generated form will only validate displayed elements, there won't be a problem. But even if the form passes validation, the data structure no longer conforms, so this must be avoided....
:::

## anyOf Data Linkage
Based on [JSON Schema anyOf](https://json-schema.org/understanding-json-schema/reference/combining.html#anyof) specification, [detailed anyOf configuration can refer here](/en/rules/combining.html#anyof), **suitable for selecting based on type then using different data structures or ui styles**.

For example: Setting personal information can be done through `firstName` + `lastName` or through `userId` in two ways. Demo below: (click `Save` button to view `formData` data), also can view [other anyOf online demo](https://form.lljj.me/#/demo?type=AnyOf%28联动%29)

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-schema="errorSchema"
        @on-submit="handleSubmit"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {
            },
            schema: {
                title: 'Personnel Information',
                type: 'object',
                properties: {
                    price: {
                        type: 'number',
                        title: 'Monthly Salary',
                        default: 99999.99
                    },
                    userInfo: {
                        title: 'Personal Information Setup Method',
                        anyOf: [
                            {
                                title: 'Set via username',
                                required: ['firstName'],
                                properties: {
                                    type: {
                                        'ui:widget': 'HiddenWidget',
                                        title: 'Type',
                                        type: 'string',
                                        default: 'userInfo',
                                        const: 'userInfo'
                                    },
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
                                title: 'Set via user ID',
                                properties: {
                                    type: {
                                        'ui:widget': 'HiddenWidget',
                                        title: 'Type',
                                        type: 'string',
                                        default: 'userId',
                                        const: 'userId'
                                    },
                                    idCode: {
                                        type: 'string',
                                        title: 'ID',
                                        default: '10086'
                                    }
                                }
                            }
                        ]
                    },
                },
                anyOf: [{
                    title: 'Set More Information',
                    properties: {
                        age: {
                            title: 'Age',
                            type: 'number',
                            anyOf: [
                                {
                                    const: 18
                                },
                                {
                                    const: 28
                                }
                            ]
                        },
                        url: {
                            title: 'Personal Homepage',
                            format: 'uri',
                            type: 'string',
                            default: 'https://lljj.me'
                        },
                        projects: {
                            title: 'Project Experience',
                            type: 'array',
                            minItems: 1,
                            items: {
                                type: 'object',
                                anyOf: [
                                    {
                                        title: 'Online Demo Project',
                                        properties: {
                                            url: {
                                                title: 'Enter project URL',
                                                type: 'string',
                                                format: 'uri',
                                                default: 'https://www.demo.com'
                                            }
                                        }
                                    },
                                    {
                                        title: 'Text Description Project',
                                        required: ['name'],
                                        properties: {
                                            name: {
                                                type: 'string',
                                                title: 'Project Name',
                                                default: 'Vjsf'
                                            },
                                            description: {
                                                type: 'string',
                                                title: 'Project Description',
                                                default: 'Quickly generate form based on JSON Schema'
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }, {
                    title: 'Don\'t Set',
                    properties: {}
                }]
            },
            uiSchema: {
                userInfo: {
                    anyOfSelect: {
                       'ui:widget': 'RadioWidget'
                    },
                    anyOf: [
                        {
                            'ui:title': 'Set using username (ui-schema)', // This will override schema config
                        },
                    ]
                },
                anyOfSelect: {
                    'ui:title': 'Need more information?',
                }
            },
            errorSchema: {
            }
        }
    },
    methods: {
        handleSubmit(formData) {
            this.$showJson({
                componentProps: {
                    jsonString: formData
                }
            });
        }
    }
}
</script>
```
:::

>* Recommend using `anyOf`, `oneOf` can only have one matching result

## object dependencies Data Linkage

Based on [JSON Schema Object dependencies](https://json-schema.org/understanding-json-schema/reference/object.html#property-dependencies) specification, **suitable for linkage settings based on whether value is empty (undefined)**, *currently only supports property dependencies*.

Supports `ui-schema` configuration `onlyShowIfDependent: true` to hide items that haven't triggered dependencies

For example: If filled `credit card number`, must fill `billing address`. Demo below, also can view [Object-property-dependencies online demo](https://form.lljj.me/#/demo?type=Object-property-dependencies%28联动%29)

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        @on-submit="$showJson({
             componentProps: {
                 jsonString: formData
             }
         })"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {},
            schema: {
                title: 'Object property dependencies',
                type: 'object',
                properties: {
                    unidirectional: {
                        title: 'Unidirectional Dependency',
                        description: 'Most basic property unidirectional dependency, ui-schema config onlyShowIfDependent only shows when depended upon',
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
                        title: 'Bidirectional Dependency',
                        description: 'Explicitly define bidirectional dependency, if configuring onlyShowIfDependent will cause nothing to render when initialized without value, users need to consider this themselves',
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
            },
        }
    }
}
</script>
```
:::

## if else Data Linkage
> *Not yet supported*

Based on [JSON Schema if then else](https://json-schema.org/understanding-json-schema/reference/conditionals.html), **suitable for linkage when value equals a constant**, *current version does not support this feature*.

Currently if else is relatively easy to solve data linkage scenarios, can judge based on value, but still cannot solve logical judgments on values, such as `greater than`, `less than`. Future versions will consider supporting this feature.

## ui-schema Expression Configuration
May break `JSON Schema` specification, configuration idea comes from [ali form-render](https://github.com/alibaba/form-render), through configuring expressions on ui-schema `ui:hidden`.

**ui:hidden actually not only supports expressions, detailed includes the following three formats:**

### ui:hidden mustache Expression
mustache expression can use `parentFormData`, `rootFormData` two built-in variables.

* `parentFormData` Parent level FormData value of current node
* `rootFormData` Root node FormData value

> Configured expressions will return results through `new Function`, so actually you can also access global variables in expressions.

Such configurations are all possible:
```js
uiSchema = {
    user: {
        'ui:hidden': `{{ parentFormData.attr !== 'league' && rootFormData.case1.showMore === false }}`,
    }
}
```

For example: Need to make logical judgments based on a value to show/hide, also can view [uiSchema ui:hidden(linkage) online demo](https://form.lljj.me/#/demo?type=uiSchema-ui-hidden%28联动%29)
::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        @on-submit="$showJson({
             componentProps: {
                 jsonString: formData
             }
         })"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {
                case3: {
                  ruleList: [
                      {
                          attr: 'league',
                          relation: '>',
                          league: 'b'
                      }
                  ]
                }
            },
            schema: {
                title: 'Using ui-schema to configure ui:hidden expressions',
                type: 'object',
                properties: {
                    case1: {
                        title: 'Overall Hide',
                        type: 'object',
                        properties: {
                            showMore: {
                                title: 'Show More',
                                type: 'boolean',
                                default: false
                            },
                            x1: {
                                title: 'Input Box 1',
                                type: 'string',
                                'ui:hidden': '{{rootFormData.case1.showMore === false}}'
                            },
                            x2: {
                                title: 'Input Box 2',
                                type: 'string',
                                'ui:hidden': '{{rootFormData.case1.showMore === false}}'
                            }
                        }
                    },
                    case3: {
                        title: 'List/Show Different Components',
                        type: 'object',
                        properties: {
                            ruleList: {
                                title: 'Player Filtering',
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        attr: {
                                            title: 'Standard',
                                            type: 'string',
                                            enum: [
                                                'goal',
                                                'league'
                                            ],
                                            enumNames: [
                                                'Goals Scored',
                                                'League'
                                            ],
                                            'ui:width': '40%'
                                        },
                                        relation: {
                                            title: '-',
                                            type: 'string',
                                            enum: [
                                                '>',
                                                '<',
                                                '='
                                            ],
                                            'ui:hidden': "{{parentFormData.attr === 'league'}}",
                                            'ui:width': '20%'
                                        },
                                        goal: {
                                            title: 'Goals Scored',
                                            type: 'string',
                                            pattern: '^[0-9]+$',
                                            message: {
                                                pattern: 'Enter correct score'
                                            },
                                            'ui:hidden': "{{parentFormData.attr !== 'goal'}}",
                                            'ui:width': '40%'
                                        },
                                        league: {
                                            title: 'Name',
                                            type: 'string',
                                            enum: [
                                                'a',
                                                'b',
                                                'c'
                                            ],
                                            enumNames: [
                                                'La Liga',
                                                'Premier League',
                                                'Chinese Super League'
                                            ],
                                            'ui:hidden': "{{parentFormData.attr !== 'league'}}",
                                            'ui:width': '40%'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</script>
```
:::

### ui:hidden function
function is similar to expression, just function will be more flexible, function receives `parentFormData`, `rootFormData` two parameters.

* `parentFormData` Parent level FormData value of current node
* `rootFormData` Root node FormData value

Configuration as follows:
```js
uiSchema = {
    user: {
        'ui:hidden': (parentFormData, rootFormData) => {
            return ...;
        },
    }
}
```


### ui:hidden Plain Types
* Plain types, such as `true` `false` will all be converted to `Boolean` type

## ui:field Calling Your Own Cascade Component
May break `JSON Schema` specification, **suitable for rendering complex linkage scenarios by configuring an existing custom component**

For example: [ui:field using existing province-city-district cascade component](/en/guide/adv-config.html#demo-联级选择)

## ui-schema Dynamic Styles
May break `JSON Schema` specification. `ui-schema` and `formData` themselves are reactive data, so you can completely return ui-schema through computed properties, configuring `ui:widget:HiddenWidget`, `ui:field: null`, `ui:fieldStyle` etc. can all implement style linkage.

This method can be said to be currently the last resort, will cause `ui-schema` configuration to have a lot of conditional judgments.

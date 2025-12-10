---
sidebarDepth: 2
---

# Advanced Configuration

## Hiding Form Elements
Form elements can be hidden using two methods: `ui:widget` and `ui:hidden`.

For example, see: [hidden form field online demo](https://form.lljj.me/#/demo?type=hidden%28%E9%9A%90%E8%97%8F%E8%A1%A8%E5%8D%95%E9%A1%B9%29)

```js
uiSchema = {
    hidden: {
        // Both methods work
        'ui:widget': 'HiddenWidget',
        'ui:hidden': true,
    }
};
```


## Tree Structure
* Tree structures need to use `$ref` to recursively call themselves
* For detailed `$ref` configuration, please [click to view](https://json-schema.org/understanding-json-schema/structuring.html?highlight=definitions#reuse)

:::warning
* $ref does not support cross-file calls
:::

Demo as follows:

:::demo Infinite recursive call
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
        </div>
    </vue-form>
</template>
<script>
   export default {
        data() {
            return {
                schema: {
                    title: 'Refer and Recursive Refer Call',
                    definitions: {
                        node: {
                            type: 'object',
                            properties: {
                                name: { title: 'Enter current node name', type: 'string' },
                                children: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/definitions/node',
                                    },
                                },
                            },
                        },
                    },
                    type: 'object',
                    properties: {
                        tree: {
                            $ref: '#/definitions/node',
                        },
                    },
                },
                uiSchema: {
                    tree: {
                        name: {
                            'ui:description': 'ui-schema configuration description, recursion not supported'
                        }
                    }

                },
                formData: {
                    tree: {
                        name: 'root',
                        children: [{ name: 'leaf' }],
                    }
                }
            }
        }
   }
</script>
```
:::

## Empty Data Default Value
By default, when users clear form data (i.e., empty string `''`), the value is set to `undefined` to maintain consistency with the JSON Schema specification.

You can reset the empty data default value by configuring `ui:emptyValue` in `ui-schema`.

For example: Try clearing the `firstName` and `lastName` input boxes

>* Tip: `JSON.stringify` will discard `undefined` values when converting to string, so in the demo below, `firstName` will not be present when cleared

:::demo Difference between setting and not setting ui:emptyValue
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
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
                    title: 'ui:emptyValue Set Default Empty Value',
                    type: 'object',
                    required: ['firstName', 'lastName'],
                    properties: {
                        firstName: {
                            title: 'First Name',
                            type: 'string',
                            default: 'Jun'
                        },
                        lastName: {
                            title: 'Last Name',
                            type: 'string',
                            default: 'Liu'
                        }
                    },
                },
                uiSchema: {
                    lastName: {
                        'ui:emptyValue': ''
                    }
                }
            }
        }
   }
</script>
```
:::

* Related
1. [JSON Schema object required](/en/guide/faq.html#json-schema-object-required)
1. [ui-schema configuration](/en/guide/basic-config.html#ui-schema)


## Custom Styles

### Reset Form Default Styles
For the entire form's default styles, inspect the element to view the class name and override it with CSS. The root CSS class name is `genFromComponent`

### Reset Form Widget Component Styles
To set styles for widget components, you can configure `style`, `class`, `attrs` through `ui-schema`

View details: [Reset form widget styles with ui-schema](/en/guide/basic-config.html#ui-schema配置演示-重置表单widget样式)

### Reset Form Field Component Styles
To set styles for field components, you can configure `fieldStyle`, `fieldClass`, `fieldAttrs` for each node through `ui-schema`

> Usage format is the same as above...

### Reset Styles via Node Class Names
When rendering the form, a unique `path` is generated for each `field` render node based on the schema data structure and marked in the class attribute. You can use this class selector to reset specific local styles.

For example:
![class pathName](/pathName.png)

::: tip
All path-marked CSS class names are prefixed with `__path`. Note that `anyOf` and `oneOf` with the same path may be rendered in multiple places, which may result in duplicate path classNames
:::

## Custom Widget
Custom widgets are configured through the `ui:widget` field

**Custom widget components implement `v-model` to synchronize values to formData. `ui:xxx` configurations are passed to the custom widget as `props`**

::: tip  Quick Understanding
* Simple understanding: A Widget component is the smallest unit of your input component, such as `input` or `checkbox`, and is not coupled with current form data, so it won't access any form data internally. Of course, you can pass it through ui:xx
* Usage: Just needs to be a valid Vue renderable component configuration
* props: `value` / `modelValue`
* How to update value: Use v-model. Just implement v-model in the component. Vue2 prop `value`, Vue3 prop `modelValue`
* Other notes: Configurations in `ui:xxx` are also passed to custom widget components just like built-in components
* See documentation: [vue2 v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)
   [vue3 v-model](https://v3.cn.vuejs.org/guide/migration/v-model.html)
:::

* Type: `String` | `Object` | `Function`  (see [$createElement](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0) first parameter)
* Use case: Need custom input components, such as business-related `image upload` or `product selection`, etc.

::: warning
* Custom `Widget` components must accept a two-way binding `v-model` value
* Version `0.3` and above supports configuring `ui:widget` in `type: array`, for example: [Configure multiple file upload](https://form.lljj.me/#/demo?type=Upload)
* Not supported for direct configuration in `type: object`
:::

:::demo As shown below with componentOptions, in actual scenarios this could be `import componentOptions from './widget-components/XXX.vue'`
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
    </vue-form>
</template>
<script>
    // In actual scenarios, this could be import componentOptions from './widget-components/XXX.vue'
    // Here for demo convenience, using render function directly
    const componentOptions = {
        name: 'TestAsyncWidget',
        props: {
            value: {
                type: null,
                default: ''
            }
        },
        render(h) {
            return h('div', {style: { padding: '4px', boxShadow: '0 0  4px 1px rgba(0,0,0,0.1)' }}, [
                h('button', {
                    attrs: {type: 'button'},
                    style: {marginRight: '6px'},
                    on: {
                        click: () => {
                            this.$emit('input', String(new Date()))
                        }
                    }
                }, 'Click to update time'),
                h('span', this.value),
            ]);
        }
    }

   export default {
        data() {
            return {
                formData: {},
                schema: {
                    title: 'Custom Widget (view code to see demo)',
                    type: 'object',
                    required: ['inputText', 'numberEnumRadio'],
                    properties: {
                        inputText: {
                            title: 'Can configure global component name, or async component function, or sync component options, etc.',
                            type: 'string',
                            default: String(new Date())
                        },
                        numberEnumRadio: {
                            type: 'number',
                            title: 'Via component name (reset to Radio rendering)',
                            enum: [1, 2, 3],
                            enumNames: ['Radio - 1', 'Radio - 2', 'Radio - 3']
                        }
                    }
                },
                uiSchema: {
                    numberEnumRadio: {
                        'ui:widget': 'RadioWidget'
                    },
                    inputText: {
                        // Configure component constructor or directly configure global component name, such as 'el-input'
                        'ui:widget': componentOptions,
                    }
                }
            }
        }
   }
</script>
```
:::


## Custom Field
Custom fields are configured through the `ui-schema` `ui:field` field, which can be configured at any schema node that needs a custom field. The parameter format is the same as [Custom Widget](#custom-widget)

**Field components synchronize values to formData through vueUtils.getPathVal and vueUtils.setPathVal**

::: tip  Quick Understanding
* Simple understanding: A Field component is the parent of Widget components, determining Widget component selection and data validation, usually containing a formItem component
* Usage: Just needs to be a valid Vue renderable component configuration
* props: All internal rendering props can be obtained, see `Field component props` below
* How to update value: Need to use vueUtils.getPathVal and vueUtils.setPathVal to get or update current value, [see demo](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/docs/docs/.vuepress/injectVue/field/DistpickerField.vue)
* Other notes: [ui:fieldProps](/en/guide/basic-config.html#ui-schema) can pass prop fieldProps to your custom field component, you need to declare props yourself
* See other demos below
:::

* Type: `String` | `Object` | `Function` (see [$createElement](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0) first parameter)
* Use case: When schema configuration cannot meet requirements, or when you want to embed existing components

::: warning
* Use vueUtils.getPathVal and vueUtils.setPathVal to get or update current value, [see demo](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/docs/docs/.vuepress/injectVue/field/DistpickerField.vue)
* Custom Field directly takes over the rendering of subsequent nodes, meaning the rendering logic after custom nodes can be handled according to the user's scenario needs. Field components generally contain `FormItem`, `validation rules`, and `input components`
:::

Field component `props`:

:::demo showCode: Props (click dropdown to expand)
 ```js
{
    // Current node schema
    schema: {
         type: Object,
         default: () => ({})
     },

    // Current node Ui Schema
     uiSchema: {
         type: Object,
         default: () => ({})
     },

     // Current node Error Schema
     errorSchema: {
         type: Object,
         default: () => ({})
     },

     // Custom validation rules
     customFormats: {
         type: Object,
         default: () => ({})
     },

     // Root node Schema
     rootSchema: {
         type: Object,
         default: () => ({})
     },

     // Root node data
     rootFormData: {
         type: null,
         default: () => ({})
     },

     // Current node path
     curNodePath: {
         type: String,
         default: ''
     },

     // Whether required
     required: {
         type: Boolean,
         default: false
     }
}
```
:::

You can directly import the props configuration from `@lljj/vue-json-schema-form`, which already includes the above parameters
```js
import { fieldProps } from  '@lljj/vue-json-schema-form';
```

### Demo - Image Link Configuration

* In the Demo, the `ui:field` component continues to use schema configuration for `view display` and `data validation`, and uses built-in methods to synchronize `formData` values
* [View field component source code](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/docs/docs/.vuepress/injectVue/field/LinkImgField.vue)

>* Image selection here is just random selection. In actual project scenarios, it might be based on gallery selection or upload, etc.
>* The following Demo omits the code for importing and registering components

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
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
                    id: 'MultipleImgLink',
                        type: 'object',
                        definitions: {
                            ImgItem: {
                                type: 'object',
                                properties: {
                                    imgUrl: {
                                        title: 'Image File URL',
                                        type: 'string',
                                        format: 'uri'
                                    },
                                    imgLink: {
                                        title: 'Image Link URL',
                                        type: 'string',
                                        format: 'uri'
                                    }
                                },
                                required: [
                                    'imgUrl',
                                    'imgLink'
                                ]
                            }
                        },
                        properties: {
                            imgItem1: {
                                $ref: '#/definitions/ImgItem'
                            },
                            imgItem2: {
                                $ref: '#/definitions/ImgItem'
                            }
                        }
                },
                uiSchema: {
                    imgItem1: {
                        'ui:title': 'Image 1 (configured ui:field)',

                        // LinkImgField source code https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/docs/docs/.vuepress/injectVue/field/LinkImgField.vue
                        'ui:field': 'LinkImgField'
                    },
                    imgItem2: {
                        'ui:title': 'Image 2 (without ui:field)',
                    }
                }
            }
        }
   }
</script>
:::

### Demo - Cascade Selection

* In the Demo, `ui:field` uses existing province-city-district cascade component, without using schema configuration and methods
* [View field component source code](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/docs/docs/.vuepress/injectVue/field/DistpickerField.vue)

>* Uses province-city-district linkage component
>* Configured `ui:fieldProps` to pass parameters to component placeholders parameter
>* The following Demo omits the code for importing and registering components

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
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
                    id: 'DistpickerTest',
                    title: 'Address Entry',
                    type: 'object',
                    definitions: {
                        item: {
                            title: 'Name/Code',
                            type: 'string'
                        },
                        address: {
                            default: {
                                province: 440000,
                                city: "Guangzhou",
                                area: "Haizhu District"
                            },
                            type: 'object',
                            properties: {
                                province: {
                                    title: 'Province',
                                    $ref: '#/definitions/item'
                                },
                                city: {
                                    title: 'City',
                                    $ref: '#/definitions/item'
                                },
                                area: {
                                    title: 'District',
                                    $ref: '#/definitions/item'
                                }
                            }
                        }
                    },
                    required: ['name'],
                    properties: {
                        name: {
                            title: 'Recipient',
                            type: 'string',
                            default: 'HH'
                        },
                        address1: {
                            $ref: '#/definitions/address'
                        },
                        address3: {
                            $ref: '#/definitions/address'
                        }
                    }
                },
                uiSchema: {
                    name: {
                        'ui:options': {
                            placeholder: 'Please enter recipient'
                        },
                        'err:options': {
                            required: 'Please enter recipient'
                        }
                    },
                    address1: {
                        'ui:field': 'DistpickerField',
                        'ui:fieldProps': {
                            placeholders: {
                                  province: '------- Province --------',
                                  city: '--- City ---',
                                  area: '--- District ---',
                              }
                        },
                    },
                    address3: {
                        'ui:title': 'Without ui:field',
                    }
                }
            }
        }
   }
</script>
:::

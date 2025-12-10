---
sidebarDepth: 2
---

# Configuration (API)

## Parameters Props

### schema
* required: `true`
* Type: `object`
* Default: `undefined`

JSON Schema used to describe form data,
follows the [JSON Schema](https://json-schema.org/understanding-json-schema/index.html) specification

```
title: 'Rendered as title',
description: 'Rendered as description' // Supports HTML code
```

Here, if the `title` `description` inside `object` or `array` will be rendered as the title and description of the wrapper container `FieldGroupWrap`.

The internal `title` `description` will be rendered by the `widget` component as the title and description of `formItem`

:::tip How to hide
* If `title` `description` attributes are not configured, they will not be displayed
* Special case: For `object` `array` types, you can control whether to display through the ['ui:showTitle': false](#ui-schema) parameter
:::


**Example: Configure user info form**
::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
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
                title: 'UserInfo 表单',
                description: 'A simple form example.',
                type: 'object',
                required: [
                    'firstName',
                    'lastName'
                ],
                properties: {
                    firstName: {
                        type: 'string',
                        title: 'First name',
                        default: 'Jun'
                    },
                    lastName: {
                        type: 'string',
                        title: 'Last name'
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
                        minLength: 3
                    },
                    telephone: {
                        type: 'string',
                        title: 'Telephone',
                        minLength: 10
                    }
                }
            }
        };
    }
};
</script>
```
:::

### ui-schema
* Type: `object`
* Default: `{}`
* `Not required`: ui can also be configured directly in `schema`

>* Version `0.0.16` and above supports configuring `ui-schema` in the `schema` parameter [Click to view](#ui-schema配置在schema中)
>* Version `0.1.0` and above supports configuring [error-schema](#error-schema) in [ui-schema](#ui-schema). (`ui-schema` and `error-schema` have the exact same format and both belong to ui display, convenient for one configuration)

Used to configure form display style, plain JSON data, not `JSON Schema` specification

#### fui:xxx function configuration
* After version `1.9.0`, all ui configurations support function-based configuration through `fui:xxx`, which can accept three parameters: `parentFormData`, `rootFormData`, and `prop`.
```js
// For example, configure a dynamic placeholder attribute
'fui:placeholder': (parent, root, prop) => {
    console.log(parent, root, prop);
    return parent.txtColor;
}
```


#### ui-schema expressions
* After version `0.2`, all `ui:xxx` form configurations support expressions (expressions are not supported within ui:options for distinction)
mustache expressions can use two built-in variables: `parentFormData` and `rootFormData`.
* `parentFormData` The FormData value of the current node's parent
* `rootFormData` The FormData value of the root node

> Expression configuration will return the result through `new Function`, so you can actually access global variables in the expression.

For example: (Refer here: [uiSchema using expressions](https://form.lljj.me/#/demo?type=uiSchema%28表达式%29))
```
'ui:title': `{{ parentFormData.age > 18 ? 'Hehe' : 'Haha' }}`
```

:::tip
* The configuration data structure is consistent with `schema`, all ui configuration properties start with `ui:`
* You can also configure all properties within `ui:options` without the `ui:` prefix
* If both `ui:xx` and the `xx` property in `ui:options` are configured, the priority of properties in `ui:options` is higher. In fact, you can configure all parameters within `ui:options`; Here you can follow personal habits, the following parameter format is recommended
> Note: ui-schema is plain JSON data, not JSON Schema specification syntax
:::

:::warning Note
* `ui:hidden` `ui:widget` `ui:field` `ui:fieldProps` do not support configuration in `ui:options`
:::


General parameter format is as follows:
```js
uiSchema = {
     // Override schema title
    'ui:title': 'Override schema title',

    // Override schema description
    'ui:description': 'Override schema description',

    // Configure function through fui:xxx to calculate current ui options
    'fui:placeholder': (parent, root, prop) => {
        console.log(parent, root, prop);
        return parent.txtColor;
    },

    // Configure whether required for individual field, higher priority than schema configuration'
    // bool type, 'ui:required': true,
    // Default undefined
    'ui:required': true,

    // Callback for array item operations
    // Default undefined
    // command enum values: moveUp | moveDown | remove | add | batchPush | setNewTarget
    'ui:afterArrayOperate': (formData, command, payload) => {
        debugger;
    },

    // Value when form element input is empty, default undefined
    'ui:emptyValue': undefined,

     // Whether to hide current node, supports expression configuration, (not supported in options configuration)
    // https://vue-json-schema-form.lljj.me/en/guide/data-linkage.html#ui-schema%E9%85%8D%E7%BD%AE%E8%A1%A8%E8%BE%BE%E5%BC%8F
    'ui:hidden': false,

     // Custom field (not supported in options configuration)
    // https://vue-json-schema-form.lljj.me/en/guide/adv-config.html#%E8%87%AA%E5%AE%9A%E4%B9%89field
    'ui:field': 'componentName',

    // Additional props passed to custom field, received through props: { fieldProps }, (not supported in options configuration)
    'ui:fieldProps': undefined,

    // Custom widget component, (not supported in options configuration)
    // https://vue-json-schema-form.lljj.me/en/guide/adv-config.html#%E8%87%AA%E5%AE%9A%E4%B9%89widget
    'ui:widget': 'el-slider',

    // labelWidth passed to formItem component, higher priority (antdv formItem doesn't have this parameter, can use fieldAttrs to configure labelCol to control label width)
    // Can also configure labelWidth in fieldAttrs': '50px'
    'ui:labelWidth': '50px',

    'ui:options': {
            // scoped slots implemented using render function
            // Configure renderScopedSlots to return an object with key as slotName, function body returns vnode
            // render function reference: https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
            renderScopedSlots(h) {
                return {
                    append: (props) => h('span', '.com')
                };
            },

            // slots，需要使用render函数来实现
            // 配置 renderChildren ，返回 Vnode[] 其中slot即为slotName
            // render 函数参考：https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
            renderChildren(h) {
                return [
                    h('span', {
                        slot: 'suffix',
                    }, '后缀')
                ];
            },

            // 获取widget组件实例，非必要场景不建议使用
            // widget组件 mounted 组件后回调该方法传出vm实例
            // 支持版本: "0.4.1"
            getWidget: (widgetVm) => {
                console.log(widgetVm);
            },

            // onChange
            // 支持版本 1.3
            /**
             *
             * @param curVal 当前值
             * @param preVal 上一次的值
             * @param parentFormData 当前父节点的值，响应式的值可在这里设置其它需要联动的值
             * @param rootFormData 当前父节点的值，响应式的值可在这里设置其它需要联动的值
             */
            onChange({ curVal, preVal, parentFormData, rootFormData }) {
                console.log('change:', curVal, preVal, parentFormData, rootFormData);
            },

            // 显示标题？只对 type为`object`、`array` 类型有效
            showTitle: true,

             // 显示描述？ 只对type为 `object`、`array` 类型有效
            showDescription: false,

            // 默认不配置，0.2 版本新增，用于在多列布局时快速配置列宽度，当然你也可以使用fieldStyle配置样式实现
            width: '100px',

            attrs: {
                // 通过 vue render函数 attrs 传递给 Widget 组件，只能配置在叶子节点
                // 你也配置在外层，程序会合并 attrs 和 其它外层属性 通过 attrs 传递给子组件
                // 配置在这里的参数都会传给widget组件，当widget组件props和uiSchema通用参数冲突时可以使用attr配置
                autofocus: true,
                width: '99px', // 这里直接传给widget组件，而非外层的width配置
            },
            style: {
                // 通过 vue render函数 style 传递给 Widget 组件，只能配置在叶子节点
                boxShadow: '0 0 6px 2px #2b9939'
            },
            class: {
                // 0.1.0 版本添加
                // 通过 vue render函数 class 传递给 Widget 组件，只能配置在叶子节点
                className_hei: true
            },
            fieldStyle: {
                // 0.1.0 版本添加
                // 通过 vue render函数 style 传递给 Field 组件，支持所有field节点
                background: 'red'
            },
            fieldClass: {
                // 0.1.0 版本添加
                // 通过 vue render函数 class 传递给 Field 组件，支持所有field节点
                fieldClass: true
            },
            fieldAttrs: {
                // 通过 vue render函数 attrs 传递给 Field 组件，支持所有节点
                'attr-x': 'xxx'
            },

            // 其它所有参数会合并到 attrs 传递给 Widget 组件
            type: 'textarea',
            placeholder: '请输入你的内容'
    }
}
```

>1. `ui:field` 自定义field组件参见这里  [自定义 field](/en/guide/adv-config.html#自定义field)
>1. `ui:widget` 自定义widget组件参见这里  [自定义 widget](/en/guide/adv-config.html#自定义widget)
>1. `ui:widget` 配置 `HiddenWidget` 或者 `hidden` 既可隐藏当前元素
>1. `ui:hidden` 支持配置表达式，详细参见这里 [ui-schema ui:hidden配置表达式](/en/guide/data-linkage.html#ui-schema配置表达式)

### ui-schema - events
可以通过uiSchema widgetListeners 配置组件 emit events

:::warning
* 注意该配置只适合 `vue2`
* `vue3` 的版本可以直接传递 `ui:onXxx` 即可，参见：[vue3 listeners](https://v3.cn.vuejs.org/guide/migration/listeners-removed.html#%E6%A6%82%E8%A7%88)
:::

> 如下：通过配置 ui widgetListener配置widget组件内的events

```js
{
    'ui:options': {
        widgetListeners: {
            input(event) {
                console.log('ui input', event);
            }
        }
    }
}
```



### ui-schema - slots
可以通过uiSchema配置render函数传递slot到你的Widget组件，使用方式如下：

> 注意这里vue2版本需要区分slots，和scopeSlots的区别，配置如下
>
> [render函数参考官方文档](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)

* slots - `renderChildren` (仅vue2)

> 注意：vue3 版本所有slots 统一通过 `renderScopedSlots` 形式传递。

```js
{
    'ui:options': {
        // slots，需要使用render函数来实现
        // 配置 renderChildren ，返回 Vnode[] 其中slot即为slotName
        // render 函数参考：https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
        renderChildren(h) {
            return [
                h('span', {
                    slot: 'suffix',
                }, '后缀')
            ];
        }
    }
}
```

* scopedSlots - `renderScopedSlots` （vue3、vue2）
> vue3版本 h 为全局api，`import { h } from 'vue'`
>
> 同时，vue3 版本配置 `renderScopedSlots` 可以为纯对象、vue3不区分scoped slots

```js
{
    'ui:options': {
        // vue2
        // scoped slots 使用render函数来实现
        // 配置 renderScopedSlots 返回对象key为slotName，函数体返回vnode
        // render 函数参考：https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
        renderScopedSlots(h){
            return {
                append: (props) => h('span', '.com')
            };
        }
    },

    'ui:options': {
        // vue3
        // slots 使用render函数来实现
        // vue3 renderScopedSlots 可以为function、或者如下纯对象的形式
        // vue3 render 函数参考：https://v3.cn.vuejs.org/guide/render-function.html#%E6%8F%92%E6%A7%BD
        renderScopedSlots: {
            default: (props) =>h('span', props.text)
        }
    }
}
```

#### ui-schema配置在schema中

`0.0.16` 之后版本，`ui-schema` 所有配置都支持直接配置在 `schema` 参数中

* `ui-schema` 单独配置优先级大于 `schema` 中配置
* 好处可以一份配置，不过会使 `schema` 不再是一份纯粹的 `JSON Schema` 文件，结合实际场景选择方案。

如下格式：
```json
{
    "title": "Demo",
    "type": "object",
    "ui:order": [
        "bio",
        "firstName"
    ],
    "properties": {
        "firstName": {
            "type": "string",
            "title": "First name",
            "ui:placeholder": "请输入FirstName（配置在schema中）"
        },
        "bio": {
            "type": "string",
            "title": "Bio",
            "minLength": 10,
            "ui:options": {
                "type": "textarea",
                "placeholder": "请输入FirstName（配置在schema中）",
                "rows": 4
            }
        }
    }
}
```

#### ui-schema配置演示：重置表单widget样式
::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :ui-schema="uiSchema"
        :schema="schema"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {
                number: 1,
                numberEnumRadio: 2,
                integerRange: 50,
            },
            schema: {
                type: 'object',
                properties: {
                    firstName: {
                        type: 'string',
                        title: 'First name',
                        'ui:placeholder': 'Please enter FirstName (configured in schema)'
                    },
                    bio: {
                        type: 'string',
                        title: 'Bio',
                        minLength: 10,
                        'ui:options': {
                            type: 'textarea',
                            placeholder: 'placeholder (configured in schema)',
                            rows: 4
                        }
                    },
                    inputText: {
                        title: 'Input Text',
                        type: 'string'
                    },
                    number: {
                        title: 'Number (默认渲染组件)',
                        type: 'number'
                    },
                    integerRange: {
                        title: 'Integer range (使用 ElSlider)',
                        type: 'integer',
                        minimum: 42,
                        maximum: 100
                    }
                }
            },
            uiSchema: {
                'ui:order': ['number', '*'],
                inputText: {
                    'ui:description': 'Description info reset here',
                    'ui:emptyValue': '',
                    'ui:options': {
                        style: {
                            boxShadow: '0 0 6px 2px #2b9939'
                        },
                        class: {
                            className_hei: true
                        },
                        type: 'textarea',
                        autofocus: true,
                        rows: 6,
                        placeholder: 'Please enter your content'
                    }
                },
                number: {
                    'ui:title': 'Title reset here'
                },
                integerRange: {
                    'ui:widget': 'el-slider',
                }
            }
        }
    }
};
</script>
```
:::

::: warning Note
Configuration data structure is consistent with `schema`, not `formData`

For example, configuring array elements:
```js

// schema
schema = {
    type: 'object',
    properties: {
        fixedItemsList: {
            type: 'array',
            title: 'A list of fixed items',
            items: [
                {
                    title: 'A string value',
                    type: 'string',
                    maxLength: 2
                }
            ]
        }
    }
}
```

```js
// Correct configuration
uiSchema = {
    fixedItemsList: {
         // Keep same structure as schema here
         items: [
             {
                 'ui:options': {
                    ...
                }
             }
         ]
    }
}
```

```js
// Wrong configuration
uiSchema = {
    fixedItemsList: [
         {
             'ui:options': {
                ...
            }
        }
    ]
}
```

:::

### error-schema
* Type: `object`
* Default value: `{}`
* `Not required`: ui can also be configured directly in `schema`

>* After version `0.0.16` supports configuring `error-schema` in `schema` parameter [Click to view](#error-schema配置在schema中)
>* After version `0.1.0` supports configuring [error-schema](#error-schema) in [ui-schema](#ui-schema). (`ui-schema` and `error-schema` have exactly the same format, and both belong to ui display, convenient to configure in one place)

Used to configure form validation error messages, ordinary json data, not JSON Schema specification

Data configuration is kept the same as `ui-schema`, the difference is:
1. Use `err:` prefix
1. Use the schema error type's `err:${name}` as key, such as `err:format`, `err:required`, `err:type`

::: tip
 * Configuration data structure is consistent with schema. All `error` configuration properties start with `err:`
 * Can also configure all properties inside `err:options`, no need for `err:` prefix
 * If both `err:xx` and `xx` property in `err:options` are configured, `err:options` has higher priority. Actually, you can configure all parameters inside `err:options`; you can follow your personal preference here
 > Note: error-schema is standard json data, not JSON Schema specification syntax
 :::

#### error-schema configured in schema

After version `0.0.16`, all `error-schema` configurations support direct configuration in `schema` parameter.

> Usage format similar to [ui-schema configured in schema](#ui-schema配置在schema中)

error-schema configuration demo: Reset form error messages

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-schema="errorSchema"
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
                type: 'object',
                required: [
                    'userName',
                    'homePage',
                    'bio'
                ],
                properties: {
                    userName: {
                        type: 'string',
                        title: 'Username',
                        default: 'Liu.Jun'
                    },
                    homePage: {
                        type: 'string',
                        format: 'uri',
                        title: 'Personal homepage',
                        'err:required': 'Please enter personal homepage address (configured in schema)',
                        'err:format': 'Please enter correct Url address (configured in schema)'
                    },
                    bio: {
                        type: 'string',
                        title: 'Signature',
                        minLength: 10
                    },
                    listOfStrings: {
                        type: 'array',
                        title: 'A list of strings',
                        description: 'Must contain at least two items',
                        uniqueItems: true,
                        minItems: 2,
                        items: {
                            type: 'string',
                            default: 'bazinga'
                        }
                    },
                    fixedItemsList: {
                        type: 'array',
                        title: 'A list of fixed items',
                        items: [
                            {
                                title: 'A string value',
                                type: 'string',
                                maxLength: 2
                            }
                        ]
                    }
                }
            },
            uiSchema: {
                bio: {
                    'ui:type': 'textarea',
                    'ui:placeholder': 'Please enter ...',
                    'err:required': 'Please enter (configured in ui-schema)',
                },
            },
            errorSchema: {
                userName: {
                    'err:options': {
                        required: 'Please enter username'
                    }
                },
                bio: {
                    'err:minLength': 'Signature minimum length 10 characters'
                },
                listOfStrings: {
                    'err:uniqueItems': 'Cannot contain duplicate values',
                    items: {
                        'err:options': {
                            required: 'Cannot be empty ~'
                        }
                    }
                },
                fixedItemsList: {
                    items: [
                        {
                            'err:maxLength': 'Buddy, you can only enter two characters at most'
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

### custom-formats
* Type: `object`
* Default value: `{}`

Custom validation rules, call `avj.addFormat` method to add new format, [view](https://github.com/ajv-validator/ajv#addformatstring-name-stringregexpfunctionobject-format---ajv)

As follows, demo adding a price validation type:

::: demo Amount greater than 0 < 999999.99, keep two decimal places
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :custom-formats="customFormats"
        :error-schema="errorSchema"
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
                type: 'object',
                required: [
                    'price'
                ],
                properties: {
                    price: {
                        type: 'string',
                        title: 'Price',
                        description: 'Please enter number, keep up to two decimal places, maximum value 999999.99',
                        format: 'price'
                    }
                }
            },
            errorSchema: {
                price: {
                    'err:options': {
                        required: 'Please enter price',
                        format: 'Keep up to two decimal places, maximum value 999999.99'
                    }
                }
            },
            customFormats: {
                price(value) {
                    return value !== '' && /^[0-9]\d*$|^\d+(\.\d{1,2})$/.test(value) && value >= 0 && value <= 999999.99
                }
           }
        }
    }
}
</script>
```
:::

### custom-rule
* Type: `function`
* Default value: `-`

* Custom validation rules, implement form data validation similar to el-form rules validator
* [View details here](/en/guide/validate.html#custom-rule-自定义校验)

### value / v-model
* Type: `object`
* Default value: `{}`

Form binding value, `For values that don't need two-way binding, you can use value props`


### form-footer
* 类型：`object`

```js
// Default value
formFooter = {
    show: true, // Whether to show default footer
    okBtn: 'Save', // Confirm button text
    okBtnProps: { type: 'primary' }, // Pass props to confirm button, e.g. configure button loading state okBtnProps: { loading: true }
    cancelBtn: 'Cancel', // Cancel button text

    // Pass through to formItem component in formFooter
    // E.g. vue3-ant configure wrapperCol  formItemAttrs = { wrapperCol: { span: 10, offset: 5 }}
    formItemAttrs: {}
}
```

#### formFooter show: false how to manually validate
When formFooter `show: false` is configured, you need to manually trigger form validation, submission and other operations. You can refer to the following methods:
1. You can directly use the [$$uiFormRef](/en/guide/basic-config.html#uiformref) property of the form instance to get the ui component form reference, such as elementUi's elForm component, then directly call the corresponding `validate` method

```html
<template>
  <vjsf ref="myForm" />
</template>

<script>
export default {
  async submit() {
    // Pseudo code
    await this.$refs.myForm.$$uiFormRef.validate()
    this.postData()
  }
}
</script>
```

2. If your submit button is still inside the form, you can directly get the form reference from the scope slot parameters

Reference: [slot-scope](/en/guide/basic-config.html#插槽-scope-slot)


### fallback-label
* Type: `boolean`
* default: `false`

When `schema` does not configure `title`, whether to use the current property name as form `label`

As follows, configure `fallback-label` as `true`, `label` will display as `street_address`
```js
schema = {
    properties: {
        street_address: {
            type: 'string'
        }
    }
}
```

### form-props
* Type: `object`
`form-props` supports the following two parts of parameters:

1. Fixed parameters part (this part of parameters is independent of the currently used ui library)
```js
// Default value
formProps = {
    layoutColumn: 1, // 1 2 3, supports 1 2 3 column layout, if using inline form this config is invalid
    inline: false, // Inline form mode, suggestion: when enabled, labelPosition should not be configured as top, antd should not configure labelCol wrapperCol
    inlineFooter: false, // If you want save button and form elements to display on one line, need to configure true
    labelSuffix: '：', // label suffix
    labelPosition: 'top', // Position of form field label
    isMiniDes: false, // Whether to prefer mini form to display description info (label text and description info displayed on same line)
    defaultSelectFirstOption: true, // Radio required, whether to select first option by default
    popover: {}, // Pass through to ui library popover component, such as element ui Popover, antd a-popover
}
```

2. Current ui library form component parameters
Other than the above fixed parameters, all will be passed through to the current ui library's form component, such as elementUi el-form, IView i-form ...
```js
formProps = {
    layoutColumn: 2, // 1 2 3, supports 1 2 3 column layout, if using inline form this config is invalid

    // Below are form component parameters
    // Such as elementUi el-form labelWidth
    labelWidth: 'auto', // Width of form field label, e.g. '50px'
}
```

### strict-mode
Strict mode, when enabled will do strict matching for `anyOf`/`onyOf` when calculating form default values. See issue: [#157](https://github.com/lljj-x/vue-json-schema-form/issues/157)

* Type: `boolean`
* default: `false`


## Events Emit Event
All emit events are as follows:

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        @on-submit="handlerSubmit"
        @on-cancel="handlerCancel"
        @on-change="handlerChange"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    methods: {
        handlerSubmit() {
            const vNode = this.$createElement('pre', JSON.stringify(this.formData, null, 4));
            this.$message({
                type: 'success',
                message: vNode
            });
        },
        handlerCancel() {
            this.$message.warning('Clicked cancel');
        },
        handlerChange({ oldValue, newValue }) {
            const vNode = this.$createElement('pre', JSON.stringify(newValue, null, 4));
            this.$notify({
                title: 'Input data',
                message: vNode
            });
        },
    },
    data() {
        return {
            formData: {
               name: 'Liu.Jun'
            },
            schema: {
                type: 'object',
                properties: {
                    name: {
                        title: 'Enter name',
                        type: 'string'
                    }
                }
            }
        }
    }
};
</script>
```
:::

### on-submit
* Parameter(formData)

::: warning
In vue3 version it is `submit`, remove `on` prefix
:::

Click submit button, and form passes validation

> Event will only be triggered when default footer is configured to display, [props form-footer](#form-footer)

### on-validation-failed
* Parameter(errorObj)

::: warning
In vue3 version it is `validation-failed`, remove `on` prefix
:::

Click submit button, and form does not pass validation, you can get error information here

> 事件只有在配置了显示默认底部才会触发，[props form-footer](#form-footer)


### on-cancel
* Parameter(none)

::: warning
In vue3 version it is `cancel`, remove `on` prefix
:::

Click cancel button
> Event will only be triggered when default footer is configured to display, [props form-footer](#form-footer)

### on-change
* Parameter(newVal, oldVal)

::: warning
In vue3 version it is `change`, remove `on` prefix
:::

Form value changed
> Reference type, newVal equals oldVal unless object is reassigned, see [vue watch](https://cn.vuejs.org/v2/api/#vm-watch)

### on-form-mounted
* Parameter(formRef, { formData })

Through this method you can get the form component instance of the current ui framework, which can be used to execute some methods of the form component, such as (`validate`)

::: warning
In vue3 version it is `form-mounted`, remove `on` prefix
:::

## Methods
- None

## Attributes Attrs
### $$uiFormRef
Added in version `1.10`, in older versions need to get ui framework form instance in [on-form-mounted](#on-form-mounted)
* Convenient to directly get ui framework form component instance

::: warning
* Note: This property will only be set after `mounted`
:::

## Slots Scope-Slot
* name `default`, customize form content, after configuration will override default `form-footer`

Parameters are: { formData, formRefFn }

::: tip Parameter explanation
* `formData` Current form element value, reactive
* `formRefFn` is `function`, calling returns `el-form` component ref instance
:::
Example:
::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
    >
        <div slot-scope="{ formData, formRefFn }">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
            <p><el-button @click="consoleLog(formRefFn)" type="primary">Click</el-button></p>
        </div>
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    methods: {
        consoleLog(getForm) {
            console.log(getForm());
        },
    },
    data() {
        return {
            formData: {
               name: 'Liu.Jun'
            },
            schema: {
                type: 'object',
                properties: {
                    name: {
                        title: 'Enter name',
                        type: 'string'
                    }
                }
            }
        }
    }
};
</script>
```

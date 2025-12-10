# FAQ

## Vue2, Vue3 prompt for related UI components not found
* https://github.com/lljj-x/vue-json-schema-form/issues/169
* https://github.com/lljj-x/vue-json-schema-form/issues/268

vue2 register global components, or vue3 register current app instance public components

## Can the select dropdown values be dynamically configured?

* Based on JSON Schema approach, configure `enum` and `enumNames` to dynamically update, schema is originally reactive data
* Dynamically configure dropdown list through `ui:enumOptions`

The following demonstrates dynamically configuring `ui:enumOptions`. Other similar scenarios can also be handled this way
::: demo
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
               name: ''
            },
            schema: {
                type: 'object',
                properties: {
                    name: {
                        title: 'Select who you are',
                        type: 'string',
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:widget': 'SelectWidget',
                    'ui:enumOptions': [{value: '1',  label: 'Loading...'}]
                }
            }
        }
    },
    created() {
        setTimeout(() => {
            Object.assign(this.uiSchema.name, {
                'ui:enumOptions': [{value: '2',  label: 'Kitten'},{value: '3',  label: 'Puppy'}]
            })
        }, 3000);
    }
};
</script>
```

:::

## JSON Schema object required

> **Background:**
>* JSON Schema specification: object `required` property values only fail validation when the value is `undefined`
>* In `javascript`, `undefined`, `0`, `empty string`, `null`, etc. all convert to `false` when converted to `boolean` type

To smooth out the above differences, when entering a value in a form element, when your input value becomes an empty string `''`, it will be automatically processed as `undefined` to be consistent with the `JSON Schema` specification.

:::tip
* If you don't want this conversion, you can reset the `emptyValue` value by configuring `ui-schema`

For example:
```js
{ 'ui:emptyValue': '' }

// or
{ 'ui:emptyValue': 'Your preferred value' }
```
Click to view [ui-schema parameter configuration](/en/guide/basic-config.html#ui-schema)
:::


## Vue Module not found
After version `0.0.8`, `vue-cli` is no longer used to build lib, changed to `rollup` build. After building, dependency on lowercase `vue`
> The project clearly installed vue but cannot find the module. This is because using vue-cli to build lib, Vue will be imported as a dependency, and it is capitalized Vue.

::: tip Solution
1. If the project uses vue npm package, you only need to add capitalized Vue to the webpack resolve alias configuration

```js
// webpack config
module.exports = {
    // ...
    resolve: {
        alias: {
            Vue: 'vue' // + Add capitalized Vue
        }
    }
};

// If using vue cli3 +
// vue.config.js config configureWebpack add the following code
module.exports = {
    // ...
    configureWebpack: (config) => {
         config.resolve.alias = {
             ...config.resolve.alias,
             Vue: 'vue' // + Add capitalized Vue
         };
    }
}

```

2. If the project uses vue through external script tag import, you need to add capitalized Vue to the webpack externals config
```js
// webpack config
module.exports = {
    // ...
    externals: {
        vue: 'Vue',
        Vue: 'Vue' // + Add capitalized Vue
    }
}

// If using vue cli3 +
// vue.config.js config configureWebpack add the following code
module.exports = {
    // ...
    configureWebpack: (config) => {
         config.externals = {
            ...config.externals,
            vue: 'Vue',
            Vue: 'Vue', // + Add capitalized Vue
         };
    }
}
```
:::


## How to be compatible with IE9

`@lljj/vue-json-schema-form` depends on `vue` `elementUi` `ajv`, which can all be compatible with `ie9`

* Two parts need to be handled for IE9 compatibility
1. CSS part

Due to possible existence of flex and other styles not supported in IE9, the current version requires manually resetting the default form styles.
> Future plans: default styles will not exceed the limit

2. JS part

Either through polyfill, or let `@lljj/vue-json-schema-form` be processed through `bable-loader`
See: [Compatibility solution](/en/guide/polyfill.html#script-Compatibility)

## How to handle single string nodes
Root node must be object, others not supported

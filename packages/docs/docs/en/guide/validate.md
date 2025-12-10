# Data Validation

Currently, there are three ways to implement data validation:
* [Schema validation](#schema-validation)
* [custom-rule custom validation](#custom-rule-custom-validation)
* [ui:field custom field validation](#custom-field-validation)

:::tip
The latter two approaches are based on validation outside of `schema`, so after using them, the API will not be able to validate data using `schema` alone, and will need to reimplement similar custom validation
:::

## schema validation
This is completely based on validation rules following the `JSON Schema` specification, using [error-schema](/en/guide/basic-config.html#error-schema) to configure validation error messages.

> It is recommended to choose the following two methods when `schema` validation cannot meet your needs

## custom-rule custom validation
* Type: `function` receives an object parameter

Format as follows:
```js
const customRule = ({
    field,
    value,
    rootFormData,
    callback
}) => {
    if (field === 'imgList.0.imgUrl') {
        return callback('Always validation failed');
    }
    return callback();
};
```

:::warning Differences between versions
* vue3 antd does not include callback parameter, please use Promise form, such as `return Promise.reject('Error message')`
:::

Detailed parameter explanation as follows:
>* `field`: The `field` path of the current node, corresponding to the `formData` data structure, connected by `.`, such as: `imgList.0.imgUrl`,
>If you are not sure, you can check the `curNodePath` parameter of the corresponding component through `Vue DevTools`
>* `value`: The value of the current node, reactive data, avoid directly modifying the data
>* `rootFormData`: Root node `formData` data, reactive data, avoid directly modifying the data
>* `callback`: `function` must call `callback` to return the current validation result, passing no parameters indicates validation passed

After configuring `custom-rule`, you will get maximum custom validation, and all form items will be processed through this method.
Callers need to match the `field` parameter themselves to determine if it is the field you need to validate.

:::tip
If you need to batch validate each item of an array, you can use regular expressions to match, for example:
```js
// Here you can choose your favorite method to find the node you want to validate
// For example, match: imgList.0.imgUrl imgList.1.imgUrl ...
if (/imgList\.\d+\.imgUrl/.test(field)) {
    return callback('Always validation failed');
}
```
:::

### Demo: custom-rule

::: demo Validate data through custom-rule function
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :custom-rule="customRule"
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
                    'password',
                    'password2'
                ],
                properties: {
                    password: {
                        type: 'string',
                        title: 'Please enter password'
                    },
                    password2: {
                        type: 'string',
                        title: 'Please confirm password'
                    },
                    imgList: {
                        title: 'Image list',
                        type: 'array',
                        minItems: 1,
                        maxItems: 3,
                        items: {
                            type: 'object',
                            properties: {
                                imgUrl: {
                                    title: 'Image URL',
                                    type: 'string',
                                    format: 'uri'
                                },
                                imgLink: {
                                    title: 'Image link URL',
                                    type: 'string',
                                    format: "uri"
                                }
                            },
                            required: [
                                'imgUrl',
                                'imgLink'
                            ]
                        }
                    }
                }
            },
            customRule: ({
                field,
                value,
                rootFormData,
                callback
            }) => {
                const rules = [{
                    rule: 'password2',
                    validator(value, rootFormData) {
                        if (value !== rootFormData.password) return 'Password input inconsistent';
                    }
                }, {
                    rule: /imgList\.\d+\.imgUrl/,
                    validator(value, rootFormData) {
                        if(!/^https/.test(value)) return 'Please enter https link';
                    }
                }];

                for(const ruleItem of rules) {
                    // String | Regx
                    if ((String(ruleItem.rule) === ruleItem.rule && ruleItem.rule === field)
                            || (Object.prototype.toString.call(ruleItem.rule) === '[object RegExp]' && ruleItem.rule.test(field))
                    ) {
                        const error = ruleItem.validator(value, rootFormData);
                        // Stop further validation
                        if (error) return callback(error);
                    }
                }
                return callback();
            }
        }
    }
}
</script>
```
:::

## Custom field validation
Use `ui:field` in `ui-schema` to render with custom `field`. Using a custom field means you need to implement input component rendering and data validation yourself.

* Click to view [Custom field](/en/guide/adv-config.html#Custom-field)

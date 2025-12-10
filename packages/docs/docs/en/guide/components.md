# Global Widget Components

`Widget` components need to support v-model two-way binding. Usually, UI library input components can be used directly, such as `el-input`. For scenarios where they cannot be used directly, the following built-in Widget components are provided:

> The following components are also used internally at runtime.

* [CheckboxesWidget](#checkboxeswidget)
* [RadioWidget](#radiowidget)
* [SelectWidget](#selectwidget)
* [UploadWidget](#uploadwidget)
* [TimePickerWidget](#timepickerwidget)
* [DatePickerWidget](#datepickerwidget)
* [DateTimePickerWidget](#datetimepickerwidget)
* [UploadWidget](#uploadwidget)
* [vue3 ant, naiveUi specific](#vue3-ant-naiveui-specific-global-components)


:::tip
* `vjsf` will automatically register the following global Widget components at runtime.
* vue3 version uses v-model with `model: modelValue`
* [See Custom Widget Components](/en/guide/adv-config.html#custom-widget)
:::

## CheckboxesWidget
Checkbox group, internally uses elementUi `el-checkbox-group` component

### props
* `value/v-model` `required`, type [`Array`]
* `enumOptions` `Array` option list, structure like: `[{value: '1',  label: 'Option One'}]`, value is the value, label is the display label

> Passing other additional parameters will be passed through to the `el-checkbox-group` component

## RadioWidget
Radio button group, internally uses elementUi `el-radio-group` component

### props
* `value/v-model` `required`, type [`String`, `Number`, `Boolean`]
* `enumOptions` `Array` option list, structure like: `[{value: '1',  label: 'Option One'}]`, value is the value, label is the display label

> Passing other additional parameters will be passed through to the `el-radio-group` component

## SelectWidget
Dropdown selection, internally uses elementUi `el-select` component

### props
* `value/v-model` `required`, any type
* `enumOptions` `Array` option list, structure like: `[{value: '1',  label: 'Option One'}]`, value is the value, label is the display label

> Passing other additional parameters will be passed through to the `el-select` component

## UploadWidget
* File upload component, supports multiple file uploads
* Page demo address: [Playground upload component](https://form.lljj.me/#/demo?type=Upload)

### props
* `value/v-model` `required`, type: `[String, Array]`
* `responseFileUrl` Function, used to extract the url field from the upload file interface response, accepts the upload interface response as a parameter
* `btnText` Configure upload button text
* `slots` Supports passing VNode objects, which are ultimately passed to the upload component slot for customizing upload buttons and prompt text (see the DEMO below for usage)

> Passing other additional parameters will be passed through to the el-upload component

`responseFileUrl` default value:
```js
{
    responseFileUrl: {
        default: res => (res ? (res.url || (res.data && res.data.url)) : ''),
        type: [Function]
    }
}
```

As follows: Use `ui:slots` to reset upload button

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
            schema: {
                title: 'File Upload',
                type: 'object',
                description: 'File upload uses el-upload component, supports all el-upload parameters, <br/>slots can be passed as VNode list array through slots parameter',
                properties: {
                    imgUrl: {
                        title: 'Single Image',
                        type: 'string',
                        default: 'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',
                        'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
                        'ui:widget': 'UploadWidget',
                        'ui:slots': {
                            default(h) {
                                return h('el-button', {
                                    slot: 'default',
                                    props: {
                                        size: 'mini',
                                        type: 'primary'
                                    },
                                }, ['Upload Image'])
                            },
                            tip(h) {
                                return h('div', {
                                    slot: 'tip',
                                    style: {
                                        fontSize: '12px',
                                        color: '#666'
                                    }
                                }, ['Note: Please upload 100 * 100 size image'])
                            },
                       }
                    },
                    imgUrlList: {
                        title: 'Multiple Images',
                        type: 'array',
                        'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
                        'ui:btnText': 'Reset upload button text',
                        'ui:widget': 'UploadWidget',
                        // eslint-disable-next-line max-len
                        default: ['http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp'],
                        items: {
                            type: 'string',
                        }
                    }
                }
            },
            formData: {}
       }
    }
};
</script>
```
:::

## TimePickerWidget
> Internally uses `timPick` component, supports parameter pass-through

## DatePickerWidget
> Internally uses `DatePicker / DateTimePicker` component, supports parameter pass-through

## DateTimePickerWidget
> Internally uses `DatePicker / DateTimePicker` component, supports parameter pass-through

## vue3 ant, naiveUi specific global components
> Internally uses `DatePicker / DateTimePicker` component, supports parameter pass-through

vue3 ant and naiveUi do not use `model: modelValue` by default for `v-model`, so common components have been converted as follows:

| Component Name      | Corresponding ant Component | Corresponding Naive Component |
| ----------- | ----------- |----------- |
| InputWidget      | a-input       |n-input       |
| TextAreaWidget      | a-textarea       |n-input       |
| InputNumberWidget   | a-input-number        |n-input-number        |
| AutoCompleteWidget   | a-auto-complete        |n-auto-complete       |
| SliderWidget   | a-slider        |n-slider       |
| SwitchWidget   | a-switch        |a-switch       |
| RateWidget   | a-rate        |a-rate       |

For quick conversion of `modelValue` refer to: [Convert v-model component `modelValue` to others](/en/guide/#vue3-ant-naiveui-v-model-special-handling)

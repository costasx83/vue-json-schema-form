# Layout Configuration

> Layout configuration can be experienced directly in the [Schema Generator](https://form.lljj.me/schema-generator.html#/index),
> In the form configuration, set `Layout`, or set the `Width` of individual elements

Supports [layoutColumn](#layoutcolumn) for configuring the entire form, or [ui:width](#ui-width) for configuring individual nodes. Choose based on your scenario.

## layoutColumn
> `layoutColumn` can directly configure the multi-column layout of the entire form.

Page forms support configuration to display as 1, 2, or 3 columns. Configure `layoutColumn` in the [form-props](/en/guide/basic-config.html#form-props) parameter.

As follows:
```js
formProps: {
    layoutColumn: 2
}
```

## ui:width
> `ui:width` can configure the width of individual form items. Any parameter that can be parsed by CSS width is supported.

To configure nodes that need width settings, configure `ui:width` in [ui-schema](/en/guide/basic-config.html#ui-schema).

```js
'ui:width': {
    width: '50%'
}
```

## Layout Demo
Demo rendering a user information form. Click show code to view source code or run in CodePen

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :ui-schema="uiSchema"
        :schema="schema"
        :formProps="{
            layoutColumn: 2
        }"
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
                properties: {
                    obj1: {
                        title: 'Object1',
                        type: 'object',
                        description: 'Uses default form configuration, two-column layout',
                        required: [],
                        properties: {
                            input1: {
                                title: 'Input box',
                                type: 'string',
                                'ui:options': {
                                    placeholder: 'Please input'
                                }
                            },
                            input2: {
                                title: 'Input box',
                                type: 'string',
                                'ui:options': {
                                    placeholder: 'Please input'
                                }
                            }
                        },
                        'ui:order': [
                            'input1',
                            'input2'
                        ]
                    },
                    object2: {
                        title: 'Object2',
                        type: 'object',
                        description: 'Form item width reset via ui:width',
                        required: [],
                        properties: {
                            boolean: {
                                title: 'Select (Switch)',
                                type: 'boolean',
                                'ui:options': {
                                    width: '33.333%'
                                }
                            },
                            stringRadio: {
                                title: 'Radio',
                                type: 'string',
                                'ui:widget': 'RadioWidget',
                                enum: [
                                    '1',
                                    '2',
                                    '3'
                                ],
                                enumNames: [
                                    'One',
                                    'Two',
                                    'Three'
                                ],
                                'ui:options': {
                                    width: '33.333%'
                                }
                            },
                            stringSelect: {
                                title: 'Select',
                                type: 'string',
                                'ui:widget': 'SelectWidget',
                                enum: [
                                    '1',
                                    '2',
                                    '3'
                                ],
                                enumNames: [
                                    'One',
                                    'Two',
                                    'Three'
                                ],
                                'ui:options': {
                                    width: '33.333%'
                                }
                            }
                        },
                        'ui:order': [
                            'boolean',
                            'stringRadio',
                            'stringSelect'
                        ]
                    }
                }
            },
            uiSchema: {
                bio: {
                    'ui:options': {
                        placeholder: 'Please enter your signature',
                        type: 'textarea',
                        rows: 1
                    }
                }
            }
        };
    }
};
</script>
```
:::

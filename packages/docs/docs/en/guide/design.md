# Design Implementation

## Form Rendering
Based on component recursion, rendering data level by level, as shown in the diagram: (Click to enlarge)
![Vjsf](/vjsf.jpg)

:::tip Recursion explanation
* `schema` `ui-schema` `error-schema` are split and rendered recursively node by node. This data basically doesn't change.
* `formData` user input will change frequently. To avoid rendering the entire tree with each input,
here the current node path string `curNodePath` and root node formData `rootFormData` are used to parse the current value.
> For example: `curNodePath` is `userInfo.userName`, you can easily get or set the value of the current node
>> Public methods are provided here
>> ```js
>> import { vueUtils } from '@lljj/vue-json-schema-form';
>>
>> // get
>> vueUtils.getPathVal(rootFormData, curNodePath);
>>
>> // set
>> vueUtils.setPathVal(rootFormData, curNodePath, value);
>> ```
:::

## How to Validate Data
Validation uses [ajv](https://github.com/epoberezkin/ajv) to validate schema, combined with [error-schema](/en/guide/basic-config.html#error-schema) to customize validation error messages

#### Data is validated by splitting level by level
For example:

```js
// Example schema
schema = {
     type: 'object',
     minProperties: 2,
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
         }
     }
};

// formData
formData = {
    firstName: 'Jun'
}
```

Split as follows:
![vjsf-vaidate](/vjsf-vaidate.jpg)

The above schema will be split into the following three validations, validating property values and the object itself in sequence.

#### Why is this?
Convenient to define validation for each leaf node on `formItem`. When user inputs, only validate the user-operated input box.

Advantages:
> Only validating the current active input box is faster, eliminating the step of validating the entire form and then matching ajv to each formItem, and also won't cause validation messages to appear on non-active input boxes.

Disadvantages:
> Some properties cannot be split to leaf nodes, such as object's minProperties, array's minItems, oneOf, anyOf, etc.
>* So a separate validation will be added to `object`, `array`, `oneOf`, `anyOf` nodes, triggered during `submit`, as shown in the diagram `object validation`

#### Special handling: `required` configuration
`object required` will be split into each `property` for validation, calculating whether each `property` needs `required` through `object field`

```js
// Pseudo code - required passed through parent node props
function render(h) {
    const propertiesVnode = propertiesNameList.map(name => {
        return h(
            ChildField,
            {
                props: {
                    ...,
                    required: Array.isArray(schema.required)
                        && schema.required.includes(name),
                }
            }
        );
    });
}
```

:::tip
For `array` type, each `item` is `required`
:::

#### Other supplements
`error-schema` and `ui-schema` configuration data structures are consistent with `schema`. If consistent with formData,
some scenarios cannot be configured, such as `anyOf`, so this choice was made.

## Design Philosophy

* The design philosophy is inspired by [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form),
and also uses source code from `react-json-schema` for parsing and indexing schema, while also fixing some existing minor issues.

* When users input data, rendering is minimized to the greatest extent possible, achieving that in most scenarios only the `Widget` component containing the input content needs to be re-rendered.

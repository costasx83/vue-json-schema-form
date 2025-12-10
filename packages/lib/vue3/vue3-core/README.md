# @lljj/vue3-form-core
Vue3 version core, can be used to adapt different Vue3 UI libraries.

The core of the adaptation is to map corresponding types to your own component library and handle the conversion between default `props` and your component library props

> For adaptation examples, refer to [@lljj/vue3-form-element](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue3/vue3-form-element) , [@lljj/vue3-form-ant](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue3/vue3-form-ant)


## Compatibility
The npm package is directly es6+ source code and needs to be transpiled through babel when building the lib

For example, configuring rollup babel plugin:

```js
babel({
    exclude: /node_modules\/(?!(@lljj)\/).*/, // Ignore and skip @lljj
    extensions: ['.js', '.vue'],
})
```

## Installation

```ssh
## npm
npm install --save @lljj/vue3-form-core

## yarn
yarn add @lljj/vue3-form-core
```

## Usage

Configure the mapping relationship of corresponding components in the current component library in the following format. You can directly configure global component names or component constructors. `Default component props are in elementUi format. If the props format is different, an intermediate component is needed for conversion`;

```js
import createVue2Core from '@lljj/vue3-form-core';

const globalOptions = {
    // Mapping relationship between widget components and existing component library
    WIDGET_MAP: {
        // Map default widget components by schema type
        types: {
            // type  boolean
            boolean: 'el-switch',

            // type  string
            string: 'el-input',

            // type number
            number: 'el-input-number',

            // type integer
            integer: 'el-input-number',
        },

        // Map default widget components by schema format, higher priority than types
        formats: {
            // format: color
            color: 'el-color-picker',

            // format: time
            time: TimePickerWidget, // Format 20:20:39+00:00

            // format: date
            date: DatePickerWidget, // Format 2018-11-13

            // format: date-time
            'date-time': DateTimePickerWidget, // Format 2018-11-13T20:20:39+00:00
        },

        // Some common public types
        common: {
            // select option
            select: SelectWidget,

            // radio
            radioGroup: RadioWidget,

            // checkout
            checkboxGroup: CheckboxesWidget,
        },

        // Configure some components adapted for the current UI library here. They will be automatically registered as global components at runtime. If not registered globally, no configuration is needed.
        // Vue3 can only get the current app inside components, so the registration timing is in the form component setup and will only be registered once.
        widgetComponents: {
            CheckboxesWidget,
            RadioWidget,
            SelectWidget,
            TimePickerWidget,
            DatePickerWidget,
            DateTimePickerWidget
        }
    },

    // Other form-related component mapping relationships
    COMPONENT_MAP: {
        // form component
        form: 'el-form',

        // formItem component
        formItem: 'el-form-item',

        // button component
        button: 'el-button',

        // popover, used to display description on mouse hover when formLabel is in left/right layout
        popover: 'el-popover'
    },
    HELPERS: {
        // Whether to display description in mini mode
        isMiniDes(formProps) {
            return formProps && ['left', 'right'].includes(formProps.labselPosition);
        }
    }
};

const mySchemaForm = createVue2Core(globalOptions);

```

To adapt a new UI framework, you only need to adapt the above components

## License
Apache-2.0

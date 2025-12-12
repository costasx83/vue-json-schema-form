# @lljj/vue2-form-core
Vue2 core library that can be used to adapt different Vue2 UI frameworks.

The core of adaptation is to map schema types to your own component library and handle the conversion between default `props` and your component library's props.

> For adaptation examples, see [@lljj/vue-json-schema-form](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue2/vue2-form-element) and [@lljj/vue2-form-iview3](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue2/vue2-form-iview3)


## Compatibility
The npm package is ES6+ source code and needs to be transpiled through Babel when building the library.

For example, configure the Rollup Babel plugin:

```js
babel({
    exclude: /node_modules\/(?!(@lljj)\/).*/, // Skip ignoring @lljj
    extensions: ['.js', '.vue'],
})
```

## Installation

```ssh
## npm
npm install --save @lljj/vue2-form-core

## yarn
yarn add @lljj/vue2-form-core
```

## Usage

Configure the mapping relationship between corresponding components in your current component library in the following format. You can directly configure global component names or component constructors. `Default component props are in ElementUI format. If the props format is different, you need an intermediate component for conversion`;

```js
import createVue2Core from '@lljj/vue2-form-core';

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
            time: TimePickerWidget, // 格式 20:20:39+00:00

            // format: date
            date: DatePickerWidget, // 格式 2018-11-13

            // format: date-time
            'date-time': DateTimePickerWidget, // 格式 2018-11-13T20:20:39+00:00
        },

        // Some common types
        common: {
            // select option
            select: SelectWidget,

            // radio
            radioGroup: RadioWidget,

            // checkout
            checkboxGroup: CheckboxesWidget,
        },

        // Configure components adapted for the current UI library here, they will be automatically registered as global components at runtime
        // Vue2 will register them when calling createVue2Core.
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

        // popover, used to display description on hover when formLabel is in left/right layout
        popover: 'el-popover'
    },
    HELPERS: {
        // Whether to display description in mini mode
        isMiniDes(formProps) {
            return formProps && ['left', 'right'].includes(formProps.labselPosition);
        }
    }
};

// For performance, you can also Object.freeze the globalOptions configuration data
const mySchemaForm = createVue2Core(globalOptions);

```

Adapting a new UI framework only requires adapting the components mentioned above.

## License
Apache-2.0

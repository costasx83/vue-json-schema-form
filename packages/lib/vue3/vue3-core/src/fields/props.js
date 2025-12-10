/**
 * Created by Liu.Jun on 2020/4/22 18:58.
 */

// Recursive parameters, unified props
export default {
    formProps: {
        type: null
    },
    // Global configuration for initialization differences, adapting to different UI frameworks
    globalOptions: {
        type: null
    },
    // Current node schema
    schema: {
        type: Object,
        default: () => ({})
    },
    // Current node UI Schema
    uiSchema: {
        type: Object,
        default: () => ({})
    },
    // Current node Error Schema
    errorSchema: {
        type: Object,
        default: () => ({})
    },
    // Custom validation
    customRule: {
        type: Function,
        default: null
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
    },
    // Whether validation data group is needed
    // object array type will append a validation component at the end to validate overall data by default
    needValidFieldGroup: {
        type: Boolean,
        default: true
    }
};

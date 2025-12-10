/**
 * Created by Liu.Jun on 2020/4/16 10:47 下午.
 */

export default {
    formFooter: {
        type: Object,
        default: () => ({
            show: true,
            okBtn: 'Save',
            cancelBtn: 'Cancel',
        }),
    },
    value: {
        type: null,
        default: () => ({}),
        required: true
    },
    formProps: {
        type: Object,
        default: () => ({}),
    },
    fallbackLabel: {
        type: Boolean,
        default: false,
    },
    strictMode: {
        type: Boolean,
        default: false,
    },
    schema: {
        type: Object,
        default: () => ({}),
        required: true
    },
    // Reset UI styles
    uiSchema: {
        type: Object,
        default: () => ({})
    },
    // Custom validation rules
    customFormats: {
        type: Object,
        default: () => ({})
    },
    // Custom validation
    customRule: {
        type: Function,
        default: null
    },
    // Reset custom errors
    errorSchema: {
        type: Object,
        default: () => ({})
    }
};

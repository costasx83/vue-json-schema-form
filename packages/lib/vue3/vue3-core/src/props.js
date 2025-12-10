/**
 * Created by Liu.Jun on 2020/4/16 10:47 PM.
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
    modelValue: {
        type: null,
        default: () => ({}),
        required: true
    },
    fallbackLabel: {
        type: Boolean,
        default: false,
    },
    strictMode: {
        type: Boolean,
        default: false,
    },
    formProps: {
        type: Object,
        default: () => ({})
    },
    schema: {
        type: Object,
        default: () => ({})
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

import Vue from 'vue';

declare class VueForm extends Vue {
    /** formFooter configuration */
    formFooter: object

    /** value / v-model */
    value: object

    /** Props passed to form */
    formProps: object

    /** schema configuration */
    schema: object

    /** uiSchema configuration */
    uiSchema: object

    /** Reset custom errors */
    errorSchema: object

    /** Custom validation rules */
    customFormats: object

    /** Custom validation rules */
    customRule: null
}

export default VueForm;

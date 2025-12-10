declare namespace schemaValidate {
    /** Validate formData through ajv schema and return error information */
    function ajvValidateFormData(options: object): object;

    /** Validate formData and convert error information */
    function validateFormDataAndTransformMsg(options: object): object;

    /** Whether schema passes validation */
    function isValid(schema: object, data: any): boolean;

    /** ajv validate method */
    function ajvValid(schema: object, data: any): boolean;

    /** oneOf anyOf find current matching item index through formData value */
    function getMatchingOption(formData: object, options: object, rootSchema: object): boolean;
}

export default schemaValidate;

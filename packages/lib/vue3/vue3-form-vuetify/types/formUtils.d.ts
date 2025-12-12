interface Options {
    schema: object,
    uiSchema: object
}

declare namespace formUtils {

    /** Parse current node ui field */
    function getUiField(schemaOption: Options): object | null;

    /** Parse user configured uiSchema options */
    function getUserUiOptions(schemaOption: Options): object;

     /** Parse current node ui options parameters */
    function getUiOptions(schemaOption: Options): object;

     /** Get current node ui configuration (options + widget) */
    function getWidgetConfig(schemaOption: Options): object;

     /** Get current node ui configuration (options + widget) */
    function getUserErrOptions(schemaOption: Options): object;

     /** ui:order object-> properties sorting */
    function orderProperties(properties: object, order): object;

     /** Whether current schema value is constant */
    function isConstant(schema: object): boolean;

    function toConstant(schema: object): object | null;

    /** Whether it is a selection list **/
    function isSelect(_schema: object, rootSchema: object): boolean;

    /** type array items are all one object **/
    function isFixedItems(schema: object): boolean;

    /** Whether it is multi-select **/
    function isMultiSelect(schema: object, rootSchema: object): boolean;

    function allowAdditionalItems(schemaOption: Options): boolean;

    /** Dropdown options **/
    function optionsList(schemaOption: Options);
}

export default formUtils;

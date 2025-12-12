declare namespace fieldProps {

    /** Current node schema */
    export const schema:object

    /** Current node uiSchema */

    export const uiSchema:object

    /** Current node errorSchema */
    export const errorSchema:object

    /** Custom validation rules */
    export const customFormats:object

    /** Root node schema */
    export const rootSchema:object

    /** Root node formData */
    export const rootFormData:object

    /** Current node path */
    export const curNodePath:string

    /** Whether it is required */
    export const required:boolean

    /** Whether data group validation is needed */
    export const needValidFieldGroup:boolean
}

export default fieldProps;

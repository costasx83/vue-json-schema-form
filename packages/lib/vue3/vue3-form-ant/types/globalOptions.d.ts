interface HELPERS {
    isMiniDes: (formProps: object) => boolean;
}

declare namespace globalOptions {

    /** WIDGET_MAP configuration */
    export const WIDGET_MAP:object

    /** COMPONENT_MAP configuration */
    export const COMPONENT_MAP:object

    /** HELPERS configuration */
    export const HELPERS: HELPERS
}

export default globalOptions;

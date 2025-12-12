/**
 * Created by Liu.Jun on 2020/10/26 18:24.
 */

import { formatFormLabelWidth } from '../common/editorData';

function genBaseVal(type = 'string', isMultiSelect = false) {
    return {
        title: 'Basic Configuration',
        type: 'object',
        properties: {
            schemaOptions: {
                type: 'object',
                properties: {
                    title: {
                        title: 'Title',
                        type: 'string',
                        'ui:placeholder': 'Please enter form item title',
                        'err:required': 'Please enter title'
                    },
                    description: {
                        title: 'Description',
                        type: 'string',
                        'ui:options': {
                            placeholder: 'Please enter form item description, supports HTML input',
                            type: 'textarea',
                            rows: 3,
                        }
                    },
                    ...!['array', 'object'].includes(type) ? {
                        default: {
                            title: 'Default value',
                            type,
                            'ui:placeholder': 'Enter default value'
                        },
                    } : {},
                    ...['array'].includes(type) ? {
                        minItems: {
                            title: 'Minimum child elements',
                            type: 'number'
                        },
                        maxItems: {
                            title: 'Maximum child elements',
                            type: 'number'
                        },
                        uniqueItems: {
                            type: 'boolean',
                            title: 'No duplicates',
                            description: 'Checkbox forced to default true, configuration invalid',
                            'ui:widget': 'SwitchWidget',
                            default: false
                        }
                    } : {}
                }
            },
            uiOptions: {
                type: 'object',
                properties: {
                    ...!['array', 'object'].includes(type) || isMultiSelect ? {
                        width: {
                            title: 'Width',
                            type: 'string',
                            description: 'Please enter style width supported format, <br />e.g., '
                                + '<strong style="font-weight: bold;">10%, 100px</strong>, percentage units recommended',
                            'ui:placeholder': 'Please enter FormItem width'
                        },
                        labelWidth: {
                            title: 'Label width',
                            type: 'number',
                            'ui:widget': 'v-slider',
                            'ui:options': {
                                formatTooltip(val) {
                                    return formatFormLabelWidth(val);
                                }
                            }
                        },
                        required: {
                            title: 'Required',
                            type: 'boolean',
                            default: false
                        },
                        disabled: {
                            title: 'Disabled',
                            type: 'boolean',
                            default: false
                        }
                    } : {
                        showTitle: {
                            title: 'Show title',
                            type: 'boolean',
                            default: true,
                            'ui:widget': 'SwitchWidget'
                        },
                        showDescription: {
                            title: 'Show description',
                            type: 'boolean',
                            default: true,
                            'ui:widget': 'SwitchWidget'
                        }
                    },
                }
            }
        }
    };
}

export default (schema, type, isMultiSelect) => ({
    type: 'object',
    required: ['property'],
    properties: {
        property: {
            title: 'Property name',
            type: 'string',
            'ui:placeholder': 'Please enter property name',
            'err:required': 'Property name required'
        },
        baseValue: genBaseVal(type, isMultiSelect),
        ...schema
    }
});

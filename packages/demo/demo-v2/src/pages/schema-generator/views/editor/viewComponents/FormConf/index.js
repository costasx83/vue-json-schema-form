/**
 * Created by Liu.Jun on 2020/11/20 17:44.
 */

import { formatFormLabelWidth } from '../../common/editorData';


export default {
    type: 'object',
    required: [],
    properties: {
        formProps: {
            title: 'Form Config',
            type: 'object',
            description: 'Note: If using inline layout (ElementUI form inline config), multi-column layout will not work; '
                + 'also Footer inline only supports one row of form items',
            properties: {
                inline: {
                    type: 'boolean',
                    title: 'Inline Layout',
                    default: false
                },
                inlineFooter: {
                    type: 'boolean',
                    title: 'Footer inline',
                    default: false
                },
                layoutColumn: {
                    title: 'Layout',
                    type: 'number',
                    default: 1,
                    enum: [
                        1,
                        2,
                        3
                    ],
                    enumNames: [
                        'One Column',
                        'Two Columns',
                        'Three Columns'
                    ],
                    'ui:widget': 'SelectWidget'
                },
                labelPosition: {
                    title: 'Label Alignment',
                    type: 'string',
                    default: 'top',
                    enum: [
                        'left',
                        'right',
                        'top'
                    ],
                    enumNames: [
                        'Left',
                        'Right',
                        'Top'
                    ],
                },
                labelWidth: {
                    title: 'Label Width',
                    type: 'number',
                    default: 25, // 4x pixels
                    'ui:widget': 'ElSlider',
                    'ui:options': {
                        formatTooltip(val) {
                            return formatFormLabelWidth(val);
                        }
                    }
                },
                labelSuffix: {
                    title: 'Form Item Suffix',
                    type: 'string',
                    default: '：'
                }
            }
        },
        formFooter: {
            title: 'Form Footer Config',
            type: 'object',
            properties: {
                show: {
                    type: 'boolean',
                    title: 'Show Footer',
                    default: false
                },
                okBtn: {
                    type: 'string',
                    title: 'OK Button Text',
                    default: 'Save'
                },
                cancelBtn: {
                    type: 'string',
                    title: 'Cancel Button Text',
                    default: 'Cancel'
                }
            }
        }
    }
};

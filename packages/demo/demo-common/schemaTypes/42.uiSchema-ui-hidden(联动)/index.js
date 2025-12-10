/**
 * Created by Liu.Jun on 2020/5/19 15:41.
 */

export default {
    schema: {
        title: 'Configure ui:hidden Expression using ui-schema',
        description: `Implement configuration method similar to Ali formRender, with the following parameters:
            <br><b>rootFormData</b>: Root node value
            <br><b>parentFormData</b>: Current parent node value`,
        type: 'object',
        properties: {
            case1: {
                title: 'Hide entire section',
                type: 'object',
                properties: {
                    showMore: {
                        title: 'Show more',
                        type: 'boolean',
                        default: false
                    },
                    x1: {
                        title: 'Input 1',
                        type: 'string',
                        'ui:hidden': '{{rootFormData.case1.showMore === false}}'
                    },
                    x2: {
                        title: 'Input 2',
                        type: 'string',
                        'ui:hidden': '{{rootFormData.case1.showMore === false}}'
                    }
                }
            },
            case3: {
                title: 'List/Show different components',
                type: 'object',
                properties: {
                    ruleList: {
                        title: 'Player filtering',
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                attr: {
                                    title: 'Criteria',
                                    type: 'string',
                                    enum: [
                                        'goal',
                                        'league'
                                    ],
                                    enumNames: [
                                        'Goals scored',
                                        'League'
                                    ],
                                    'ui:width': '40%'
                                },
                                relation: {
                                    title: '-',
                                    type: 'string',
                                    enum: [
                                        '>',
                                        '<',
                                        '='
                                    ],
                                    'ui:hidden': "{{parentFormData.attr === 'league'}}",
                                    'ui:width': '20%'
                                },
                                goal: {
                                    title: 'Goals scored',
                                    type: 'string',
                                    pattern: '^[0-9]+$',
                                    message: {
                                        pattern: 'Enter valid score'
                                    },
                                    'ui:hidden': "{{parentFormData.attr !== 'goal'}}",
                                    'ui:width': '40%'
                                },
                                league: {
                                    title: 'Name',
                                    type: 'string',
                                    enum: [
                                        'a',
                                        'b',
                                        'c'
                                    ],
                                    enumNames: [
                                        'La Liga',
                                        'Premier League',
                                        'Chinese Super League'
                                    ],
                                    'ui:hidden': "{{parentFormData.attr !== 'league'}}",
                                    'ui:width': '40%'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

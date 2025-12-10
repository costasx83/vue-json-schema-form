/**
 * Created by Liu.Jun on 2020/7/22 11:07 PM.
 */

export default {
    schema: {
        title: 'Date Time Selection',
        type: 'object',
        description: 'Date and datetime support range selection (default format is timestamp, configuring type string will format as ISO time)',
        required: ['dateTimeRange', 'dateTime'],
        properties: {
            dateTimeRange: {
                title: 'Date Time Range Selection',
                type: 'array',
                format: 'date-time',
                items: {
                    type: 'string'
                }
            },
            dateTimeRangeNumber: {
                title: 'Date Time Range Selection (number timestamp)',
                type: 'array',
                format: 'date-time',
                items: {
                    type: 'number'
                }
            },
            dateRange: {
                title: 'Date Range Selection',
                type: 'array',
                format: 'date',
                items: {
                    type: 'string'
                }
            },
            dateRangeNumber: {
                title: 'Date Range Selection (number timestamp)',
                type: 'array',
                format: 'date',
                items: {
                    type: 'number'
                }
            },
            time: {
                title: 'Time Selection',
                type: 'string',
                format: 'time'
            },
            dateTime: {
                title: 'Date Time',
                type: 'string',
                format: 'date-time'
            },
            dateTimeNumber: {
                title: 'Date Time (timestamp)',
                type: 'number',
                format: 'date-time'
            },
            date: {
                title: 'Date',
                type: 'string',
                format: 'date'
            },
            dateNumber: {
                title: 'Date (timestamp)',
                type: 'number',
                format: 'date'
            }
        }
    }
};

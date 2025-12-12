/**
 * Created by Liu.Jun on 2020/4/21 18:23.
 */

// Widget component mapping to Vuetify configuration table
import { h } from 'vue';
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';
import widgetComponents from './index';

const {
    CheckboxesWidget,
    RadioWidget,
    SelectWidget,
    TimePickerWidget,
    DatePickerWidget,
    DateTimePickerWidget,
    SwitchWidget
} = widgetComponents;

export default {
    types: {
        boolean: SwitchWidget,
        string: 'v-text-field',
        number: 'v-number-input',
        integer: 'v-number-input',
    },
    formats: {
        color: 'v-color-input',
        time: TimePickerWidget, // 20:20:39+00:00
        date: DatePickerWidget, // 2018-11-13
        'date-time': DateTimePickerWidget, // 2018-11-13T20:20:39+00:00
    },
    common: {
        select: SelectWidget,
        radioGroup: RadioWidget,
        checkboxGroup: CheckboxesWidget,
    },
    widgetComponents
};

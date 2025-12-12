/**
 * Created by Liu.Jun on 2020/5/17 10:41 PM.
 */
import { resolveComponent, modelValueComponent } from '@lljj/vjsf-utils/vue3Utils';
import CheckboxesWidget from './CheckboxesWidget';
import RadioWidget from './RadioWidget';
import SelectWidget from './SelectWidget';
import DatePickerWidget from './DatePickerWidget';
import DateTimePickerWidget from './DateTimePickerWidget';
import TimePickerWidget from './TimePickerWidget';
import UploadWidget from './UploadWidget';
import TextareaWidget from './TextareaWidget';
import SwitchWidget from './SwitchWidget';


const widgetComponents = {
    CheckboxesWidget,
    RadioWidget,
    SelectWidget,
    TimePickerWidget,
    DatePickerWidget,
    DateTimePickerWidget,
    UploadWidget,
    SwitchWidget,
    TextareaWidget,
    // InputNumberWidget: modelValueComponent('v-input-number'),
    AutoCompleteWidget: modelValueComponent('v-autocomplete'),
    // SliderWidget: modelValueComponent('v-slider'),
    RateWidget: modelValueComponent('v-rating'),
};

export default widgetComponents;

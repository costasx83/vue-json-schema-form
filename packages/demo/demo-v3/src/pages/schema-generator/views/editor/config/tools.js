/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

// Basic components
import componentPackInput from '../viewComponents/Input';
import componentPackColor from '../viewComponents/Color';
import componentPackInputNumber from '../viewComponents/InputNumber';
import componentPackSlider from '../viewComponents/Slider';

// Boolean type
import componentPackBooleanSwitch from '../viewComponents/SelectBoolean/elSwitch';
import componentPackBooleanCheckbox from '../viewComponents/SelectBoolean/elCheckbox';
import componentPackBooleanSelect from '../viewComponents/SelectBoolean/elSelect';
import componentPackBooleanRadio from '../viewComponents/SelectBoolean/elRadio';

// Single/Multiple select
import componentPackRadio from '../viewComponents/SingleSelect/elRadio';
import componentPackRadioSelect from '../viewComponents/SingleSelect/elSelect';

import componentPackMultiSelect from '../viewComponents/MultiSelect/elSelect';
import componentPackMultiCheckbox from '../viewComponents/MultiSelect/elCheckbox';

// Upload
import componentPackUpload from '../viewComponents/Upload';
import componentPackMultiUpload from '../viewComponents/MultiUpload';

// Time and Date
import componentPackTime from '../viewComponents/Time';

// Date
import componentPackDate from '../viewComponents/Date';
import componentPackDateString from '../viewComponents/Date/string';

// DateTime
import componentPackDateTime from '../viewComponents/DateTime';
import componentPackDateTimeString from '../viewComponents/DateTime/string';

// Date Range
import componentPackDateRange from '../viewComponents/DateRange';
import componentPackDateRangeString from '../viewComponents/DateRange/string';

// DateTime Range
import componentPackDateTimeRange from '../viewComponents/DateTimeRange';
import componentPackDateTimeRangeString from '../viewComponents/DateTimeRange/string';


// Layout Object Array
import componentPackObject from '../viewComponents/Object';
import componentPackArray from '../viewComponents/Array';

/**
 * hidden: hidden, not shown in toolbar
 * maxNum: Number, maximum configurable count
 * topDisplay: Bool, display at the very top
 * bottomDisplay: Bool, display at the very bottom
 * onlyCanConfig: Bool, can only configure data, cannot delete or copy
 * @type {*[]}
 */
const tools = [
    {
        groupName: 'Layout Components',
        componentList: [{
            title: 'Object',
            btnClass: 'w100',
            componentPack: componentPackObject
        }, {
            title: 'Array',
            btnClass: 'w100',
            componentPack: componentPackArray
        }]
    },
    {
        groupName: 'Basic Components',
        componentList: [{
            title: 'Input',
            componentPack: componentPackInput
        }, {
            title: 'Number (slider)', // This must be before componentPackInputNumber for matching priority
            componentPack: componentPackSlider
        }, {
            title: 'Number Input',
            componentPack: componentPackInputNumber
        }, {
            title: 'Color Picker',
            componentPack: componentPackColor
        }]
    },
    {
        groupName: 'Boolean',
        componentList: [{
            title: 'Boolean (Switch)',
            componentPack: componentPackBooleanSwitch
        }, {
            title: 'Boolean (Checkbox)',
            componentPack: componentPackBooleanCheckbox
        }, {
            title: 'Boolean (Select)',
            componentPack: componentPackBooleanSelect
        }, {
            title: 'Boolean (Radio)',
            componentPack: componentPackBooleanRadio
        }]
    },
    {
        groupName: 'Single/Multiple Select',
        componentList: [{
            title: 'Single (Radio)',
            componentPack: componentPackRadio
        }, {
            title: 'Single (Select)',
            componentPack: componentPackRadioSelect
        }, {
            title: 'Multiple (Select)',
            componentPack: componentPackMultiSelect
        }, {
            title: 'Multiple (Checkbox)',
            componentPack: componentPackMultiCheckbox
        }]
    },
    {
        groupName: 'File Upload',
        componentList: [{
            title: 'Single File',
            componentPack: componentPackUpload
        }, {
            title: 'Multiple Files',
            componentPack: componentPackMultiUpload
        }]
    },
    {
        groupName: 'Date & Time',
        componentList: [{
            title: 'Date (timestamp)',
            componentPack: componentPackDate
        }, {
            title: 'Date (string)',
            componentPack: componentPackDateString
        }, {
            title: 'DateTime (timestamp)',
            componentPack: componentPackDateTime
        }, {
            title: 'DateTime (string)',
            componentPack: componentPackDateTimeString
        }, {
            title: 'Date Range (timestamp)',
            componentPack: componentPackDateRange
        }, {
            title: 'Date Range (string)',
            componentPack: componentPackDateRangeString
        }, {
            title: 'DateTime Range (timestamp)',
            componentPack: componentPackDateTimeRange
        }, {
            title: 'DateTime Range (string)',
            componentPack: componentPackDateTimeRangeString
        }, {
            title: 'Time (string)',
            componentPack: componentPackTime
        }]
    }
];

export default tools;

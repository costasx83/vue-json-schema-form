/**
 * Created by Liu.Jun on 2020/7/22 13:22.
 */

import { h, ref, watch } from 'vue';
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';
import { parseDateString } from '@lljj/vjsf-utils/utils';

const formatTimeStr = (dateString) => {
    const { hour, minute, second } = parseDateString(dateString, true);
    return `${hour}:${minute}:${second}`;
};

const formatTimeObj = (timeStr) => {
    if (timeStr instanceof Date) {
        return timeStr;
    }

    // Get current time and modify hours, minutes, seconds
    if (typeof timeStr === 'string') {
        const [hours, minutes, seconds] = timeStr.split(':');
        const curTime = new Date();
        curTime.setHours(+hours);
        curTime.setMinutes(+minutes);
        curTime.setSeconds(+seconds);
        return curTime;
    }

    // Clear other formats
    return undefined;
};

export default {
    name: 'TimePickerWidget',
    inheritAttrs: false,
    props: {
        modelValue: {
            default: null,
            type: null
        }
    },
    setup(props, { attrs, slots }) {
        // Hack: element plus timePicker becomes object type
        const originValue = ref(formatTimeObj(props.modelValue));

        // Does not need to be reactive
        let formatValue = props.modelValue;

        // If the external value was modified
        watch(() => props.modelValue, (newVal) => {
            if (newVal !== formatValue) {
                // Update internal value
                originValue.value = formatTimeObj(newVal);
            }
        });

        return () => h(resolveComponent('el-time-picker'), {
            ...attrs,
            modelValue: originValue.value,
            'onUpdate:modelValue': (val) => {
                originValue.value = val;

                // Update and cache internal timeStr
                formatValue = val === null ? undefined : formatTimeStr(val);

                // Update external value
                attrs['onUpdate:modelValue'].apply(attrs, [formatValue]);
            }
        }, slots);
    }
};

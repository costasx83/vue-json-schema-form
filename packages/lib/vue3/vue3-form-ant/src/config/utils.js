/**
 * Created by Liu.Jun on 2021/2/21 9:38 PM.
 */

import { defineComponent, h } from 'vue';
import { resolveComponent, modelValueComponent } from '@lljj/vjsf-utils/vue3Utils';

const numberTimeComponent = component => defineComponent({
    inheritAttrs: false,
    setup(props, { attrs, slots }) {

        return () => {
            const {
                isNumberValue, isRange, value, ...otherAttrs
            } = attrs;

            // Antdv moment format must accept string timestamp
            const newValue = isNumberValue
                ? (isRange
                    ? (value || []).map(item => (typeof item === 'number' ? String(item) : item))
                    : typeof value === 'number' ? String(value) : value
                )
                : value;

            const trueAttrs = {
                ...attrs,
                value: newValue,
                'onUpdate:value': function updateValue(upValue) {
                    if (isNumberValue) {
                        upValue = isRange ? upValue.map(item => +item) : +upValue;
                    }
                    otherAttrs['onUpdate:value'].call(this, upValue);
                }
            };

            return h(resolveComponent(component), trueAttrs, slots);
        };
    }
});

export {
    // Convert antdv non-modelValue v-model components
    modelValueComponent,

    numberTimeComponent
};

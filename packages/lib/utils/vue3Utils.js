/**
 * Created by Liu.Jun on 2020/4/25 14:45.
 */

import { defineComponent, h, resolveComponent as _resolveComponent } from 'vue';

import {
    nodePath2ClassName, isRootNodePath, computedCurPath, getPathVal, path2prop, pathSeparator
} from './vueCommonUtils';

// Delete current path value
export function deletePathVal(vueData, name) {
    delete vueData[name];
}

// Set current path value
export function setPathVal(obj, path, value) {
    const pathArr = path.split(pathSeparator);
    for (let i = 0; i < pathArr.length; i += 1) {
        if (pathArr.length - i < 2) {
            // Last data
            obj[pathArr[pathArr.length - 1]] = value;
            break;
        }
        obj = obj[pathArr[i]];
    }
}

export function resolveComponent(component) {
    if (typeof component === 'string') return _resolveComponent(component);

    return component;
}

// Convert antdv, naive and other non-modelValue v-model components
export const modelValueComponent = (component, {
    model = 'value'
} = {}) => defineComponent({
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
        return () => {
            const {
                modelValue: value,
                'onUpdate:modelValue': onUpdateValue,
                ...otherAttrs
            } = attrs;

            // eg: 'a-input'
            return h(resolveComponent(component), {
                [model]: value,
                [`onUpdate:${model}`]: onUpdateValue,
                ...otherAttrs
            }, slots);
        };
    }
});

export {
    nodePath2ClassName, isRootNodePath, computedCurPath, getPathVal, path2prop, pathSeparator
};

/**
 * Created by Liu.Jun on 2020/4/25 14:45.
 */

import Vue from 'vue';

import {
    nodePath2ClassName, isRootNodePath, computedCurPath, getPathVal, path2prop, pathSeparator
} from './vueCommonUtils';

// Delete current path value
export function deletePathVal(vueData, name) {
    Vue.delete(vueData, name);
}

// Set current path value
export function setPathVal(obj, path, value) {
    // Vue.set ?
    const pathArr = path.split(pathSeparator);
    for (let i = 0; i < pathArr.length; i += 1) {
        if (pathArr.length - i < 2) {
            // Last data
            // obj[pathArr[pathArr.length - 1]] = value;
            Vue.set(obj, pathArr[pathArr.length - 1], value);
            break;
        }
        obj = obj[pathArr[i]];
    }
}

export {
    nodePath2ClassName, isRootNodePath, computedCurPath, getPathVal, path2prop, pathSeparator
};

/**
 * Created by Liu.Jun on 2019/11/28 18:37.
 */

import { genId } from 'demo-common/utils/id';


export function deepFreeze(obj) {
    // Retrieve property names defined on obj
    const propNames = Object.getOwnPropertyNames(obj);

    // Freeze properties before freezing self
    propNames.forEach((name) => {
        const prop = obj[name];

        // If prop is an object, freeze it
        if (typeof prop === 'object' && prop !== null) deepFreeze(prop);
    });

    // Freeze itself (no-op if already frozen)
    return Object.freeze(obj);
}

// Initialize config data and return all components
export function getComponentsAndInitToolsConfig(configTools) {
    // Flatten all groups
    const componentList = configTools.reduce((preVal, curVal) => [
        ...preVal,
        ...curVal.componentList
    ], []);

    // Register component structure
    const data = componentList.reduce((preVal, { name: configItemName, componentPack }) => {
        // Modify original datay original data
        // Generate Form component and View component Name
        const needViewName = !componentPack.componentViewName;
        const needFormName = componentPack.Form && !componentPack.componentFormName;

        // Need to generate viewName or formName
        if (needViewName || needFormName) {
            const id = configItemName || genId();
            if (needViewName) componentPack.componentViewName = `View${id}`;
            if (needFormName) componentPack.componentFormName = `Form${id}`;
        }

        if (componentPack.componentFormName) {
            preVal[componentPack.componentFormName] = componentPack.Form;
        }
        preVal[componentPack.componentViewName] = componentPack.View;

        Object.freeze(componentPack);
        return preVal;
    }, {});


    // Freeze config data
    Object.freeze(configTools);
    return data;
}

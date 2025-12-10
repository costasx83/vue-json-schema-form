/**
 * Created by Liu.Jun on 2020/3/31 11:30 AM.
 */

import { getDefaultFormState } from '@lljj/vue-json-schema-form';
import { genId } from 'demo-common/utils/id';

function isEmptyObject(obj) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

// Generate a new editor item
export function generateEditorItem(toolItem) {
    const currentComponentPack = toolItem.componentPack;

    const componentValue = (
        currentComponentPack.propsSchema
        && (!toolItem.componentValue || isEmptyObject(toolItem.componentValue))
    )
        ? getDefaultFormState(
            currentComponentPack.propsSchema,
            {}, // Initial value is empty
            currentComponentPack.propsSchema
        )
        : toolItem.componentValue || {};

    return {
        ...toolItem,
        isEdit: false,
        toolBar: {
            moveDownDisabled: false,
            moveUpDisabled: false,
            copyDisabled: false,
            removeDisabled: false,
        },
        componentValue,
        componentViewName: currentComponentPack.componentViewName,
        componentFormName: currentComponentPack.componentFormName,
        // id: `${currentComponentPack.componentViewName}_${+new Date()}`,
        id: genId(),
    };
}

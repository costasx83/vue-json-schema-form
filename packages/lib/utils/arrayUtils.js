/**
 * Created by Liu.Jun on 2020/4/25 10:53.
 */

// Move up by index
export function moveUpAt(target, index) {
    if (index === 0) return false;
    const item = target[index];
    const newItems = [item, target[index - 1]];
    return target.splice(index - 1, 2, ...newItems);
}

// Move down by index
export function moveDownAt(target, index) {
    if (index === target.length - 1) return false;
    const item = target[index];
    const newItems = [target[index + 1], item];
    return target.splice(index, 2, ...newItems);
}

// Remove
export function removeAt(target, index) {
    // Remove element at specified position in array, return boolean indicating success
    return !!target.splice(index, 1).length;
}

// Fill array with objects
export function fillObj(target, data) {
    // Simple copy, throw error on exception
    try {
        if (typeof data === 'object') {
            return target.fill(null).map(() => JSON.parse(JSON.stringify(data)));
        }
    } catch (e) {
        // nothing ...
    }

    // Default return undefined
    return undefined;
}

// Split into multiple arrays
export function cutOff(target, cutOffPointIndex) {
    return target.reduce((preVal, curVal, curIndex) => {
        preVal[curIndex > cutOffPointIndex ? 1 : 0].push(curVal);
        return preVal;
    }, [[], []]);
}

// Array intersection
export function intersection(arr1, arr2) {
    return arr1.filter(item => arr2.includes(item));
}

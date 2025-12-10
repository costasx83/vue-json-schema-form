/**
 * Created by Liu.Jun on 2020/3/28 10:02 AM.
 */

function merge(target, other) {
    target.push(...other);
}

function ensure(target, item) {
    // Only add element if it doesn't exist in current array
    if (target.indexOf(item) === -1) {
        target.push(item);
    }
    return target;
}

function removeAt(target, index) {
    // Remove element at specified position in array, returns boolean indicating success
    return !!target.splice(index, 1).length;
}

// Remove
function remove(target, item) {
    // Remove first element matching parameter in array, returns boolean indicating success
    const index = target.indexOf(item);
    if (~index) {
        return removeAt(target, index);
    }
    return false;
}

function toMap(target, key) {
    return target.reduce((preVal, curVal) => {
        preVal[curVal[key]] = curVal;
        return preVal;
    }, {});
}

// Check if first element
function isFirst(target, item) {
    return target.indexOf(item) === 0;
}

// Check if last element
function isLast(target, item) {
    return target.indexOf(item) === target.length - 1;
}

// Move up by index
function moveUpAt(target, index) {
    if (index === 0) return false;
    const item = target[index];
    const newItems = [item, target[index - 1]];
    return target.splice(index - 1, 2, ...newItems);
}

// Move up
function moveUp(target, item) {
    if (isFirst(target, item)) {
        // Cannot move
        return false;
    }

    const index = target.indexOf(item);

    const newItems = [item, target[index - 1]];
    return target.splice(index - 1, 2, ...newItems);
}

// Move down by index
function moveDownAt(target, index) {
    if (index === target.length - 1) return false;
    const item = target[index];
    const newItems = [target[index + 1], item];
    return target.splice(index, 2, ...newItems);
}

// Move down
function moveDown(target, item) {
    if (isLast(target, item)) {
        // Cannot move
        return false;
    }

    const index = target.indexOf(item);

    const newItems = [target[index + 1], item];
    return target.splice(index, 2, ...newItems);
}

// Copy
// function insert(target, items, index) {
//     return target.splice(index + 1, 0, ...items);
// }

export {
    merge,
    ensure,
    removeAt,
    remove,
    toMap,
    isFirst,
    isLast,
    moveDown,
    moveDownAt,
    moveUp,
    moveUpAt,
};

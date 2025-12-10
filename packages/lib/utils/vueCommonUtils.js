// 内部使用 . ，配置数据key不能出现.
export const pathSeparator = '.';

// Convert nodePath to css class name
export function nodePath2ClassName(path) {
    const rootPathName = '__pathRoot';
    return path ? `${rootPathName}.${path}`.replace(/\./g, '_') : rootPathName;
}

// Is root node
export function isRootNodePath(path) {
    return path === '';
}

// Calculate current node path
export function computedCurPath(prePath, curKey) {
    return prePath === '' ? curKey : [prePath, curKey].join(pathSeparator);
}

// Get current path value
export function getPathVal(obj, path, leftDeviation = 0) {
    const pathArr = path.split(pathSeparator);

    for (let i = 0; i < pathArr.length - leftDeviation; i += 1) {
        // Error path or undefined interrupts search
        if (obj === undefined) return undefined;
        obj = pathArr[i] === '' ? obj : obj[pathArr[i]];
    }
    return obj;
}

// Path equals props
export function path2prop(path) {
    return path;
}

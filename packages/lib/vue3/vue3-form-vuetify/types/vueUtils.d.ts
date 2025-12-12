declare namespace vueUtils {

    /** Convert nodePath to css class name */
    function nodePath2ClassName(path: string): string;

    /** Whether it is a root node */
    function isRootNodePath(path: string): boolean;

    /** Calculate current node path */
    function computedCurPath(prePath: string, curKey: string): string;

    /** Calculate current node name */
    function deletePathVal(vueData: object, name: string): void;

    /** Set current path value */
    function setPathVal(vueData: object, path: string, value: any): void;

    /** Set current path value */
    function getPathVal(vueData: object, path: string): object;

    /** Set current path value */
    function path2prop(path: string): string;
}

export default vueUtils;

// Vue 3 compatible emitter using getCurrentInstance
// Since $parent, $children, $on, $emit (instance event bus) are removed in Vue 3,
// we use provide/inject pattern or getCurrentInstance for parent access

import { getCurrentInstance } from 'vue';

export default {
    data() {
        return {
            instance: null
        };
    },
    mounted() {
        // Store instance reference during lifecycle hook
        this.instance = getCurrentInstance();
    },
    methods: {
        dispatch(componentName, eventName, params) {
            // Use stored instance to get parent components
            let parent = this.instance?.parent;

            while (parent && parent.type.name !== componentName) {
                parent = parent.parent;
            }

            if (parent && parent.exposed && typeof parent.exposed[eventName] === 'function') {
                parent.exposed[eventName](params);
            } else if (parent && parent.proxy) {
                // Fallback to emitting events on the component
                parent.proxy.$emit(eventName, params);
            }
        },
        broadcast(componentName, eventName, params) {
            // Broadcasting is deprecated in Vue 3
            // This is a simplified version that doesn't work exactly like Vue 2
            console.warn('broadcast is deprecated in Vue 3. Use provide/inject or props/events instead.');
        }
    }
};

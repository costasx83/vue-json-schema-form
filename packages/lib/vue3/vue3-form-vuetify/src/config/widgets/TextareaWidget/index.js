import { h, resolveComponent } from 'vue';

export default {
    name: 'TextareaWidget',
    setup(props, { attrs, slots }) {
        return () => h(resolveComponent('v-textarea'), {
            // props,
            ...attrs,
        }, slots);
    }
};

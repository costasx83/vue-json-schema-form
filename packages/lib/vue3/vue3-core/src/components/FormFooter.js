/**
 * Created by Liu.Jun on 2020/12/27 9:53 PM.
 */

import { h } from 'vue';

import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';

export default {
    name: 'FormFooter',
    props: {
        okBtn: {
            type: String,
            default: 'OK'
        },
        okBtnProps: {
            type: Object,
            default: () => ({})
        },
        cancelBtn: {
            type: String,
            default: 'Cancel'
        },
        formItemAttrs: {
            type: Object,
            default: () => ({})
        },
        globalOptions: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ['cancel', 'submit'],
    setup(props, { emit }) {
        // globalOptions does not need to be reactive
        const { globalOptions: { COMPONENT_MAP } } = props;

        return () => h(resolveComponent(COMPONENT_MAP.formItem), {
            class: {
                formFooter_item: true
            },
            ...props.formItemAttrs
        }, {
            default: () => [
                h(resolveComponent(COMPONENT_MAP.button), {
                    onClick() {
                        emit('cancel');
                    }
                }, {
                    default: () => props.cancelBtn
                }),
                h(resolveComponent(COMPONENT_MAP.button), {
                    style: {
                        marginLeft: '10px'
                    },
                    type: 'primary',
                    onClick() {
                        emit('submit');
                    },
                    ...props.okBtnProps
                }, {
                    default: () => props.okBtn
                })
            ]
        });
    }
};

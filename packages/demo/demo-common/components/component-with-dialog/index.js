/**
 * Created by Liu.Jun on 2019/12/30 16:53.
 * Display a component via API in dialog form
 * For reactive parameters componentProps and dialogProps, pass by reference
 * Example
 componentWithDialog({
        VueComponent: {
            template: '<div>xxxx</div>'
        },
        dialogProps: this.dialogProps
    });
 */

import Vue from 'vue';

export default ({
    VueComponent = null,
    injectionOptions = {},
    dialogProps = {},
    dialogListeners = {},
    componentProps = {},
    componentListeners = {}
} = {}) => {
    if (!VueComponent) {
        throw new Error('Required parameter: vueComponent');
    }

    // Test reactive data capability
    // const DialogConstructor = Vue.extend(Dialog);
    // const instance = new DialogConstructor({
    //     el: document.createElement('div')
    // });
    // const h = vm.$createElement;
    // const vMessage = h('div', [
    //     h('p', vm.dialogProps.title),
    // ]);
    // instance.$slots.default = [vMessage];
    // document.body.appendChild(instance.$el);
    // Vue.nextTick(() => {
    //     instance.visible = true;
    // });

    const genDefaultDialogProps = () => ({
        title: 'Dialog Title',
        closeOnClickModal: true,
        width: '800px'
    });

    const DialogComponentConstructor = Vue.extend({
        name: 'DialogComponentConstructor',
        components: {
            VueComponent
        },
        data() {
            return {
                componentListeners,
                curDialogListeners: {
                    ...dialogListeners,
                    closed: (...args) => {
                        // Execute passed-in method first
                        if (dialogListeners.closed) {
                            dialogListeners.closed.apply(null, args);
                        }

                        // Release dialog
                        this.handleClosed();
                    }
                },
                visible: false
            };
        },
        computed: {
            componentProps() {
                return componentProps;
            },
            curDialogProps() {
                return Object.assign(genDefaultDialogProps(), dialogProps);
            },
        },
        created() {
            this.hashChangeFn = () => {
                this.handleClosed();
            };

            // hashChange, components injected separately need manual destruction
            window.addEventListener('hashchange', this.hashChangeFn, false);
        },
        beforeDestroy() {
            console.log('DialogComponent beforeDestroy');
        },
        methods: {
            show() {
                this.visible = true;
            },
            close() {
                this.visible = false;
            },
            handleClosed() {
                window.removeEventListener('hashchange', this.hashChangeFn);
                this.$destroy();
                this.$el.parentElement.removeChild(this.$el);
            }
        },
        render(h) {
            const self = this;
            return h('el-dialog', {
                on: {
                    ...this.curDialogListeners,
                    'update:visible': function update(val) {
                        self.visible = val;
                    }
                },
                props: {
                    visible: this.visible,
                    ...this.curDialogProps,
                },
            }, [
                h(VueComponent, {
                    on: this.componentListeners,
                    props: this.componentProps,
                })
            ]);
        },
    });

    const componentDialog = (new DialogComponentConstructor({
        ...injectionOptions,
    })).$mount();
    document.body.appendChild(componentDialog.$el);

    componentDialog.$nextTick(() => {
        componentDialog.show();
    });

    return componentDialog;
};

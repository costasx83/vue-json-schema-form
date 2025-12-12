/**
 * Created by Liu.Jun on 2020/7/25 11:25.
 */
import { h } from 'vue';

export default {
    txt: {
        'ui:options': {
            renderScopedSlots() {
                return {
                    append: () => h('span', '.com')
                };
            },
            widgetListeners: {
                input(event) {
                    console.log('ui input', event);
                }
            },
            renderChildren() {
                return [
                    h('span', 'Suffix')
                ];
            },
            getWidget(widgetVm) {
                console.log(widgetVm);
            },
            onChange(data) {
                console.log('change:', data);
            }
        }
    }
};

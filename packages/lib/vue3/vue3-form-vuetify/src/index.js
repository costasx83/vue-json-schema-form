/**
 * Created by Costas Xyloyiannis on 2025/12/10
 */


import {
    h, ref, onMounted, defineComponent
} from 'vue';

import createVue3Core, { fieldProps, SchemaField } from '@lljj/vue3-form-core';


import i18n from '@lljj/vjsf-utils/i18n';
import * as vueUtils from '@lljj/vjsf-utils/vue3Utils';
import * as formUtils from '@lljj/vjsf-utils/formUtils';
import * as schemaValidate from '@lljj/vjsf-utils/schema/validate';
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import WIDGET_MAP from './config/widgets/WIDGET_MAP.js';

import './style.css';

const globalOptions = {
    WIDGET_MAP,
    COMPONENT_MAP: {
        form: defineComponent({
            inheritAttrs: false,
            setup(props, { attrs, slots }) {
                const formRef = ref(null);
                if (attrs.setFormRef) {
                    onMounted(() => {
                        attrs.setFormRef(formRef.value);
                    });
                }

                return () => {
                    // eslint-disable-next-line no-unused-vars
                    const { setFormRef, ...otherAttrs } = attrs;

                    return h(vueUtils.resolveComponent('v-form'), {
                        ref: formRef,
                        ...otherAttrs
                    }, slots);
                };
            }
        }),
        formItem: 'v-col',
        button: 'v-btn',
        popover: 'v-tooltip'
    },
    HELPERS: {
        // Whether to display description in mini mode
        isMiniDes(formProps) {
            return formProps && ['left', 'right'].includes(formProps.labelPosition);
        }
    }
};

const JsonSchemaForm = createVue3Core(globalOptions);

export default JsonSchemaForm;

export {
    globalOptions,
    SchemaField,
    getDefaultFormState,
    fieldProps,
    vueUtils,
    formUtils,
    schemaValidate,
    i18n
};

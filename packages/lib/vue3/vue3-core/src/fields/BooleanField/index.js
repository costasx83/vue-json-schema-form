/**
 * Created by Liu.Jun on 2020/4/23 10:50.
 */

import { h } from 'vue';
import { getWidgetConfig, optionsList } from '@lljj/vjsf-utils/formUtils';

import Widget from '../../components/Widget';
import vueProps from '../props';

export default {
    name: 'BooleanField',
    props: vueProps,
    setup(props, { attrs }) {
        return () => {
            const {
                schema, uiSchema, curNodePath, rootFormData, globalOptions
            } = props;

            // Bool will pass in enum type options true false by default
            const enumOptions = optionsList({
                enumNames: schema.enumNames || ['true', 'false'],
                enum: schema.enum || [true, false]
            }, uiSchema, curNodePath, rootFormData);

            const widgetConfig = getWidgetConfig({
                schema,
                uiSchema,
                curNodePath,
                rootFormData
            }, () => ({
                widget: globalOptions.WIDGET_MAP.types.boolean
            }));

            widgetConfig.uiProps.enumOptions = widgetConfig.uiProps.enumOptions || enumOptions;

            return h(
                Widget,
                {
                    ...attrs,
                    ...props,
                    ...widgetConfig
                }
            );
        };
    }
};

/**
 * Created by Liu.Jun on 2020/4/20 9:55 PM.
 */

import { h } from 'vue';

import { getUiField, isHiddenWidget, isSelect } from '@lljj/vjsf-utils/formUtils';
import { nodePath2ClassName, resolveComponent } from '@lljj/vjsf-utils/vue3Utils';
import { lowerCase } from '@lljj/vjsf-utils/utils';
import retrieveSchema from '@lljj/vjsf-utils/schema/retriev';

import FIELDS_MAP from '../../FIELDS_MAP';
import vueProps from '../props';

export default {
    name: 'SchemaField',
    props: vueProps,
    setup(props) {
        return () => {
            // Currently does not support schema dependencies and additionalProperties display, no need to pass formData
            // const schema = retrieveSchema(props.schema, props.rootSchema, formData);
            const schema = retrieveSchema(props.schema, props.rootSchema);

            // Current parameters
            const curProps = { ...props, schema };

            // Empty data
            if (Object.keys(schema).length === 0) return null;

            // Get node UI configuration to render field component
            const { field: fieldComponent, fieldProps } = getUiField(FIELDS_MAP, curProps);

            // hidden
            const hiddenWidget = isHiddenWidget({
                schema,
                uiSchema: props.uiSchema,
                curNodePath: props.curNodePath,
                rootFormData: props.rootFormData
            });

            const pathClassName = nodePath2ClassName(props.curNodePath);

            if (schema.anyOf && schema.anyOf.length > 0 && !isSelect(schema)) {
                // anyOf
                return h(resolveComponent(FIELDS_MAP.anyOf), {
                    class: {
                        [`${pathClassName}-anyOf`]: true,
                        fieldItem: true,
                        anyOfField: true
                    },
                    ...curProps
                });
            } if (schema.oneOf && schema.oneOf.length > 0 && !isSelect(schema)) {
                // oneOf
                return h(resolveComponent(FIELDS_MAP.oneOf), {
                    class: {
                        [`${pathClassName}-oneOf`]: true,
                        fieldItem: true,
                        oneOfField: true
                    },
                    ...curProps
                });
            }

            return (fieldComponent && !hiddenWidget) ? h(resolveComponent(fieldComponent), {
                ...curProps,
                fieldProps,
                class: {
                    [lowerCase(fieldComponent.name) || fieldComponent]: true,
                    hiddenWidget,
                    fieldItem: true,
                    [pathClassName]: true
                }
            }) : null;
        };
    }
};

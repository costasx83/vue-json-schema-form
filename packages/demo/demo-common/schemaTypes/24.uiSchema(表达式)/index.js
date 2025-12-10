/**
 * Created by Liu.Jun on 2020/7/22 11:07 PM.
 */

export default {
    schema: {
        title: 'uiSchema Expression Configuration',
        type: 'object',
        description: '<ui><li><b>rootFormData</b>: Root node value</li><li><b>parentFormData</b>: Current parent node value</li></ui>',
        properties: {
            age: {
                type: 'integer',
                title: 'Enter Age',
                maximum: 80,
                minimum: 16,
                'ui:title': '{{ parentFormData.age > 18 ? "Haha" : "Hehe" }}',
            },
            bio: {
                type: 'string',
                title: 'Bio',
                minLength: 10,
                'ui:type': '{{ parentFormData.bio && parentFormData.bio.length ?  "textarea" : undefined }}'
            },
            selectWidgetOptions: {
                title: 'Custom select widget with options',
                type: 'string',
                // eslint-disable-next-line max-len
                'ui:style': '{{ parentFormData.selectWidgetOptions === "foo"  ?  { boxShadow: "0 0 6px 2px pink"} : { boxShadow: "0 0 6px 2px red"} }}',
                'ui:title': '{{ parentFormData.a === "1" ? "Haha" : "Hehe" }}',
                enum: [
                    'foo',
                    'bar'
                ],
                enumNames: [
                    'Foo',
                    'Bar'
                ]
            }
        }
    },
    formData: {
        a: '111'
    }
};

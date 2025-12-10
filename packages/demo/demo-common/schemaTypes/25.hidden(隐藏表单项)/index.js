/**
 * Created by Liu.Jun on 2020/7/22 11:07 PM.
 */

export default {
    schema: {
        title: 'Hidden Form Items',
        type: 'object',
        description: `
            Hidden form items can use multiple configuration methods, combine as needed
            <br> 1. ui:widget: "hidden"
            <br> 2. ui:widget: "HiddenWidget"
            <br> 3. ui:hidden: true
         `,
        properties: {
            hidden2: {
                title: 'hidden2',
                type: 'string',
                'ui:widget': 'HiddenWidget',
                default: 'hidden2'
            },
            hidden3: {
                title: 'hidden1',
                type: 'string',
                'ui:hidden': true,
                default: 'hidden3'
            }
        }
    }
};

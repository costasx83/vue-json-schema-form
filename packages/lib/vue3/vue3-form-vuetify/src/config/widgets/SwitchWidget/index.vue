<template>
    <v-switch
        :value="value"
        :label="label"
        :color="color"
        v-bind="$attrs"
    >
    </v-switch>
</template>

<script>
export default {
    name: 'SwitchWidget',
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        enumOptions: {
            default: () => [],
            type: [Array]
        },
        value: {
            type: null,
            default: undefined
        },
        title: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        }
    }
};
</script>

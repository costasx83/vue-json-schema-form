<template>
    <v-select
        clearable
        v-bind="$attrs"
        :items="enumOptions"
        item-title="label"
        item-value="value"
    >
    </v-select>
</template>

<script>
export default {
    name: 'SelectWidget',
    props: {
        enumOptions: {
            default: () => [],
            type: [Array]
        }
    }
};
</script>

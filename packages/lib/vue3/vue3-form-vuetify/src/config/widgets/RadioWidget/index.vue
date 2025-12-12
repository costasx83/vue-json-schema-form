<template>
    <v-radio-group
        v-bind="$attrs"
    >
        <v-radio
            v-for="(item, index) in enumOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
        >
        </v-radio>
    </v-radio-group>
</template>

<script>
export default {
    name: 'RadioWidget',
    props: {
        enumOptions: {
            default: () => [],
            type: [Array]
        }
    }
};
</script>

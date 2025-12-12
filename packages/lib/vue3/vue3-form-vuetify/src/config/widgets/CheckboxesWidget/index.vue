<template>
    <v-container fluid>
        <v-checkbox
            v-for="(item, index) in enumOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
        >
        </v-checkbox>
    </v-container>
</template>

<script>
export default {
    name: 'CheckboxesWidget',
    props: {
        enumOptions: {
            default: () => [],
            type: [Array]
        }
    }
};
</script>

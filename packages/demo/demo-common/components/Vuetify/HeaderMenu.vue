<template>
    <v-tabs
        :model-value="modelValue"
        color="primary"
        align-tabs="start"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <!-- <v-tab
            href="https://vue-json-schema-form.lljj.me/"
            style="display: none;"
            value="docs"
        >
            Documentation
        </v-tab>
        -->
        <v-tab
            href="/"
            value="playground"
        >
            Playground
        </v-tab>
        <v-tab
            href="/vue-editor.html#/editor"
            value="activity-editor"
        >
            Activity Editor
        </v-tab>
        <v-tab
            href="/schema-generator.html#/index"
            value="schema-generator"
        >
            Schema Generator
        </v-tab>
    </v-tabs>
</template>

<script>
export default {
    name: 'HeaderMenu',
    props: {
        modelValue: {
            type: String,
            default: undefined
        }
    },
    emits: ['update:modelValue']
};
</script>

<style module>


</style>

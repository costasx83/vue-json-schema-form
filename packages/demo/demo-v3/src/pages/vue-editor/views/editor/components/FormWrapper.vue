<template>
    <div>
        <!-- Custom Form Component -->
        <component
            :is="item.componentFormName"
            v-if="item.componentFormName"
            v-model="localFormData"
            @on-change="handleChange"
            @on-cancel="handleCancel"
            @on-submit="handleSubmit"
        />

        <!-- Schema-generated Form -->
        <VueJsonSchemaForm
            v-else
            ref="schemaForm"
            v-model="localFormData"
            :schema="item.componentPack.propsSchema"
            :ui-schema="item.componentPack.uiSchema"
            :error-schema="item.componentPack.errorSchema"
            :custom-rule="item.componentPack.customRule"
            @change="handleChange"
            @cancel="handleCancel"
            @submit="handleSubmit"
            @validation-failed="handleValidationFailed"
        />
    </div>
</template>

<script>
import VueJsonSchemaForm from '@lljj/vue3-form-vuetify';

export default {
    name: 'FormWrapper',
    components: {
        VueJsonSchemaForm
    },
    inject: ['closeEditForm'],
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    emits: ['data-change', 'save-form'],
    data() {
        return {
            localFormData: null
        };
    },
    created() {
        // Create a deep copy of the component value so changes don't affect parent until Save
        this.localFormData = JSON.parse(JSON.stringify(this.item.componentValue || {}));
    },
    methods: {
        handleChange() {
            // Form data changed
        },
        handleCancel() {
            this.closeEditForm();
        },
        handleSubmit(data) {
            const dataToSave = data || this.localFormData;
            this.$emit('save-form', dataToSave, this.item);
            this.closeEditForm();
        },
        handleValidationFailed() {
            // Validation failed - form stays open
        }
    }
};
</script>

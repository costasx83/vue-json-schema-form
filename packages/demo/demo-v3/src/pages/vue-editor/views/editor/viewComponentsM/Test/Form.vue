<template>
    <v-form
        ref="form"
        v-model="valid"
    >
        <v-text-field
            v-model="formData.txt"
            label="Please configure title"
            density="compact"
            variant="outlined"
        >
        </v-text-field>
        <div style="text-align: right;">
            <v-btn
                variant="text"
                @click="$emit('on-cancel')"
            >
                Cancel
            </v-btn>
            <v-btn
                color="primary"
                @click="onSubmit"
            >
                Save
            </v-btn>
        </div>
    </v-form>
</template>

<script>
export default {
    name: 'JForm',
    props: {
        modelValue: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ['update:modelValue', 'on-change', 'on-cancel', 'on-submit'],
    data() {
        return {
            valid: true,
            // Simple copy data
            formData: this.$props.modelValue ? JSON.parse(JSON.stringify(this.$props.modelValue)) : {}
        };
    },
    watch: {
        formData: {
            deep: true,
            handler(value) {
                this.$emit('update:modelValue', value);
                this.$emit('on-change', value);
            }
        }
    },
    methods: {
        async onSubmit() {
            if (this.valid) {
                this.$emit('on-submit', this.formData);
            }
        }
    }
};
</script>

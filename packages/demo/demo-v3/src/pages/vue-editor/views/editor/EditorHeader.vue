<template>
    <BaseEditorHeader default-active="3">
        <v-select
            v-model="platform"
            :items="platformOptions"
            item-title="label"
            item-value="value"
            placeholder="Please select"
            :class="$style.selectPlatform"
            density="compact"
            variant="outlined"
        ></v-select>
        <v-btn
            icon="mdi-minus"
            :disabled="disabledMinus"
            size="small"
            variant="text"
            @click="handleMinus"
        >
        </v-btn>
        <v-btn
            variant="text"
            size="small"
        >
            {{ value }}%
        </v-btn>
        <v-btn
            icon="mdi-plus"
            :disabled="disabledPlus"
            size="small"
            variant="text"
            @click="handlePlus"
        ></v-btn>
        <v-btn
            variant="outlined"
            @click="$emit('onPreview')"
        >
            Preview
        </v-btn>
        <v-btn
            color="primary"
            variant="outlined"
            @click="$emit('onSave')"
        >
            Save
        </v-btn>
        <v-btn
            color="primary"
            @click="$emit('onPublish')"
        >
            Publish
        </v-btn>
    </BaseEditorHeader>
</template>

<script>
// import BaseEditorHeader from 'demo-common/components/EditorHeader.vue';
import BaseEditorHeader from 'demo-common/components/Vuetify/EditorHeaderVT.vue';

export default {
    name: 'EditorHeader',
    components: {
        BaseEditorHeader
    },
    props: {
        value: {
            type: Number,
            default: 60
        },
        minScale: {
            type: Number,
            default: 40
        },
        stepNum: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            platformOptions: [
                { label: 'PC', value: 'editor' },
                { label: 'M', value: 'editorM' }
            ]
        };
    },
    computed: {
        platform: {
            get() {
                return this.$route.name;
            },
            set(routerName) {
                this.$router.replace({
                    name: routerName
                });
            }
        },
        disabledMinus() {
            return this.value <= this.minScale;
        },
        disabledPlus() {
            return this.value >= 100;
        },
    },
    methods: {
        handlePlus() {
            const curScale = this.value + this.stepNum;
            this.emitUpdateScale(curScale);
        },
        handleMinus() {
            const curScale = this.value - this.stepNum;
            this.emitUpdateScale(curScale);
        },
        emitUpdateScale(curScale) {
            this.$emit('input', curScale);
            this.$emit('onUpdateScale', {
                scale: curScale
            });
        }
    }
};
</script>

<style module>
    @import "demo-common/css/variable.css";
    .box {
        padding: 10px 2%;
        height: auto;
        background: var(--color-white);
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 8px 1px rgba(0,0,0,.3);
    }
    .headerMenu {
        display: flex;
        align-items: center;
        justify-content: center;
        h1 {
            display: none;
            text-shadow: 0 0 40px #409EFF;
            font-size: 26px;
            text-transform: uppercase;
            z-index: 10;
        }
    }
    .selectPlatform {
        width: 100px;
        margin-right: 20px;
    }
</style>

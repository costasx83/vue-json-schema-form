<template>
    <div
        :class="{
            [$style.viewBox]: true,
            [$style.active]: editorItem.isEdit,
            js_viewComponentWrap: true
        }"
        @click="handleClickView"
    >
        <span :class="$style.formProperty"> {{ attrs.curNodePath }}</span>
        <div
            v-if="editorItem.isEdit"
            :class="$style.editBar"
        >
            <button
                :disabled="editorItem.toolBar.moveUpDisabled"
                :class="$style.toolBarBtn"
                title="Move Up"
                type="button"
                @click="$emit('onOperate', { item: editorItem, command: 'moveUp'})"
            >
                <v-icon size="small">mdi-chevron-up</v-icon>
            </button>
            <button
                :disabled="editorItem.toolBar.moveDownDisabled"
                :class="$style.toolBarBtn"
                title="Move Down"
                type="button"
                @click="$emit('onOperate', { item: editorItem, command: 'moveDown'})"
            >
                <v-icon size="small">mdi-chevron-down</v-icon>
            </button>
            <button
                :disabled="editorItem.toolBar.copyDisabled"
                :class="[$style.toolBarBtn]"
                title="Copy"
                type="button"
                @click="$emit('onOperate', { item: editorItem, command: 'copy' })"
            >
                <v-icon size="small">mdi-content-copy</v-icon>
            </button>
            <button
                :disabled="editorItem.toolBar.removeDisabled"
                :class="$style.toolBarBtn"
                title="Remove"
                type="button"
                @click="$emit('onOperate', { item: editorItem, command: 'remove' })"
            >
                <v-icon size="small">mdi-delete</v-icon>
            </button>
        </div>
        <SchemaField
            v-bind="attrs"
        >
        </SchemaField>

        <NestedEditor
            v-if="showNestedEditor(editorItem)"
            :child-component-list="editorItem.childList"
            :drag-options="dragOptions"
            :form-data="formData"
            :form-props="formProps"
            @update:child-component-list="handleUpdateChildList"
        >
        </NestedEditor>
    </div>
</template>

<script>
import { SchemaField, globalOptions } from '@lljj/vue3-form-vuetify';
import emitter from '../../../mixins/emitter.js';
import NestedEditor from './NestedEditor';
import { editorItem2SchemaFieldProps } from '../common/editorData';

export default {
    name: 'ViewComponentWrap',
    components: {
        SchemaField,
        NestedEditor
    },
    mixins: [emitter],
    props: {
        showNestedEditor: {
            type: Function,
            default: () => {}
        },
        editorItem: {
            type: Object,
            default: () => ({})
        },
        dragOptions: {
            type: Object,
            default: () => ({})
        },
        formData: {
            type: Object,
            default: () => ({})
        },
        formProps: {
            type: null,
            default: null
        }
    },
    computed: {
        attrs() {
            // Ensure editorItem has required structure before processing
            if (!this.editorItem?.componentValue || !this.editorItem?.componentPack) {
                console.warn('ViewComponentWrap: editorItem missing required structure', this.editorItem);
                return {
                    formProps: this.formProps,
                    globalOptions,
                    schema: {},
                    rootSchema: {},
                    uiSchema: {},
                    curNodePath: '',
                    rootFormData: this.formData
                };
            }

            return {
                formProps: this.formProps,
                globalOptions,
                ...editorItem2SchemaFieldProps(this.editorItem, this.formData)
            };
        }
    },
    created() {
        console.log('ViewComponentWrap created:', this.editorItem?.id, this.editorItem);
    },
    mounted() {
        console.log('ViewComponentWrap mounted:', this.editorItem?.id);
    },
    updated() {
        console.log('ViewComponentWrap updated:', this.editorItem?.id);
    },
    beforeUnmount() {
        console.log('ViewComponentWrap beforeUnmount:', this.editorItem?.id);
        this.hideEditForm();
    },
    methods: {
        // Click can only open, and can only execute once when in open state
        handleClickView(e) {
            // Prevent browser default event
            e.stopPropagation();
            if (!this.editorItem.isEdit) {
                this.showEditForm();
            } else {
                // Set current selected tab
                this.setCurEditorItem(this.editorItem);
            }
        },

        // Show edit form
        showEditForm() {
            // eslint-disable-next-line vue/no-mutating-props
            this.editorItem.isEdit = true;
            // Register close event only when opening, remove event when closing dialog
            this.closeHandle = (event) => {
                // Clicking sibling view closes itself
                const $el = this.$el;
                const isChildEle = this.$el.contains(event.target);
                const parentWrapEle = event.target.closest('.js_viewComponentWrap');

                // Clicking non-self item closes itself, or clicking own child item closes itself
                if ((!isChildEle && parentWrapEle) || (isChildEle && $el !== parentWrapEle && $el.contains(parentWrapEle))) {
                    this.hideEditForm();
                }
            };

            // Close this when clicking other dialogs
            document.addEventListener('click', this.closeHandle, true);

            this.setCurEditorItem(this.editorItem);
        },
        hideEditForm() {
            // eslint-disable-next-line vue/no-mutating-props
            this.editorItem.isEdit = false;
            document.removeEventListener('click', this.closeHandle, true);
            this.setCurEditorItem(null);
        },

        setCurEditorItem(editorItem) {
            this.dispatch('Editor', 'onSetCurEditorItem', {
                editorItem
            });
        },

        handleUpdateChildList(newList) {
            // eslint-disable-next-line vue/no-mutating-props
            this.editorItem.childList = newList;
        }
    }
};
</script>

<style module>
    @import "demo-common/css/variable.css";
    .viewBox {
        position: relative;
        margin-bottom: 10px;
        padding: 30px 10px 10px;
        cursor: move;
        outline: none;
        border: 1px dashed #bbb;
        overflow: hidden;
        background-color: #ffffff;
        @nest :global .draggableSlot :local & {
            cursor: no-drop;
        }
        &:after {
            pointer-events: none;
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            transition: box-shadow 0.3s ease;
            z-index: 2;
        }

        &.active {
            border: 1px dashed transparent;
            &:after {
                box-shadow: 0 0 2px 1px var(--color-primary) inset;
            }
        }
    }
    .formProperty {
        position: absolute;
        padding: 10px;
        top: 0;
        right: 0;
        font-size: 13px;
    }

    .editBar {
        position: absolute;
        bottom: 0;
        right: 0;
        height: 26px;
        border-top-left-radius: 8px;
        background: var(--color-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        &> .toolBarBtn {
            -webkit-appearance: none;
            appearance: none;
            padding: 0;
            margin: 0;
            outline: none;
            border: none;
            cursor: pointer;
            display: block;
            width: 26px;
            line-height: 30px;
            text-align: center;
            background-color: transparent;
            font-size: 16px;
            color: #ffffff;
            &[disabled] {
                display: none;
            }
            &:hover {
                opacity: 0.6;
            }
        }
    }
</style>

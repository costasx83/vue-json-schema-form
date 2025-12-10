<template>
    <el-popover
        ref="popover"
        v-model="editorItem.isEdit"
        :visible-arrow="false"
        :popper-class="$style.editFormpopper"
        placement="right-start"
        :disabled="isPreview"
        width="400"
        class="js_viewComponentWrap viewComponentWrap"
        style="display: block;"
        transition="none"
        trigger="manual"
    >
        <!-- isEdit, force lazy loading form, create new instance each time -->
        <div
            v-if="editorItem.isEdit"
            :class="$style.formBox"
        >
            <div :class="$style.editBar">
                <button
                    :disabled="editorItem.toolBar.moveUpDisabled"
                    :class="$style.toolBarBtn"
                    class="el-icon-caret-top"
                    title="Move Up"
                    @click="$emit('onOperate', { item: editorItem, command: 'moveUp'})"
                ></button>
                <button
                    :disabled="editorItem.toolBar.moveDownDisabled"
                    :class="$style.toolBarBtn"
                    class="el-icon-caret-bottom"
                    title="Move Down"
                    @click="$emit('onOperate', { item: editorItem, command: 'moveDown'})"
                ></button>
                <button
                    :disabled="editorItem.toolBar.copyDisabled"
                    :class="[$style.topLine, $style.toolBarBtn]"
                    class="el-icon-copy-document"
                    title="Copy"
                    @click="$emit('onOperate', { item: editorItem, command: 'copy' })"
                ></button>
                <button
                    :disabled="editorItem.toolBar.removeDisabled"
                    :class="$style.toolBarBtn"
                    class="el-icon-delete"
                    title="Remove"
                    @click="$emit('onOperate', { item: editorItem, command: 'remove' })"
                ></button>
            </div>
            <div :class="$style.editForm">
                <h4 :class="$style.formTitle">
                    {{ editorItem.title }}
                    <i
                        :class="$style.close"
                        class="el-icon-close"
                        @click="hideEditForm"
                    ></i>
                </h4>
                <div :class="$style.form">
                    <slot
                        name="componentForm"
                    ></slot>
                </div>
            </div>
        </div>
        <div
            slot="reference"
            :class="{
                [$style.viewBox]: true,
                [$style.active]: editorItem.isEdit,
                js_viewComponentBox: true,
                vueEditor_viewComponentBox: true,
            }"
            :style="{
                width: editorItem.viewWidth || '1190px'
            }"
            @click="handelClickView"
        >
            <slot name="componentView"></slot>
        </div>
    </el-popover>
</template>

<script>
export default {
    name: 'ViewComponentWrap',
    props: {
        isPreview: {
            type: Boolean,
            default: false
        },
        editorItem: {
            type: Object,
            default: () => ({})
        }
    },
    beforeDestroy() {
        this.hideEditForm();
    },
    methods: {
        // Click can only open, and can only execute once when in open state
        handelClickView(e) {
            if (!this.isPreview) {
                // Prevent browser default event
                e.preventDefault();
            }
            if (!this.editorItem.isEdit) this.showEditForm();
        },

        // Show edit form
        showEditForm() {
            this.editorItem.isEdit = true;
            // Register close event only when opening, remove event when closing dialog
            this.closeHandle = (event) => {
                // Clicking sibling view closes itself
                if (!this.$el.contains(event.target) && event.target.closest('.js_viewComponentWrap')) {
                    this.hideEditForm();
                }
            };

            // Close this when clicking other dialogs
            document.addEventListener('click', this.closeHandle, false);
        },
        hideEditForm() {
            this.editorItem.isEdit = false;
            document.removeEventListener('click', this.closeHandle);
        }
    }
};
</script>

<style module>
    @import "demo-common/css/variable.css";
    .viewBox {
        /*width: 1190px;*/
        margin: 0 auto;
        position: relative;
        cursor: move;
        box-shadow: 0 0 2px 0 rgba(0,0,0,.25);
        outline: none;
        overflow: hidden;
        @nest :global .draggableSlot :local & {
            cursor: no-drop;
        }
        &>div {
            /*pointer-events: none;*/
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
        &:hover {
            &:after {
                box-shadow: 0 0 6px 1px color(var(--color-primary) a(0.7)) inset;
            }
        }

        &.active {
            &:after {
                box-shadow: 0 0 8px 3px var(--color-primary) inset;
            }
        }
    }

    .formBox {
        position: relative;
        width: 392px;
        display: flex;
        justify-content: space-between;
        &>div {
            box-shadow: 0 1px 6px 0 color(var(--color-black) a(0.25));
        }
    }
    :global .el-popper[x-placement^=left] {
        :local .formBox {
            flex-direction: row-reverse;
        }
    }
    .editBar {
        width: 26px;
        height: 121px;
        background: var(--color-white);
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
            height: 30px;
            line-height: 30px;
            text-align: center;
            background-color: var(--color-white);
            &:hover {
                opacity: 0.6;
            }
            &.topLine {
                border-top: 1px solid color(var(--color-black) a(0.08));
            }
            &[disabled] {
                color: #999999;
                opacity: 0.3 !important;
                cursor: not-allowed;
            }
        }
    }
    .editForm {
        width: 350px;
        overflow: auto;
        padding: 0 14px;
        background: var(--color-white);
    }
    .formTitle {
        position: relative;
        padding: 15px 0;
        line-height: 18px;
        border-bottom: 1px solid color(var(--color-black) a(0.08));
        font-weight: bold;
    }
    .form {
        padding: 10px 0;
        max-height: calc(100vh - 200px);
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }
    .close {
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        position: absolute;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        color: #999999;
        cursor: pointer;
        font-size: 18px;
    }

    .editFormpopper {
        width: 392px !important;
        padding: 0;
        background: transparent;
        border: none;
        box-shadow: none;
    }
</style>

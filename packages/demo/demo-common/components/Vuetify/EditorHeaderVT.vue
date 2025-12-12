<template>
    <v-app-bar
        :class="$style.box"
        color="white"
        elevation="4"
        app
    >
        <div :class="$style.headerMenuBox">
            <h1>
                <a
                    :class="$style.menuLink"
                    href="https://vue-json-schema-form.lljj.me/"
                >
                    <img
                        :class="$style.logo"
                        src="https://vue-json-schema-form.lljj.me/logo.png"
                        alt="Vue JSON Schema Form"
                    >
                </a>
            </h1>
            <HeaderMenu
                :class="$style.menu"
                :version="version"
                :model-value="modelValue"
                v-bind="$attrs"
                @update:model-value="$emit('update:modelValue', $event)"
            ></HeaderMenu>
        </div>
        <v-spacer></v-spacer>
        <div :class="$style.btns">
            <slot></slot>
        </div>
    </v-app-bar>
</template>

<script>
import HeaderMenu from './HeaderMenu.vue';

export default {
    name: 'EditorHeaderVT',
    components: {
        HeaderMenu
    },
    props: {
        version: {
            default: 'vue3',
            type: String
        },
        showVersion: {
            default: false,
            type: Boolean
        },
        modelValue: {
            type: String,
            default: undefined
        }
    },
    emits: ['update:modelValue']
};
</script>

<style module>
    @import "../../css/variable.css";
    .btns {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    .box {
        padding: 0 2% !important;
    }
    .headerMenuBox {
        display: flex;
        align-items: center;
        justify-content: center;
        h1 {
            text-shadow: 0 0 40px #409EFF;
            font-size: 26px;
            text-transform: uppercase;
            z-index: 10;
            margin: 0;
        }
        .logo {
            display: block;
            height: 25px;
        }
    }
    .menu {
        margin-left: 40px;
    }
</style>

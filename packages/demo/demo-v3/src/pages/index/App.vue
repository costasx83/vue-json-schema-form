<template>
    <v-app>
        <v-main>
            <router-view></router-view>
        </v-main>
        <footer :class="$style.footer">
            <a href="https://github.com/lljj-x/vue-json-schema-form">vue-json-schema-form</a>
        </footer>
    </v-app>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style module>
    .footer {
        font-size: 14px;
        padding: 10px 0;
        text-align: center;
    }
</style>

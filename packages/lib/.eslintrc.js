module.exports = {
    root: true,
    env: {
        browser: true,
        worker: true,
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        sourceType: 'module',
        requireConfigFile: false
    },
    plugins: ['vue'],
    extends: [
        '@lljj/eslint-config',
        '@lljj/eslint-config/vue'
    ],
    rules: {
        // 递归组件导致了循环依赖
        'import/no-cycle': 'off',
        'no-unused-vars': 'off',
        'vue/multi-word-component-names': 'off',
    },
    globals: {
        self: true
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
            }
        }
    ]
};

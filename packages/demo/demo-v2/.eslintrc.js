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
        // Recursive components cause circular dependencies
        'import/no-cycle': 'off',
        'no-unused-vars': 'off',
        'vue/no-unused-vars': 'off',
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

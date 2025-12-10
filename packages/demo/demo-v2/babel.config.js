module.exports = {
    plugins: [
        '@babel/plugin-transform-optional-chaining',
        '@babel/plugin-transform-nullish-coalescing-operator'
        // '@babel/plugin-proposal-export-default-from'
    ],
    presets: [
        [
            '@lljj/babel-preset-app',
            {
                useBuiltIns: false,
                regenerator: true,
                helpers: true
            }
        ]
    ]
};

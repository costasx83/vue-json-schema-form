/**
 * Created by Liu.Jun on 2019/10/25 15:42.
 */

const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const chalk = require('chalk');

const log = require('./scripts/log');
const envConfig = require('./scripts/envConfig').getConfig();

const {
    entries,
    openPage
} = require('./scripts/entry.js')({
    chunks: ['user-runtime', 'user-vendors-polyfill']
});

log({
    data: chalk.green(openPage),
    des: 'openPage'
});

log({
    data: Object.entries(entries).map(([key, value]) => ({
        [key]: value.entry
    })),
    des: 'entry'
});

const isProduction = process.env.NODE_ENV === 'production';

// config var
const outputDir = isProduction ? path.resolve(__dirname, '../demo-v2/dist/v3') : path.resolve(__dirname, './dist');

module.exports = {
    // cdn
    publicPath: isProduction ? '/v3' : '/',

    // Assets directory
    outputDir,

    assetsDir: 'static',

    filenameHashing: true,

    pages: entries,

    lintOnSave: true,

    runtimeCompiler: true,

    transpileDependencies: [],

    productionSourceMap: false,

    configureWebpack: (config) => {
        config.mode = process.env.NODE_ENV;
        config.devtool = 'source-map';
        config.externals = {
            vue: 'Vue',
            ElementPlus: 'ElementPlus',
            VueRouter: 'VueRouter',
        };
        config.resolve.alias = {
            ...config.resolve.alias,
        };
    },

    // webpack chain API for generating and modifying webpack config
    // https://github.com/mozilla-neutrino/webpack-chain
    chainWebpack: (config) => {
        // Add runtime
        config.optimization.runtimeChunk({
            name: 'user-runtime'
        });

        // Specify file extraction
        const splitConfig = {
            cacheGroups: {
                vendors: {
                    name: 'user-vendors-polyfill',
                    chunks: 'initial',
                    priority: 12,
                    test: module => /[\\/]node_modules[\\/]/.test(module.context) || /components\\ElementUi/.test(module.context),
                },
                asyncVendor: {
                    name: 'chunk-vendors-async',
                    chunks: 'async',
                    priority: 8,
                    minChunks: 5,
                }
            }
        };

        config.optimization.splitChunks(splitConfig);

        // JS filename adjustment
        if (isProduction) {
            // Asset manifest
            config.plugin('manifest').use(WebpackManifestPlugin, [{
                fileName: 'manifest.json',
                filter: (file) => {
                    const ext = path.extname(file.name);
                    const includeExts = ['.js', '.css'];
                    return includeExts.includes(ext) && !file.name.includes('chunk-');
                }
            }]);
        }

        // report
        if (envConfig.report) {
            // eslint-disable-next-line global-require
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
            config.plugin('bundle-analyzer').use(BundleAnalyzerPlugin);
        }

        // Remove prefetch plugin
        Object.keys(entries).forEach((item) => {
            config.plugins.delete(`prefetch-${item}`);
        });
    },

    css: {
        sourceMap: !isProduction,
        extract: isProduction,
        loaderOptions: {
            postcss: {
                // exclude: /(node_modules\/ant-design-vue)/,
            }
        }
    },

    // All options for webpack-dev-server are supported
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        client: {
            logging: 'info',
            overlay: {
                warnings: false,
                errors: true
            }
        },
        open: [openPage],
        port: 8800,
        host: 'localhost',
        proxy: {
            '/api-dev': {
                target: 'http://www.api.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api-dev': ''
                }
            }
        }
    },

    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},

    // Third-party plugin config
    pluginOptions: {}
};

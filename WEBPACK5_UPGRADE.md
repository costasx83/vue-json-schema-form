# Webpack 5 Upgrade Summary

This document summarizes the changes made to upgrade the vue-json-schema-form project to Webpack 5.

## Overview

All demo projects (demo-v2 and demo-v3) have been upgraded from Vue CLI 4 (Webpack 4) to Vue CLI 5 (Webpack 5).

## Changes Made

### 1. Package Updates

#### Vue CLI & Plugins
- **@vue/cli-service**: `~4.5.0` → `~5.0.0`
- **@vue/cli-plugin-babel**: `~4.5.0` → `~5.0.0`
- **@vue/cli-plugin-eslint**: `~4.5.0` → `~5.0.0`

#### Webpack Plugins
- **copy-webpack-plugin**: `^5.0.4` → `^11.0.0`
- **webpack-bundle-analyzer**: `^3.6.0` → `^4.10.0`
- **webpack-manifest-plugin**: `^2.2.0` → `^5.0.0`

#### ESLint
- **babel-eslint** (removed) → **@babel/eslint-parser**: `^7.23.0`
- **eslint**: `^5.16.0` → `^8.56.0`
- **eslint-plugin-import**: `^2.20.2` → `^2.29.0`
- **eslint-plugin-vue**: `^5.0.0` (Vue 2) / → `^9.19.0` (unified)

#### PostCSS
- **postcss**: Added `^8.4.32` (required for Webpack 5)
- **postcss-import**: `^12.0.1` → `^15.1.0`
- **postcss-nested**: `^4.1.0` → `^6.0.1`
- **autoprefixer**: Added `^10.4.16`
- **postcss-cssnext**: Removed (deprecated)
- **postcss-color-mod-function**: Removed (deprecated)
- **postcss-mixins**: Removed (not needed)

#### Other
- **yargs**: `^6.6.0` → `^17.7.0`
- **vue-router**: Added `^4.0.0` to demo-v3 dependencies

### 2. Configuration File Changes

#### vue.config.js (both demo-v2 and demo-v3)

**ManifestPlugin Import:**
```javascript
// Old
const ManifestPlugin = require('webpack-manifest-plugin');

// New
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
```

**ManifestPlugin Usage:**
```javascript
// Old
config.plugin('manifest').use(ManifestPlugin, [{
    fileName: 'manifest.json',
    filter: (obj) => { ... }
}]);

// New
config.plugin('manifest').use(WebpackManifestPlugin, [{
    fileName: 'manifest.json',
    filter: (file) => { ... }
}]);
```

**DevServer Configuration:**
```javascript
// Old
devServer: {
    clientLogLevel: 'info',
    open: true,
    openPage,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    // ... other deprecated options
}

// New
devServer: {
    client: {
        logging: 'info',
        overlay: { warnings: false, errors: true }
    },
    open: [openPage],
    // ... simplified configuration
}
```

**CSS Configuration:**
```javascript
// Removed deprecated option
// css.requireModuleExtension: true  // Not supported in Vue CLI 5
```

#### .eslintrc.js (both demo-v2 and demo-v3)

```javascript
// Old
parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
}

// New
parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    requireConfigFile: false
}
```

#### postcss.config.js (both demo-v2 and demo-v3)

```javascript
// Old
module.exports = {
    plugins: [
        require('postcss-import')(),
        require('postcss-mixins'),
        require('postcss-nested'),
        require('postcss-color-mod-function'),
        require('postcss-cssnext')({ ... }),
    ]
};

// New
module.exports = {
    plugins: [
        require('postcss-import')(),
        require('postcss-nested'),
        require('autoprefixer'),
    ]
};
```

## Known Issues & Solutions

### Node.js 17+ Compatibility

Due to OpenSSL 3.0 changes in Node.js 17+, you may need to set the following environment variable:

**Windows PowerShell:**
```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

**Linux/Mac:**
```bash
export NODE_OPTIONS="--openssl-legacy-provider"
```

Or add it to your npm scripts:
```json
{
  "scripts": {
    "dev": "NODE_OPTIONS=--openssl-legacy-provider vue-cli-service serve",
    "build": "NODE_OPTIONS=--openssl-legacy-provider vue-cli-service build"
  }
}
```

### ESLint Warnings

Some ESLint warnings may appear during build. These are non-blocking and can be addressed individually or by disabling specific rules in the ESLint configuration.

## Installation

After upgrading, run the following in each demo project:

```bash
cd packages/demo/demo-v2
npm install --legacy-peer-deps

cd ../demo-v3
npm install --legacy-peer-deps
```

## Build Commands

```bash
# Demo V2
cd packages/demo/demo-v2
npm run build

# Demo V3
cd packages/demo/demo-v3
npm run build
```

## Benefits of Webpack 5

1. **Better Performance**: Improved build times and smaller bundle sizes
2. **Better Caching**: Persistent caching improves rebuild performance
3. **Better Tree Shaking**: More efficient dead code elimination
4. **Module Federation**: Support for micro-frontends (if needed in future)
5. **Asset Modules**: Better handling of assets without loaders
6. **Future-Proof**: Aligned with modern tooling and dependencies

## Migration Checklist

- ✅ Updated Vue CLI to version 5
- ✅ Updated all Webpack plugins to compatible versions
- ✅ Updated ESLint and PostCSS configurations
- ✅ Removed deprecated configuration options
- ✅ Updated devServer configuration for Webpack 5
- ✅ Tested builds for both demo-v2 and demo-v3
- ✅ Added missing vue-router dependency to demo-v3
- ✅ Documented known issues and solutions

## Next Steps

1. Review and address any ESLint warnings
2. Test dev servers to ensure hot reload works correctly
3. Consider migrating to Vite for even better performance (optional)
4. Update CI/CD pipelines if needed to account for Node.js version requirements

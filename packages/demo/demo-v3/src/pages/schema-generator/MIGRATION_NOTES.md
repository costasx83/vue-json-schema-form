# Schema Generator - Vue 2 to Vue 3 Migration

This folder contains the schema generator that has been migrated from demo-v2 to demo-v3 (Vue 2 to Vue 3).

## Migration Changes

### 1. Router (router/index.js)
- Changed from `new VueRouter()` to `createRouter()` with `createWebHashHistory()`
- Removed `Vue.use(VueRouter)`
- Changed `mode: 'hash'` to `history: createWebHashHistory()`

### 2. Entry File (schema-generator.js)
- Changed from `new Vue()` to `createApp()`
- Updated Element UI import from `ElementUi` to `ElementPlus`
- Changed component registration from `Vue.use()` to `app.use()`

### 3. HTML File (schema-generator.html)
- Updated Vue CDN from Vue 2 to Vue 3
- Updated Vue Router CDN from version 3 to version 4
- Updated Element UI to Element Plus

### 4. Components

#### Editor.vue
- Added `import { h } from 'vue'` for render functions
- Replaced `this.$createElement()` with `h()` function
- Changed lifecycle hook from `destroyed()` to `beforeUnmount()`
- Replaced `this.$on()` pattern with exposed method `onSetCurEditorItem()`
- Added `expose: ['onSetCurEditorItem']` to component options

#### ViewComponentWrap.vue
- Changed lifecycle hook from `beforeDestroy()` to `beforeUnmount()`

#### NestedEditor.vue
- Updated slot syntax from `<template slot="footer">` to `<template #footer>`

### 5. Mixins (mixins/emitter.js)
- Complete rewrite for Vue 3 compatibility
- Replaced `$parent` and `$children` access with `getCurrentInstance()`
- Updated to use `parent.exposed` for calling parent methods
- Added deprecation warning for `broadcast()` method (not fully functional in Vue 3)

### 6. Dependencies (package.json)
- Updated `vuedraggable` from `2.23.2` to `^4.1.0` (Vue 3 compatible version)

## Known Limitations

1. The `broadcast()` method in the emitter mixin is deprecated and not fully functional in Vue 3. If your code uses this method, consider refactoring to use provide/inject or props/events pattern.

2. The emitter's `dispatch()` method relies on exposed methods in parent components. Make sure parent components properly expose any methods that need to be called from children.

## Testing Recommendations

1. Test drag and drop functionality with the new vuedraggable version
2. Verify form import/export functionality
3. Check component toolbar operations (move up/down, copy, remove)
4. Test the preview and export features
5. Verify that nested editor functionality works correctly

## Additional Notes

- All Vue 2 specific APIs have been replaced with Vue 3 equivalents
- The code maintains the same structure and functionality as the Vue 2 version
- CSS modules and styling remain unchanged

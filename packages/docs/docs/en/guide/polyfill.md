# Compatibility

> In principle, only compatible with IE11

## CSS Compatibility
CSS uses flex, you can reset styles here to be compatible with lower versions

> If you need to be compatible with even lower versions, you can also implement by overriding abnormal styles.

## Script Compatibility
The project internally uses some ES6+ APIs, such as String.prototype.includes, etc. These APIs are not processed when building library files and need to be handled according to the actual project.

#### Method 1: Transpile current library through project Babel
If the project uses babel runtime, or core-js@3 through useBuiltIns, **vue-cli uses this method by default**
> babel ignores all files in `node_modules` by default. You can include the library directory `node_modules/@lljj/vue-json-schema-form` through `babel include`

* Using vue-cli only requires configuring [transpileDependencies](https://cli.vuejs.org/en/config/#transpiledependencies)

```js
{
    transpileDependencies: [
        '@lljj/vue-json-schema-form' // + Add this line
    ]
},
```

* Or configure babel-loader:
```js
{
    test: /\.js$/
    loader: 'babel-loader',
    include: [
        path.resolve(__dirname,'../src'),
        path.resolve(__dirname,'../node_modules/@lljj/vue-json-schema-form') // + Add this line
    ]
}
```

:::tip
The above configuration path needs to be adjusted based on your actual project
:::

#### Method 2: Handle through polyfill
If your project does not use useBuiltIns, and uses pure polyfill to solve API compatibility issues, such as @babel/polyfill, or your favorite polyfill, just ensure the polyfill executes first.

> Ensure polyfill is loaded and executed beforehand
>
> Note:
>* Personally, I prefer this method to build my own polyfill, which makes it easier to ensure stable version of resource files with each change.
>* For example, what I commonly use: [@lljj/polyfill](https://github.com/lljj-x/polyfill)

```js
// For example using @babel/polyfill
import "@babel/polyfill";
```

::: tip
If you still get prompts about unsupported API methods, the imported polyfill may not be comprehensive enough. You can manually import missing methods.

Use `core-js` to manually import on demand

```js
// For example if missing Promise is prompted
import 'core-js/modules/es6.promise';
```
:::


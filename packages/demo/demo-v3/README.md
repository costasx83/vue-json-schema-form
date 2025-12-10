# Vue3 Demo Related

## Run `Playground/Form Schema Generator/Activity Editor` Simultaneously
```ssh
# Playground http://127.0.0.1:8800/
# Visual Form Schema Editor http://127.0.0.1:8800/schema-generator.html
# (H5) Activity Editor http://127.0.0.1:8800/vue-editor.html

yarn run demo3:dev

If you get an error [ERR_OSSL_EVP_UNSUPPORTED] then use:

$env:NODE_OPTIONS="--openssl-legacy-provider"; yarn demo3:dev   

```

## Run Individually (faster compilation by specifying entry)
```ssh
# Run only Playground
yarn run demo3:dev --dir=index

# Run only Form Schema Generator
yarn run demo3:dev --dir=schema-generator

# Run only (H5) Activity Editor
yarn run demo3:dev --dir=vue-editor
```

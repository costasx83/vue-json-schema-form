# @lljj/vjsf-utils
Form basic common utility classes, see source code for specific parameters

## @lljj/vjsf-utils/i18n
Manage current multi-language


## @lljj/vjsf-utils/schema/getDefaultFormState
Calculate current schema value based on jsonSchema and formData

## @lljj/vjsf-utils/schema/validate

```js
import {
    ajvValidateFormData,
    validateFormDataAndTransformMsg,
    isValid
} from '@lljj/vjsf-utils/schema/validate';

// Directly call ajv to validate schema, return formatted result
ajvValidateFormData(...args);

// Validate data and process multi-language (only process current node)
validateFormDataAndTransformMsg(...args);

// Return whether data validation is successful
isValid(...args);

// Return whether data validation is successful
isValid(...args);
```

## @lljj/vjsf-utils/arrayUtils
Array related utility classes

## @lljj/vjsf-utils/formUtils
Form related utility classes

## @lljj/vjsf-utils/vueUtils
Vue related utility classes

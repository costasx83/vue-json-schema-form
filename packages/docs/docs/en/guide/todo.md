# TODO

## Unsupported (Continuously Updated)
Currently unsupported parts of standard JSON Schema may include but are not limited to:
1. object additionalProperties attribute only supports configuring false (no plans)
1. object Dependencies schema dependencies not supported (no plans)
1. if else new features not supported (no plans)
1. $ref does not support cross-file references (no plans)

## Todo
- [x] anyOf nested array order adjustment data rendering exception fix
- [x] lib if directly imported as umd package, register vue component by default like elementUi
- [x] Configure all places calling external components for easy future expansion to support different UI libraries
- [x] enumNames support ui-schema configuration
- [x] Add unique class names to all form rendering nodes for easy style reset
- [x] Organize documentation, gradually sort out basic usage and personalized configuration field, components, error message handling, options configuration, etc.
- [x] Add ui:fieldProps parameters passed to custom field
- [x] Add d.ts file
- [x] ui:widget support passing at array level
- [x] custom-rule parameter support
- [x] Gradually open source and release
- [x] Optimize source code, components that don't need this adjusted to functional
- [x] Array supports configuring whether to display sequence number
- [x] Array rendering style fine-tuning optimization (control strip spacing, etc.)
- [x] Support property dependencies [Property Dependencies](https://json-schema.org/understanding-json-schema/reference/object.html#property-dependencies)
- [x] Support ui:hidden using mustache expressions
- [x] Support all ui configuration using mustache expressions
- [x] Support Vue3
- [x] Adapt elementUi, iView, Ant vue and other common UI components
- [ ] Add code testing

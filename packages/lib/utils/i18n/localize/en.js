// https://github.com/epoberezkin/ajv-i18n
export default function localizeEn(errors) {
    if (!(errors && errors.length)) return;
    for (let i = 0; i < errors.length; i += 1) {
        const e = errors[i];
        let out;
        let n;
        let cond;
        switch (e.keyword) {
        case '$ref':
            out = `can't resolve reference ${e.params.ref}`;
            break;
        case 'additionalItems':
            out = '';
            n = e.params.limit;
            out += `should NOT have more than ${n} items`;
            break;
        case 'additionalProperties':
            out = 'should NOT have additional properties';
            break;
        case 'anyOf':
            out = 'should match some schema in anyOf';
            break;
        case 'const':
            out = 'should be equal to constant';
            break;
        case 'contains':
            out = 'should contain a valid item';
            break;
        case 'custom':
            out = `should pass "${e.keyword}" keyword validation`;
            break;
        case 'dependencies':
            out = '';
            n = e.params.depsCount;
            out += `should have property ${e.params.deps} when property ${e.params.property} is present`;
            break;
        case 'enum':
            out = 'should be equal to one of the allowed values';
            break;
        case 'exclusiveMaximum':
            out = '';
            cond = `${e.params.comparison} ${e.params.limit}`;
            out += `should be ${cond}`;
            break;
        case 'exclusiveMinimum':
            out = '';
            cond = `${e.params.comparison} ${e.params.limit}`;
            out += `should be ${cond}`;
            break;
        case 'false schema':
            out = 'boolean schema is false';
            break;
        case 'format':
            out = `should match format "${e.params.format}"`;
            break;
        case 'formatExclusiveMaximum':
            out = 'formatExclusiveMaximum should be boolean';
            break;
        case 'formatExclusiveMinimum':
            out = 'formatExclusiveMinimum should be boolean';
            break;
        case 'formatMaximum':
            out = '';
            cond = `${e.params.comparison} ${e.params.limit}`;
            out += `should be ${cond}`;
            break;
        case 'formatMinimum':
            out = '';
            cond = `${e.params.comparison} ${e.params.limit}`;
            out += `should be ${cond}`;
            break;
        case 'if':
            out = `should match "${e.params.failingKeyword}" schema`;
            break;
        case 'maximum':
            out = '';
            cond = `${e.params.comparison} ${e.params.limit}`;
            out += `should be ${cond}`;
            break;
        case 'maxItems':
            out = '';
            n = e.params.limit;
            out += `should NOT have more than ${n} items`;
            break;
        case 'maxLength':
            out = '';
            n = e.params.limit;
            out += `should NOT be longer than ${n} characters`;
            break;
        case 'maxProperties':
            out = '';
            n = e.params.limit;
            out += `should NOT have more than ${n} properties`;
            break;
        case 'minimum':
            out = '';
            cond = `${e.params.comparison} ${e.params.limit}`;
            out += `should be ${cond}`;
            break;
        case 'minItems':
            out = '';
            n = e.params.limit;
            out += `should NOT have fewer than ${n} items`;
            break;
        case 'minLength':
            out = '';
            n = e.params.limit;
            out += `should NOT be shorter than ${n} characters`;
            break;
        case 'minProperties':
            out = '';
            n = e.params.limit;
            out += `should NOT have fewer than ${n} properties`;
            break;
        case 'multipleOf':
            out = `should be multiple of ${e.params.multipleOf}`;
            break;
        case 'not':
            out = 'should NOT be valid according to schema in "not"';
            break;
        case 'oneOf':
            out = 'should match exactly one schema in "oneOf"';
            break;
        case 'pattern':
            out = `should match pattern "${e.params.pattern}"`;
            break;
        case 'patternRequired':
            out = `should have property matching pattern ${e.params.missingPattern}`;
            break;
        case 'propertyNames':
            out = `property name '${e.params.propertyName}' is invalid`;
            break;
        case 'required':
            out = `should have required property ${e.params.missingProperty}`;
            break;
        case 'switch':
            out = `should pass "switch" keyword validation, case ${e.params.caseIndex} fails`;
            break;
        case 'type':
            out = `should be ${e.params.type}`;
            break;
        case 'uniqueItems':
            out = `should NOT have duplicate items (items ## ${e.params.j} and ${e.params.i} are identical)`;
            break;
        default:
            // eslint-disable-next-line no-continue
            continue;
        }
        e.message = out;
    }
}

/**
 * Created by Liu.Jun on 2020/4/20 9:55 PM.
 */

// eslint-disable-next-line import/no-cycle
import ObjectField from './fields/ObjectField';

// eslint-disable-next-line import/no-cycle
import StringField from './fields/StringField';

// eslint-disable-next-line import/no-cycle
import NumberField from './fields/NumberField';

// eslint-disable-next-line import/no-cycle
import IntegerField from './fields/IntegerField';

// eslint-disable-next-line import/no-cycle
import BooleanField from './fields/BooleanField';

// eslint-disable-next-line import/no-cycle
import ArrayField from './fields/ArrayField';

// eslint-disable-next-line import/no-cycle
import AnyOfField from './fields/combiningSchemas/AnyOfField';

// eslint-disable-next-line import/no-cycle
import OneOfField from './fields/combiningSchemas/OneOfField';

// Default type to field mapping relationship
const FIELDS_MAPS = {
    array: ArrayField,
    boolean: BooleanField,
    integer: IntegerField,
    number: NumberField,
    object: ObjectField,
    string: StringField,
    null: {
        render() {
            return null;
        }
    },
    anyOf: AnyOfField,
    oneOf: OneOfField
};

export default FIELDS_MAPS;

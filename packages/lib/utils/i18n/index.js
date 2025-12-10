/**
 * Created by Liu.Jun on 2020/4/30 11:22.
 */

// Using ajv-i18n, this is only for initializing the default language setting
// You can also use the official language pack
// https://github.com/epoberezkin/ajv-i18n/tree/master/localize

// import localizeZh from './localize/zh';
import localizeEn from './localize/en';

export default {
    $$currentLocalizeFn: localizeEn,
    getCurrentLocalize() {
        return this.$$currentLocalizeFn;
    },
    useLocal(fn) {
        this.$$currentLocalizeFn = fn;
    }
};

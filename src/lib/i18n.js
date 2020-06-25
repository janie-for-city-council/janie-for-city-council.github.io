import locales from '../locales/locales';
export const getCurrentLocale = () => {
    let locale = null;
    const localeKeys = Object.keys(locales);
    for(const key of localeKeys) {
        if (window.location.pathname.startsWith(`/${key}/`) || window.location.pathname === `/${key}`) {
            locale = key;
            break;
        }
        else if(locales[key].default) {
            locale = key;
        }
    }
    return locale;
};

export const getDesiredLocale = () => {
    return window.localStorage.getItem('locale');
};

export const getBasePath = () => {
    const locale = getCurrentLocale();
    if(window.location.pathname.startsWith(`/${locale}/`)) {
        return window.location.pathname.substr(locale.length+1);
    }
    else if(window.location.pathname === `/${locale}`) {
        return '/';
    }
    return window.location.pathname;
};

export const getLocalizedPath = (path, locale) => {
    locale = locale || getCurrentLocale();
    return locales[locale].default ? path : `/${locale}${path}`;
};

export const changeLocale = (locale) => {
    window.localStorage.setItem('locale', locale);
    window.location = getLocalizedPath(getBasePath(), locale);
};

const dl = getDesiredLocale();
const l = getCurrentLocale();
if(dl && l !== dl) {
    changeLocale(dl);
}

export const i18n = {
    locale: l,
}

export const buildTranslator = (namespace) => (key) => {
    if (i18n.locale in locales) {
        if(namespace in locales[i18n.locale].translations) {
            if(key in locales[i18n.locale].translations[namespace]) {
                return locales[i18n.locale].translations[namespace][key];
            }
            else {
                return `__unknown_key_${key}__`;
            }
        }
        else {
            return `__unknown_namespace_${namespace}__`;
        }
    }
    return `__unknown_locale_${i18n.locale}__`;
}
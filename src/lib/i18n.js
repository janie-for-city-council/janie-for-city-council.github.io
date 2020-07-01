import locales from '../locales/locales';

export const getDesiredLocale = () => {
    return window.localStorage.getItem('locale');
};

export const getBasePath = (locale, pathname) => {
    if(pathname.startsWith(`/${locale}/`)) {
        return pathname.substr(locale.length+1);
    }
    else if(pathname === `/${locale}`) {
        return '/';
    }
    return pathname;
};

export const getLocalizedPath = (locale, pathname) => {
    return locales[locale].default ? pathname : `/${locale}${pathname}`;
};

export const changeLocale = (locale, pathname) => {
    window.localStorage.setItem('locale', locale);
    window.location = getLocalizedPath(locale, pathname);
};

export const init = (locale, pathname) => {
    const dl = getDesiredLocale();
    if(dl && locale !== dl) {
        changeLocale(dl, pathname);
    }
};

export const buildTranslator = (locale, namespace) => (key) => {
    if (locale in locales) {
        if(namespace in locales[locale].translations) {
            if(key in locales[locale].translations[namespace]) {
                return locales[locale].translations[namespace][key];
            }
            else {
                return `__unknown_key_${key}__`;
            }
        }
        else {
            return `__unknown_namespace_${namespace}__`;
        }
    }
    return `__unknown_locale_${locale}__`;
}
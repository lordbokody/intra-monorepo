import {defineRouting} from 'next-intl/routing';

/**
 * next-intl routing konfiguráció
 */
export const routing = defineRouting({
    locales: ['hu', 'en'],
    defaultLocale: 'hu',
});
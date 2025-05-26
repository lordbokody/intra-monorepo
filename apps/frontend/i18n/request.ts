import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import hu from '../../../packages/shared/src/translations/hu.translation.json'
import en from '../../../packages/shared/src/translations/en.translation.json'

export default getRequestConfig(async ({requestLocale}) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    const translations = locale === 'hu' ? hu : en

    return {
        locale,
        messages: translations
    };
});
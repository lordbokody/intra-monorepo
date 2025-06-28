import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import hu from '../../../packages/shared/src/translations/hu.translation.json'
import en from '../../../packages/shared/src/translations/en.translation.json'

/**
 * next-intl request config
 */
export default getRequestConfig(async ({requestLocale}) => {
    // Megnézzük a kérést
    const requested = await requestLocale;

    // Betöltjük a localt, ha nincs akkor az alapértelmezeett nyelvet
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    // Betöltjük a fordításokat
    const translations = locale === 'hu' ? hu : en

    // Visszatérünk a locale és fordítások értékével
    return {
        locale,
        messages: translations
    };
});
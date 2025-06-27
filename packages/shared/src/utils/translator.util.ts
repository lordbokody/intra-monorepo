import hu from "../translations/hu.translation.json"
import en from '../translations/en.translation.json';
import {ApplicationLanguage} from "../types/common.types";

type TranslationMap = {
    [key: string]: string;
};

type LocaleStrings = {
    all: TranslationMap;
};

const translations: Record<string, LocaleStrings> = {
    hu,
    en,
};

export function createTranslator(locale: ApplicationLanguage): (key: string) => string {
    const messages = translations[locale];

    if (!messages) {
        throw new Error(`Translations for locale "${locale}" not found`);
    }

    return (key: string): string => {
        return messages.all[key] ?? key;
    };
}
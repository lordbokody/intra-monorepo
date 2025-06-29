"use client"

import { useLocale, useTranslations } from "next-intl";
import type { ApplicationLanguage } from "@intra/shared/types/common.types";

/**
 * Hook that returns the current locale and the global "all" translations
 * for consistent usage across your app
 */
export const useAppTranslations = () => {
    const locale = useLocale() as ApplicationLanguage;
    const t = useTranslations("all");

    return { locale, t };
};

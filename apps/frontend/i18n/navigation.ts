import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * next-intl navigáció
 */
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);

export const customRedirect = async (
    beforeRouteChange: () => Promise<void>, // async void
    newRoute: string,
    locale: ApplicationLanguage
) => {
    await beforeRouteChange();
    return redirect({ href: newRoute, locale });
};

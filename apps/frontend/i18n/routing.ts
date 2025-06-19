import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['hu', 'en'],

    defaultLocale: 'hu',
    pathnames: {
        '/public/login': {
            hu: '/publikus/bejelentkezes',
            en: '/public//login'
        },
        '/public/registration': {
            hu: '/publikus/regisztracio',
            en: '/public/registration'
        },
        '/public/success-registration': {
            hu: '/publikus/sikeres-regisztracio',
            en: '/public/success-registration'
        },
        '/private/home': {
            hu: '/privat/fooldal',
            en: '/private/home'
        }
        /*'/public/email-confirmation': {
            hu: 'email-megerosites',
            en: 'email-confirmation'
        }*/
    }
});
import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
import {routing} from "./i18n/routing";
import {auth} from "./auth";
import {hasLocale} from "next-intl";

/**
 * Frontend app middleware
 */
export default async function middleware(request: NextRequest) {
    // Szétdaraboljuk az urlt a localera és a többi szegmensre
    const [, locale, ...segments] = request.nextUrl.pathname.split('/');

    // Csak akkor futtatjuk a függvényt ha van locale
    // Ha nincs locale, akkor automatikusan átirányít, és újra triggert kap a middleware,
    // ezért nem szeretnénk hogy az if-en belüli dolgok többször fussanak
    if(locale){
        // Betöltjük a sessiont
        const session = await auth()

        // Ha nincs session
        if(!session){
            // Ha az url-ben szereplő locale nem támogatott átirányítjuk a magyar login oldalra
            if (!hasLocale(routing.locales, locale)) {
                request.nextUrl.pathname = `/hu/public/login`;
            }

            // Ha a szegmensek értéke nulla akkor átirányítjuk a loginra
            if(segments.length === 0){
                request.nextUrl.pathname = `/${locale}/public/login`;
            }

            // Ha védett útvonalon vagyunk átirányítjuk a loginra
            if(segments[0] === 'private'){
                request.nextUrl.pathname = `/${locale}/public/login`;
            }
            // Ha van session
        } else {
            // Ha az url-ben szereplő locale nem támogatott átirányítjuk a magyar belső főoldalra
            if (!hasLocale(routing.locales, locale)) {
                request.nextUrl.pathname = `/hu/private/home`;
            }

            // Betöltjük a sessionből a felhasználó regisztrációjának státuszát
            const registrationStatus = session?.registrationStatus;

            // Ha részleges a regiszrációja, de nem azon az oldalon van, akkor átirányítjuk oda
            if(registrationStatus === 'partialRegistration' && segments[1] !== 'finish-registration'){
                request.nextUrl.pathname = `/${locale}/private/finish-registration`;
            }

            // Ha regisztrált de publikus útvonalon jár, akkor átirányítjuk a védett főoldalra
            if(registrationStatus === 'registered' && segments[0] === 'public'){
                request.nextUrl.pathname = `/${locale}/private/home`;
            }

            // Ha regisztrált de a véglegesítő oldalon jár, akkor átirányítjuk a védett főoldalra
            if(registrationStatus === 'registered' && segments[0] === 'private' && segments[1] === 'finish-registration'){
                request.nextUrl.pathname = `/${locale}/private/home`;
            }
        }
    }

    // Létrehozzuk a middlewaret
    const handleI18nRouting = createMiddleware(routing);

    // Visszatérünk az értékkel
    return handleI18nRouting(request);
}

/**
 * Middleware config, ahol beállítjuk, hogy milyen szabályok szerint fusson a middleware függvényünk
 */
export const config = {
    matcher: ['/', '/(hu|en)', '/(hu|en)/:path*'],
};
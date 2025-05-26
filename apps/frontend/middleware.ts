import { auth } from "./auth";
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const protectedRoutes = ['/private', '/privat'];
const publicRoutes = ['/public', '/publikus'];

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
    const { pathname, origin, locale } = request.nextUrl;

    // Get session (works in middleware)
    const session = await auth();

    const backendJwt = session?.backendJwt;
    const registrationStatus = session?.registrationStatus;

    const response = intlMiddleware(request);

    // Extract the path without locale
    const [, , restPath = ""] = pathname.match(/^\/([^/]+)(.*)/) || [];

    const isProtected = protectedRoutes.some(route => restPath.startsWith(route));
    const isPublic = publicRoutes.some(route => restPath.startsWith(route));

    const urlLocale = locale || 'hu';

        if (session && registrationStatus === 'partialRegistration' && pathname !== `/${urlLocale}/private/finish-registration`) {
        return NextResponse.redirect(new URL(`/${urlLocale}/private/finish-registration`, origin));
    }

    if (isProtected && !session && pathname !== `/${urlLocale}/public/login`) {
        return NextResponse.redirect(new URL(`${urlLocale}/public/login`, origin));
    }

    if (isPublic && registrationStatus === 'registered' && pathname !== `/${urlLocale}/private/home`) {
        return NextResponse.redirect(new URL(`${urlLocale}/private/home`, origin));
    }

    return response;
}

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};

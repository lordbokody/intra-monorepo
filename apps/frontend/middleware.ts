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

    const redirect = (path: string) => NextResponse.redirect(new URL(`/${urlLocale}${path}`, origin));

    if (!session) {
        // Case 1: No session and at root path → redirect to login
        if (pathname === `/${urlLocale}`) {
            return redirect('/public/login');
        }

        // Case 2: Trying to access a protected route → redirect to login
        if (isProtected && pathname !== `/${urlLocale}/public/login`) {
            return redirect('/public/login');
        }
    } else {
        // Case 3: Partial registration → redirect to finish-registration
        if (registrationStatus === 'partialRegistration' && pathname !== `/${urlLocale}/private/finish-registration`) {
            return redirect('/private/finish-registration');
        }

        // Case 4: Fully registered user accessing a public route → redirect to private home
        if (isPublic && registrationStatus === 'registered' && pathname !== `/${urlLocale}/private/home`) {
            return redirect('/private/home');
        }
    }

    return response;
}

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};

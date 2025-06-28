import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {RegistrationStatus, Role} from "@intra/shared/types/common.types";
import {ApiService} from "./app/api/client/client";
import {LoginOAuthDto} from "@intra/shared/types/auth.types";

/**
 * Az alapértelmezett typeok kibővítése a saját szükséges értékekkel
 */
declare module "next-auth" {
    interface User {
        backendJwt?: string;
        registrationStatus?: RegistrationStatus;
        role?: Role;
    }

    interface Session {
        backendJwt?: string;
        registrationStatus?: RegistrationStatus;
        role?: Role;
    }

    interface JWT {
        backendJwt?: string;
        registrationStatus?: RegistrationStatus;
        role?: Role;
    }

    interface DefaultSession {
        backendJwt?: string;
        registrationStatus?: RegistrationStatus;
        role?: Role;
    }
}

/**
 * OAuth belépés esetén a response típusa
 */
type OAuthResponse = {
    message?: string;
    success?: boolean;
    registrationStatus?: RegistrationStatus;
    token?: string;
    role?: Role
}


/**
 * Auth.js auth handler
 * TODO: Itt az auth hibát mutat de nem tudom miért, jó így, nézz utána
 */
export const { handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        // Betöltjük a google oauth providert
        Google,
        // Betöltjük a hagyományos login mezőt
        Credentials({
            name: 'LoginForm',
            credentials: {
                token: { label: "Token", type: "text" },
                role: { label: "Role", type: "text" },
                registrationStatus: { label: "RegistrationStatus", type: "text" },
            },
            async authorize(credentials) {
                // Ha hiányzik valamelyik érték visszatérünk nullal, ami majd hibát fog dobni
                if (
                    !credentials?.token ||
                    !credentials?.role ||
                    !credentials?.registrationStatus
                ) {
                    return null;
                }

                // Visszatérünk
                return {
                    backendJwt: credentials.token as string,
                    role: credentials.role as Role,
                    registrationStatus: credentials.registrationStatus as RegistrationStatus,
                };
            }
        })
    ],
    callbacks: {
        // Bejelentkezés utáni callback függvény
        async signIn({ user, account, profile, credentials }) {
            // Ha nincs account érték, akkor visszatérünk hibásan
            if (!account) return false;

            switch (account.provider) {
                // Google provider
                case "google": {
                    // Összerakjuk a kérés adatait
                    const requestData: LoginOAuthDto = {
                        email: profile?.email as string,
                        name: profile?.name || `${profile?.family_name ?? ""} ${profile?.given_name ?? ""}`,
                    }

                    // Google esetén megkell hívnunk a szervert, hogy elvégezze a hozzá köthető teendőket
                    // TODO: a nyelvet itt bekéne állítani
                    const response = await ApiService.auth.loginOAuth(requestData, 'en')

                    // Ha a hívás sikeres
                    if (response?.success) {
                        // Beállítjuk a session adatokat
                        user.backendJwt = response.token;
                        user.registrationStatus = response.registrationStatus;
                        user.role = response.role;

                        // Visszatérünk
                        return true;
                    }

                    // Ha a hívás sikertelen visszatérünk hibával
                    return false;
                }

                // Hagyományos bejelentkezés
                case "credentials": {
                    return true;
                }

                // Minden más esetén hibát dobunk
                default:
                    return false;
            }
        },

        // Betöltjük az adatokat a tokenbe
        async jwt({ token, user }) {
            if (user?.backendJwt) token.backendJwt = user.backendJwt;
            if (user?.registrationStatus) token.registrationStatus = user.registrationStatus;
            if (user?.role) token.role = user.role;
            return token;
        },

        // Kiterjesztjük a token adatokat a kliens sessionnek
        async session({ session, token }) {
            session.backendJwt = token.backendJwt as string;
            session.registrationStatus = token.registrationStatus as RegistrationStatus;
            session.role = token.role as Role;
            return session;
        },
    },
});

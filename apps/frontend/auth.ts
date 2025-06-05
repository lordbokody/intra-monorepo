import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import {axiosRequest} from "./app/api/client/axios";
import Credentials from "next-auth/providers/credentials";

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

type RegistrationStatus = 'partialRegistration' | 'registered' | 'emailNotConfirmed';
type Role = 'unverified' | 'student' | 'admin';

type OAuthResponse = {
    message?: string;
    success?: boolean;
    registrationStatus?: RegistrationStatus;
    token?: string;
    role?: Role
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        Credentials({
            name: 'LoginForm',
            credentials: {
                token: { label: "Token", type: "text" }, // custom JWT
                role: { label: "Role", type: "text" },
                registrationStatus: { label: "RegistrationStatus", type: "text" },
            },
            async authorize(credentials) {
                if (
                    !credentials?.token ||
                    !credentials?.role ||
                    !credentials?.registrationStatus
                ) {
                    return null;
                }

                return {
                    backendJwt: credentials.token as string,
                    role: credentials.role as Role,
                    registrationStatus: credentials.registrationStatus as RegistrationStatus,
                };
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, credentials }) {
            if (!account) return false;

            switch (account.provider) {
                case "google": {
                    const response = await axiosRequest<OAuthResponse>({
                        method: "post",
                        route: "/auth/loginOAuth",
                        data: {
                            email: profile?.email,
                            name: profile?.name || `${profile?.family_name ?? ""} ${profile?.given_name ?? ""}`,
                        },
                    });

                    if (response?.success) {
                        user.backendJwt = response.token;
                        user.registrationStatus = response.registrationStatus;
                        user.role = response.role;
                        return true;
                    }

                    return false;
                }


                case "credentials": {
                    return true;
                }

                default:
                    return false;
            }
        },

        async jwt({ token, user }) {
            // Copy from user to token on first sign-in
            if (user?.backendJwt) token.backendJwt = user.backendJwt;
            if (user?.registrationStatus) token.registrationStatus = user.registrationStatus;
            if (user?.role) token.role = user.role;
            return token;
        },

        async session({ session, token }) {
            // Expose token data to client session
            session.backendJwt = token.backendJwt as string;
            session.registrationStatus = token.registrationStatus as RegistrationStatus;
            session.role = token.role as Role;
            return session;
        },
    },
});

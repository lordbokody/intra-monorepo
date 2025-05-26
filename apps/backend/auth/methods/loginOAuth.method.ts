import {prisma} from "../../database/prisma/database";
import {generateLoginToken} from "@intra/shared/utils/token.util";
import {APIError} from "encore.dev/api";
import {loginOAuthSchema} from "@intra/shared/schemas/auth/loginOAuth.schema";
import {LoginOAuthDto, LoginOAuthResponse} from "@intra/shared/types/auth.types";

/**
 * OAuth regisztráció/belépés
 */
export const loginOAuthMethod = async (data: LoginOAuthDto): Promise<LoginOAuthResponse> => {
    try {
        // Validáljuk a kliens felől érkező adatokat
        await loginOAuthSchema('hu').client().validate(data);

        // Megkeressük a felhasználót
        let user = await prisma.user.findFirst({ where: { email: data.email } });

        // Ha nincs felhasználó létrehozzuk
        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: null,
                    birthday: null,
                    role: "unverified",
                    registrationStatus: "partialRegistration"
                }
            });
        }

        // Validáljuk a szerver oldali adatokat
        await loginOAuthSchema('hu').server().validate(data);

        // Ha regisztrált vagy részlegesen regisztrált visszatérünk a válasszal
        if (user.registrationStatus === 'registered' || user.registrationStatus === 'partialRegistration') {
            return {
                success: true,
                registrationStatus: user.registrationStatus,
                role: user.role,
                token: generateLoginToken(user.id, user.email, user.role, user.registrationStatus),
            };
        }

        // Ha egyik feltétel se teljesünk visszatérünk sikertelen válasszal
        return { success: false };
    } catch (error){
        throw APIError.aborted(error as string);
    }
}
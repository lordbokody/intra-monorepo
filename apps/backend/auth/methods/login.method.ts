import {loginSchema} from "@intra/shared/schemas/auth/login.schema";
import {prisma} from "../../database/prisma/database";
import {generateLoginToken} from "@intra/shared/utils/token.util";
import {APIError, Header} from "encore.dev/api";
import {LoginDto, LoginResponse} from "@intra/shared/types/auth.types";
import {RegistrationStatus, Role} from "@intra/shared/types/user.types";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Kiegészítjük a Dto-t a Header nyelvi értékével
 */
export interface LoginParams extends LoginDto {
    locale: Header<"Accept-Language">;
}

/**
 * Bejelentkezésre szólgálú metódus.
 */
export const loginMethod = async (data: LoginParams): Promise<LoginResponse> => {
    try {
        // Létrehozzuk a validáló sémát
        const validationSchema = loginSchema(data.locale as ApplicationLanguage)

        // Validáljuk a kliens felől érkező adatokat
        await validationSchema.client().validate(data);

        // Megkeressük a felhasználót
        const user = await prisma.user.findFirst({where: {email: data.email}});

        // Validáljuk, hogy a felhasználó rendben van e
        await validationSchema.server().validate(user, {
            context: { inputPassword: data.password },
        });

        // Kivesszük a jelszót az adatok közül
        const { password, ...safeUser } = user!;

        // Visszatérünk a válasszal
        return {
            success: true,
            token: generateLoginToken(user?.id as number, user?.email as string, user?.role as Role, 'registered' as RegistrationStatus),
            user: safeUser
        };
    } catch (error){
        // Hibakezelés
        throw APIError.aborted(error as string);
    }
}
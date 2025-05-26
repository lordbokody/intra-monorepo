import {loginSchema} from "@intra/shared/schemas/auth/login.schema";
import {prisma} from "../../database/prisma/database";
import {generateLoginToken} from "@intra/shared/utils/token.util";
import {APIError} from "encore.dev/api";
import {LoginDto, LoginResponse} from "@intra/shared/types/auth.types";
import {RegistrationStatus, Role} from "@intra/shared/types/user.types";

/**
 * Bejelentkezésre szólgálú metódus.
 */
export const loginMethod = async (data: LoginDto): Promise<LoginResponse> => {
    try {
        // Validáljuk a kliens felől érkező adatokat
        await loginSchema('hu').client().validate(data);

        // Megkeressük a felhasználót
        const user = await prisma.user.findFirst({where: {email: data.email}});

        // Validáljuk, hogy a felhasználó rendben van e
        await loginSchema("hu").server().validate(user, {
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
        throw APIError.aborted(error as string);
    }
}
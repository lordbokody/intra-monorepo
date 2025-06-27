import {verifyToken} from "@intra/shared/utils/token.util";
import {prisma} from "../../database/prisma/database";
import {APIError, Header} from "encore.dev/api";
import {forgotPasswordChangeSchema} from "@intra/shared/schemas/auth/forgotPasswordChange.schema";
import {ForgotPasswordChangeDto, ForgotPasswordChangeResponse} from "@intra/shared/types/auth.types";
import {hashPassword} from "@intra/shared/utils/password.util";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Kiegészítjük a Dto-t a Header nyelvi értékével
 */
export interface ForgotPasswordChangeParams extends ForgotPasswordChangeDto {
    locale: Header<"Accept-Language">;
}

/**
 * Elfelejtett jelszó módosítására szolgáló metódus.
 */
export const forgotPasswordChangeMethod = async (data: ForgotPasswordChangeParams): Promise<ForgotPasswordChangeResponse> => {
    try {
        // Létrehozzuk a validáló sémát
        const validationSchema = forgotPasswordChangeSchema(data.locale as ApplicationLanguage)

        // Validáljuk a kliens felől érkező adatokat
        await validationSchema.client().validate(data);

        // Megkeressük a felhasználót
        const userID = verifyToken(data.token);
        const user = await prisma.user.findFirst({where: {id: userID as number}});

        // Validáljuk, hogy a felhasználó rendben van e
        await validationSchema.server().validate(user)

        // Elkészítjük a frissítendő adatokat
        const updateData = {
            password: await hashPassword(data.password),
        };

        // Frissítjük az adatbázist
        await prisma.user.update({data: updateData, where: {id: userID as number}});

        // Visszatérünk a válasszal
        return {
            success: true,
        };
    } catch (error){
        // Hibakezelés
        throw APIError.aborted(error as string);
    }
}
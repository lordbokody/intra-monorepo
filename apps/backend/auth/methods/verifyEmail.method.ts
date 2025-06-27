import {verifyToken} from "@intra/shared/utils/token.util";
import {prisma} from "../../database/prisma/database";
import {APIError, Header} from "encore.dev/api";
import {VerifyEmailDto, VerifyEmailResponse} from "@intra/shared/types/auth.types";
import {verifyEmailSchema} from "@intra/shared/schemas/auth/verifyEmail.schema";
import {RegistrationStatus} from "@intra/shared/types/user.types";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Kiegészítjük a Dto-t a Header nyelvi értékével
 */
export interface VerifyEmailParams extends VerifyEmailDto {
    locale: Header<"Accept-Language">;
}

/**
 * Felhasználó email címének megerősítésére szolgáló metódus.
 */
export const verifyEmailMethod = async (data: VerifyEmailParams): Promise<VerifyEmailResponse> => {
    try {
        // Létrehozzuk a validáló sémát
        const validationSchema = verifyEmailSchema(data.locale as ApplicationLanguage)

        // Validáljuk a kliens oldali adatokat
        await validationSchema.client().validate(data);

        // Betöltjük a felhasználót
        const userID = verifyToken(data.token);
        const user = await prisma.user.findFirst({where: {id: userID as number}});

        // Validáljuk a szerver oldali adatokat
        await validationSchema.server().validate(user);

        // Elkészítjük a frissítendő adatokat
        const updateData = {
            registrationStatus: "registered" as RegistrationStatus,
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
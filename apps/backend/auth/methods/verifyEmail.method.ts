import {verifyToken} from "@intra/shared/utils/token.util";
import {prisma} from "../../database/prisma/database";
import {APIError} from "encore.dev/api";
import {VerifyEmailDto, VerifyEmailResponse} from "@intra/shared/types/auth.types";
import {verifyEmailSchema} from "@intra/shared/schemas/auth/verifyEmail.schema";
import {RegistrationStatus} from "@intra/shared/types/user.types";

/**
 * Felhasználó email címének megerősítésére szolgáló metódus.
 */
export const verifyEmailMethod = async (data: VerifyEmailDto): Promise<VerifyEmailResponse> => {
    try {
        // Validáljuk a kliens oldali adatokat
        await verifyEmailSchema('hu').client().validate(data);

        // Betöltjük a felhasználót
        const userID = verifyToken(data.token);
        const user = await prisma.user.findFirst({where: {id: userID as number}});

        // Validáljuk a szerver oldali adatokat
        await verifyEmailSchema('hu').server().validate(user);

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
        throw APIError.aborted(error as string);
    }
}
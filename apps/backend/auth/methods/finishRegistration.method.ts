import {FinishRegistrationDto, FinishRegistrationResponse} from "@intra/shared/types/auth.types";
import {APIError} from "encore.dev/api";
import {prisma} from "../../database/prisma/database";
import {hashPassword} from "@intra/shared/utils/password.util";
import {finishRegistrationSchema} from "@intra/shared/schemas/auth/finishRegistration.schema";
import {getAuthData} from "~encore/auth";
import {generateLoginToken} from "@intra/shared/utils/token.util";
import {RegistrationStatus} from "@intra/shared/types/user.types";

/**
 * Részleges regisztráció befejezése
 */
export const finishRegistrationMethod = async (data: FinishRegistrationDto): Promise<FinishRegistrationResponse> => {
    try {
        // Validáljuk a kliens felől érkező adatokat
        await finishRegistrationSchema('hu').client().validate(data);

        // Megkeressük a felhasználót
        const id = Number(getAuthData()?.userID);
        const user = await prisma.user.findFirst({ where: { id } });

        // Validáljuk a szerver oldali adatokat
        await finishRegistrationSchema('hu').server().validate(user)

        // Elkészítjük a frissítendő adatokat
        const updateData = {
            name: data.name || user?.name,
            password: await hashPassword(data.password),
            email: data.email || user?.email,
            birthday: data.birthday,
            registrationStatus: "registered" as RegistrationStatus,
        };

        // Frissítjük az adatbázist
        const updated = await prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                birthday: true,
                registrationStatus: true,
                role: true,
            },
        });

        // Visszatérünk a válasszal
        return {
            success: true,
            user: updated,
            token: generateLoginToken(
                updated.id,
                updated.email,
                updated.role,
                updated.registrationStatus
            ),
        };
    } catch (error){
        throw APIError.aborted(error as string);
    }
}
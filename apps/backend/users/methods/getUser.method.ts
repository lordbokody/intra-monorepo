import {getAuthData} from "~encore/auth";
import {prisma} from "../../database/prisma/database";
import {APIError, Header} from "encore.dev/api";
import {GetUserDto, GetUserResponse, UserDto} from "@intra/shared/types/user.types";
import {getUserSchema} from "@intra/shared/schemas/user/getUser.schema";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Kiegészítjük a Dto-t a Header nyelvi értékével
 */
export interface GetUserParams extends GetUserDto {
    locale: Header<"Accept-Language">;
}

/**
 * Adott felhasználó adatainak lekérésére szolgáló metódus.
 */
export const getUserMethod = async (data: GetUserParams): Promise<GetUserResponse> => {
    try {
        // Lekérjük az authentikációs adatokat
        const role = getAuthData()?.role;
        const registrationStatus = getAuthData()?.registrationStatus;

        // Létrehozzuk a validáló sémát
        const validationSchema = getUserSchema(data.locale as ApplicationLanguage)

            // Validáljuk az authentikáció adatokat
        await validationSchema.auth().validate(true, {
            context: {
                registrationStatus: registrationStatus,
                role: role,
            },
        })

        // Validáljuk a kliens felől érkező adatokat
        await validationSchema.client().validate(data);

        // Lekérjük a felhasználót
        const user = await prisma.user.findFirst({
            where: { id: data.id },
            select: {
                id: true,
                name: true,
                email: true,
                birthday: true,
                registrationStatus: true,
                role: true,
            },
        });

        // Validáljuk a szerver oldali adatoakt
        await validationSchema.server().validate(user);

        // Visszatérünk a válasszal
        return {
            success: true,
            user: user as UserDto,
        };
    } catch (error){
        // Hibakezelés
        throw APIError.aborted(error as string);
    }
}
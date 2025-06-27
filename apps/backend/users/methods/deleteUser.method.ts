
import {prisma} from "../../database/prisma/database";
import {APIError, Header} from "encore.dev/api";
import {DeleteUserDto, DeleteUserResponse} from "@intra/shared/types/user.types";
import {getAuthData} from "~encore/auth";
import {deleteUserSchema} from "@intra/shared/schemas/user/deleteUser.schema";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Kiegészítjük a Dto-t a Header nyelvi értékével
 */
export interface DeleteUserParams extends DeleteUserDto {
    locale: Header<"Accept-Language">;
}

/**
 * Adott felhasználó adatinak módosítása
 */
export const deleteUserMethod = async (data: DeleteUserParams): Promise<DeleteUserResponse> => {
    try {
        // Létrehozzuk a validáló sémát
        const validationSchema = deleteUserSchema(data.locale as ApplicationLanguage)

            // Validáljuk a kliens oldali adatokat
        await validationSchema.client().validate(data);

        // Validáljuk az authentikációs adatokat
        await validationSchema.auth().validate(data, {
            context: {
                role: getAuthData()?.role,
                id: Number(getAuthData()?.userID),
            },
        });

        // Lekérjük a felhasználót
        const user = await prisma.user.findFirst({ where: { id: data.id } });

        // Validáljuk a szerver oldali adatokat
        await validationSchema.server().validate(user)

        // Töröljük a felhasználót
        await prisma.user.delete({ where: { id: data.id } });

        // Visszatérünk a válasszal
        return {
            success: true,
        };
    } catch (error){
        // Hibakezelés
        throw APIError.aborted(error as string);
    }
}
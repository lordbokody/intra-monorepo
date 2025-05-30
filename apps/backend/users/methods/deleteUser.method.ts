
import {prisma} from "../../database/prisma/database";
import {APIError} from "encore.dev/api";
import {DeleteUserDto, DeleteUserResponse} from "@intra/shared/types/user.types";
import {getAuthData} from "~encore/auth";
import {deleteUserSchema} from "@intra/shared/schemas/user/deleteUser.schema";

/**
 * Adott felhasználó adatinak módosítása
 */
export const deleteUserMethod = async (data: DeleteUserDto): Promise<DeleteUserResponse> => {
    try {
        // Validáljuk a kliens oldali adatokat
        await deleteUserSchema('hu').client().validate(data);

        // Validáljuk az authentikációs adatokat
        await deleteUserSchema('hu').auth().validate(data, {
            context: {
                role: getAuthData()?.role,
                id: Number(getAuthData()?.userID),
            },
        });

        // Lekérjük a felhasználót
        const user = await prisma.user.findFirst({ where: { id: data.id } });

        // Validáljuk a szerver oldali adatokat
        await deleteUserSchema('hu').server().validate(user)

        // Töröljük a felhasználót
        await prisma.user.delete({ where: { id: data.id } });

        // Visszatérünk a válasszal
        return {
            success: true,
        };
    } catch (error){
        throw APIError.aborted(error as string);
    }
}
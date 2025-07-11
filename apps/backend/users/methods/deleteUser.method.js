import { prisma } from "../../database/prisma/database.js";
import { APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import { deleteUserSchema } from "./deleteUser/deleteUser.schema.js";
/**
 * Adott felhasználó adatinak módosítása
 */
export const deleteUserMethod = async (data) => {
    try {
        await deleteUserSchema.validate(data);
        const role = getAuthData()?.role;
        const id = Number(getAuthData()?.userID);
        if (role !== 'admin' && id !== data.id) {
            return {
                success: false,
                message: "Csak a saját felhasználódat törölheted!",
            };
        }
        const user = await prisma.user.findFirst({ where: { id: data.id } });
        if (!user) {
            return {
                success: false,
                message: "Felhasználó nem található!",
            };
        }
        await prisma.user.delete({ where: { id: data.id } });
        return {
            success: true,
        };
    }
    catch (error) {
        throw APIError.aborted(error);
    }
};
//# sourceMappingURL=deleteUser.method.js.map
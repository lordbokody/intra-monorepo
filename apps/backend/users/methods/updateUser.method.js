import { APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import { updateUserSchema } from "./updateUser/updateUser.schema.js";
import { prisma } from "../../database/prisma/database.js";
import { hashPassword } from "../../utils/password.util.js";
/**
 * Adott felhasználó adatinak módosítása.
 */
export const updateUserMethod = async (data) => {
    try {
        const authRole = getAuthData()?.role;
        const authId = Number(getAuthData()?.userID);
        if (authRole !== 'admin' && authId !== data.id) {
            return {
                success: false,
                message: "Csak a saját felhasználód adatait szerkesztheted!",
            };
        }
        if (authRole === 'admin' && authId !== data.id && data.password) {
            return {
                success: false,
                message: "Csak a saját jelszavad módosíthatod!",
            };
        }
        if (authRole !== 'admin' && data.role) {
            return {
                success: false,
                message: "Szerepkört csak admin módosíthat!",
            };
        }
        await updateUserSchema.validate(data);
        const user = await prisma.user.findFirst({ where: { id: data.id } });
        if (!user) {
            return {
                success: false,
                message: "Felhasználó nem található!",
            };
        }
        user.name = data.name || user.name;
        if (data.password) {
            user.password = await hashPassword(data.password);
        }
        user.email = data.email || user.email;
        user.birthday = data.birthday || user.birthday;
        user.role = data.role || user.role;
        const updated = await prisma.user.update({ data: user, where: { id: data.id } });
        return {
            success: true,
            user: updated,
        };
    }
    catch (error) {
        throw APIError.aborted(error);
    }
};
//# sourceMappingURL=updateUser.method.js.map
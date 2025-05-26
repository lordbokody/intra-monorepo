import { APIError } from "encore.dev/api";
import { prisma } from "../../../database/prisma/database";
import { hashPassword } from "../../../utils/password";
import { finishRegistrationSchema } from "./finishRegistration.schema";
import { getAuthData } from "~encore/auth";
import { generateLoginToken } from "../../../utils/token";
/**
 * Részleges regisztráció befejezése
 */
export const finishRegistrationMethod = async (data) => {
    try {
        const id = Number(getAuthData()?.userID);
        await finishRegistrationSchema.validate(data);
        const user = await prisma.user.findFirst({ where: { id } });
        if (!user) {
            return {
                success: false,
                message: "Felhasználó nem található!",
            };
        }
        if (user.registrationStatus !== 'partialRegistration') {
            return {
                success: false,
                message: "Hibás regisztrációs státusz!",
            };
        }
        user.name = data.name || user.name;
        user.password = await hashPassword(data.password);
        user.email = data.email || user.email;
        user.birthday = data.birthday;
        user.registrationStatus = 'registered';
        const updated = await prisma.user.update({
            where: { id },
            data: user,
            select: {
                id: true,
                name: true,
                email: true,
                birthday: true,
                registrationStatus: true,
                role: true,
            }
        });
        return {
            success: true,
            user: updated,
            token: generateLoginToken(updated.id, updated.email, updated.role, updated.registrationStatus)
        };
    }
    catch (error) {
        throw APIError.aborted(error);
    }
};
//# sourceMappingURL=finishRegistration.method.js.map
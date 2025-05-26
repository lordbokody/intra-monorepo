import { verifyEmailConfirmationToken } from "../../../utils/token";
import { prisma } from "../../../database/prisma/database";
import { APIError } from "encore.dev/api";
import { forgotPasswordChangeSchema } from "./forgotPasswordChange.schema";
import { hashPassword } from "../../../utils/password";
/**
 * Elfelejtett jelszó módosítására szolgáló metódus.
 */
export const forgotPasswordChangeMethod = async (data) => {
    try {
        await forgotPasswordChangeSchema.validate(data);
        const userID = verifyEmailConfirmationToken(data.token);
        if (!userID) {
            return {
                success: false,
                message: "Hibás vagy lejárt token!",
            };
        }
        const user = await prisma.user.findFirst({ where: { id: userID } });
        if (!user) {
            return {
                success: false,
                message: "Felhasználó nem található!",
            };
        }
        user.password = await hashPassword(data.password);
        await prisma.user.update({ data: user, where: { id: userID } });
        return {
            success: true,
        };
    }
    catch (error) {
        throw APIError.aborted(error);
    }
};
//# sourceMappingURL=forgotPasswordChange.method.js.map
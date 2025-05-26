import { verifyEmailConfirmationToken } from "../../../utils/token";
import { prisma } from "../../../database/prisma/database";
import { APIError } from "encore.dev/api";
import { verifyEmailSchema } from "./verifyEmail.schema";
/**
 * Felhasználó email címének megerősítésére szolgáló metódus.
 */
export const verifyEmailMethod = async (data) => {
    try {
        await verifyEmailSchema.validate(data);
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
        if (user.registrationStatus === 'registered' || user.registrationStatus === 'partialRegistration') {
            return {
                success: false,
                message: "Felhasználó email címe már megerősítve!",
            };
        }
        user.registrationStatus = "registered";
        await prisma.user.update({ data: user, where: { id: userID } });
        return {
            success: true,
        };
    }
    catch (error) {
        throw APIError.aborted(error);
    }
};
//# sourceMappingURL=verifyEmail.method.js.map
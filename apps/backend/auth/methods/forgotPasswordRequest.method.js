import { prisma } from "../../database/prisma/database.js";
import { generateEmailConfirmationToken } from "../../utils/token.util.js";
import { APIError } from "encore.dev/api";
import { forgotPasswordRequestSchema } from "./forgotPasswordRequest.schema";
import { sendForgotPasswordEmail } from "../../email/email.controller.js";
/**
 * Elfelejtett jelszó megújítására szolgáló metódus.
 */
export const forgotPasswordRequestMethod = async (data) => {
    try {
        await forgotPasswordRequestSchema.validate(data);
        const user = await prisma.user.findFirst({ where: { email: data.email } });
        if (!user) {
            return {
                success: false,
                message: "Felhasználó nem található!",
            };
        }
        if (user.registrationStatus === 'emailNotConfirmed') {
            return {
                success: false,
                message: "Felhasználó email címe nincs megerősítve!",
            };
        }
        if (user.registrationStatus === 'partialRegistration') {
            return {
                success: false,
                message: "Nincs jelszó beállítva! Kérjük jelentkezz be Google/Facebook használatával!",
            };
        }
        await sendForgotPasswordEmail({
            token: generateEmailConfirmationToken(user.id),
            name: user.name,
            email: user.email
        });
        return {
            success: true,
        };
    }
    catch (error) {
        throw APIError.aborted(error);
    }
};
//# sourceMappingURL=forgotPasswordRequest.method.js.map
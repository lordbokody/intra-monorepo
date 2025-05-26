import { loginSchema } from "./login/login.schema.js";
import { prisma } from "../../database/prisma/database.js";
import { generateLoginToken } from "../../utils/token.util.js";
import { APIError } from "encore.dev/api";
import { comparePassword } from "../../utils/password.util.js";
/**
 * Bejelentkezésre szólgálú metódus.
 */
export const loginMethod = async (data) => {
    try {
        await loginSchema.validate(data);
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
                message: "Csak Google/Facebook segítségével tudsz bejelentkezni!",
            };
        }
        if (!await comparePassword(data.password, user.password)) {
            return {
                success: false,
                message: "Hibás jelszó!",
            };
        }
        const { password, ...safeUser } = user;
        return {
            success: true,
            token: generateLoginToken(user.id, user.email, user.role, 'registered'),
            user: safeUser
        };
    }
    catch (error) {
        throw APIError.aborted(error);
    }
};
//# sourceMappingURL=login.method.js.map
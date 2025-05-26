import { prisma } from "../../../database/prisma/database";
import { generateLoginToken } from "../../../utils/token";
import { APIError } from "encore.dev/api";
import { loginOAuthSchema } from "./loginOAuth.schema";
/**
 * OAuth regisztráció/belépés
 */
export const loginOAuthMethod = async (data) => {
    try {
        await loginOAuthSchema.validate(data);
        let user = await prisma.user.findFirst({ where: { email: data.email } });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: null,
                    birthday: null,
                    role: "unverified",
                    registrationStatus: "partialRegistration"
                }
            });
        }
        if (user.registrationStatus === 'registered' || user.registrationStatus === 'partialRegistration') {
            return {
                success: true,
                registrationStatus: user.registrationStatus,
                role: user.role,
                token: generateLoginToken(user.id, user.email, user.role, user.registrationStatus),
            };
        }
        return { success: false };
    }
    catch (error) {
        throw APIError.aborted(error);
    }
};
//# sourceMappingURL=loginOAuth.method.js.map
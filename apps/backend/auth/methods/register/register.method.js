import { prisma } from "../../../database/prisma/database";
import { generateEmailConfirmationToken } from "../../../utils/token";
import { APIError } from "encore.dev/api";
import { registerSchema } from "./register.schema";
import { hashPassword } from "../../../utils/password";
import { sendRegisterEmail } from "../../../email/email.controller";
/**
* Felhasználó létrehozására szolgáló metódus.
*/
export const registerMethod = async (data) => {
    try {
        await registerSchema.validate(data);
        const user = await prisma.user.create({
            data: {
                name: data.name,
                password: await hashPassword(data.password),
                email: data.email,
                birthday: data.birthday,
                role: "unverified",
                registrationStatus: "emailNotConfirmed"
            }
        });
        const token = generateEmailConfirmationToken(user.id);
        await sendRegisterEmail({
            token,
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
//# sourceMappingURL=register.method.js.map
import { prisma } from "../../../database/prisma/database";
import { APIError } from "encore.dev/api";
import { findOneByEmailSchema } from "./findOneByEmail.schema";
/**
 * Felhasználó megkeresésére szolgáló metódus email cím alapján.
 */
export const findOneByEmailMethod = async (data) => {
    try {
        await findOneByEmailSchema.validate(data);
        const user = await prisma.user.findFirst({ where: { email: data.email } });
        if (!user) {
            return {
                success: false,
                message: "Felhasználó nem található!",
            };
        }
        return {
            success: true,
        };
    }
    catch (error) {
        throw APIError.aborted(error);
    }
};
//# sourceMappingURL=findOneByEmail.method.js.map
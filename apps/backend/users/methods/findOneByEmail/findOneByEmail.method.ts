import {prisma} from "../../../database/prisma/database";
import {APIError} from "encore.dev/api";
import {FindOneByEmailDto, FindOneByEmailResponse} from "@intra/shared/types/user.types";
import {findOneByEmailSchema} from "./findOneByEmail.schema";

/**
 * Felhasználó megkeresésére szolgáló metódus email cím alapján.
 */
export const findOneByEmailMethod = async (data: FindOneByEmailDto): Promise<FindOneByEmailResponse> => {
    try {
        await findOneByEmailSchema.validate(data);

        const user = await prisma.user.findFirst({where: {email: data.email}});
        if (!user) {
            return {
                success: false,
                message: "Felhasználó nem található!",
            };
        }
        return {
            success: true,
        };
    } catch (error){
        throw APIError.aborted(error as string);
    }
}
import {prisma} from "../../database/prisma/database";
import {APIError} from "encore.dev/api";
import {FindOneByEmailDto, FindOneByEmailResponse} from "@intra/shared/types/user.types";
import {findOneByEmailSchema} from "@intra/shared/schemas/user/findOneByEmail.schema";

/**
 * Felhasználó megkeresésére szolgáló metódus email cím alapján.
 */
export const findOneByEmailMethod = async (data: FindOneByEmailDto): Promise<FindOneByEmailResponse> => {
    try {
        // Validáljuk a kliens oldali adatokat
        await findOneByEmailSchema('hu').client().validate(data);

        // Betöltjük a felhasználót
        const user = await prisma.user.findFirst({where: {email: data.email}});

        // Validáljuk a szerver oldali adatokat
        await findOneByEmailSchema('hu').server().validate(user)

        // Visszatérünk a válasszal
        return {
            success: true,
        };
    } catch (error){
        throw APIError.aborted(error as string);
    }
}
import {prisma} from "../../database/prisma/database";
import {APIError, Header} from "encore.dev/api";
import {FindOneByEmailDto, FindOneByEmailResponse} from "@intra/shared/types/user.types";
import {findOneByEmailSchema} from "@intra/shared/schemas/user/findOneByEmail.schema";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Kiegészítjük a Dto-t a Header nyelvi értékével
 */
export interface FindOneByEmailParams extends FindOneByEmailDto {
    locale?: Header<"Accept-Language">;
}

/**
 * Felhasználó megkeresésére szolgáló metódus email cím alapján.
 */
export const findOneByEmailMethod = async (data: FindOneByEmailParams): Promise<FindOneByEmailResponse> => {
    try {
        // Létrehozzuk a validáló sémát
        const validationSchema = findOneByEmailSchema(data.locale as ApplicationLanguage)

        // Validáljuk a kliens oldali adatokat
        await validationSchema.client().validate(data);

        // Betöltjük a felhasználót
        const user = await prisma.user.findFirst({where: {email: data.email}});

        // Visszatérünk a válasszal
        return {
            success: !!user,
        };
    } catch (error){
        // Hibakezelé
        throw APIError.aborted(error as string);
    }
}
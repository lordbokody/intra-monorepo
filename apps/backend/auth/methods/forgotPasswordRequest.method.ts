import {prisma} from "../../database/prisma/database";
import {generateEmailConfirmationToken} from "@intra/shared/utils/token.util";
import {APIError, Header} from "encore.dev/api";
import {ForgotPasswordRequestDto, ForgotPasswordRequestResponse} from "@intra/shared/types/auth.types"
import {forgotPasswordRequestSchema} from "@intra/shared/schemas/auth/forgotPasswordRequest.schema";
import {sendForgotPasswordEmail} from "../../email/email.controller";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Kiegészítjük a Dto-t a Header nyelvi értékével
 */
export interface ForgotPasswordRequestParams extends ForgotPasswordRequestDto {
    locale: Header<"Accept-Language">;
}

/**
 * Elfelejtett jelszó megújítására szolgáló metódus.
 */
export const forgotPasswordRequestMethod = async (data: ForgotPasswordRequestParams): Promise<ForgotPasswordRequestResponse> => {
    try {
        // Létrehozzuk a validáló sémát
        const validationSchema = forgotPasswordRequestSchema(data.locale as ApplicationLanguage)

        // Validáljuk a kliens felől érkező adatokat
        await validationSchema.client().validate(data);

        // Megkeressük a felhasználót
        const user = await prisma.user.findFirst({where: {email: data.email}});

        // Validáljuk, hogy a felhasználó rendben van e
        await validationSchema.server().validate(user)

        // Elküldjük a helyreállításhoz szükséges emailt
        await sendForgotPasswordEmail({
            token: generateEmailConfirmationToken(user?.id as number),
            name: user?.name as string,
            email: user?.email as string
        })

        // Visszatérünk a válasszal
        return {
            success: true,
        };
    } catch (error){
        // Hibakezelés
        throw APIError.aborted(error as string);
    }
}
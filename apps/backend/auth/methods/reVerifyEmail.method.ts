import {prisma} from "../../database/prisma/database";
import {generateEmailConfirmationToken} from "@intra/shared/utils/token.util";
import {APIError, Header} from "encore.dev/api";
import {ReVerifyEmailDto, ReVerifyEmailResponse} from "@intra/shared/types/auth.types";
import {reVerifyEmailSchema} from "@intra/shared/schemas/auth/reVerifyEmail.schema";
import {sendRegisterEmail} from "../../email/email.controller";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Kiegészítjük a Dto-t a Header nyelvi értékével
 */
export interface ReVerifyEmailParams extends ReVerifyEmailDto {
    locale: Header<"Accept-Language">;
}

/**
 * Újabb felhasználói megerősítő email kiküldésére szolgáló metódus.
 */
export const reVerifyEmailMethod = async (data: ReVerifyEmailParams): Promise<ReVerifyEmailResponse> => {
    try {
        // Létrehozzuk a validáló sémát
        const validationSchema = reVerifyEmailSchema(data.locale as ApplicationLanguage)

        // Validáljuk a kliens felől érkező adatokat
        await validationSchema.client().validate(data);

        // Betöltjük a felhasználót
        const user = await prisma.user.findFirst({where: {email: data.email}});

        // Validáljuk a szerver oldali adatokat
        await validationSchema.server().validate(user);

        // Elküldjük a megerősítésre szolgáló emailt
        await sendRegisterEmail({
            token: generateEmailConfirmationToken(user?.id as number),
            name: user?.name as string,
            email: user?.email as string,
            locale: data.locale as ApplicationLanguage,
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
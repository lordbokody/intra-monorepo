import {prisma} from "../../database/prisma/database";
import {generateEmailConfirmationToken} from "@intra/shared/utils/token.util";
import {APIError} from "encore.dev/api";
import {ReVerifyEmailDto, ReVerifyEmailResponse} from "@intra/shared/types/auth.types";
import {reVerifyEmailSchema} from "@intra/shared/schemas/auth/reVerifyEmail.schema";
import {sendRegisterEmail} from "../../email/email.controller";

/**
 * Újabb felhasználói megerősítő email kiküldésére szolgáló metódus.
 */
export const reVerifyEmailMethod = async (data: ReVerifyEmailDto): Promise<ReVerifyEmailResponse> => {
    try {
        // Validáljuk a kliens felől érkező adatokat
        await reVerifyEmailSchema('hu').client().validate(data);

        // Betöltjük a felhasználót
        const user = await prisma.user.findFirst({where: {email: data.email}});

        // Validáljuk a szerver oldali adatokat
        await reVerifyEmailSchema('hu').server().validate(user);

        // Elküldjük a megerősítésre szolgáló emailt
        await sendRegisterEmail({
            token: generateEmailConfirmationToken(user?.id as number),
            name: user?.name as string,
            email: user?.email as string
        })

        // Visszatérünk a válasszal
        return {
            success: true,
        };
    } catch (error){
        throw APIError.aborted(error as string);
    }
}
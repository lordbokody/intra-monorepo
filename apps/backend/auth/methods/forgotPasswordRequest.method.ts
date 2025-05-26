import {prisma} from "../../database/prisma/database";
import {generateEmailConfirmationToken} from "@intra/shared/utils/token.util";
import {APIError} from "encore.dev/api";
import {ForgotPasswordRequestDto, ForgotPasswordRequestResponse} from "@intra/shared/types/auth.types"
import {forgotPasswordRequestSchema} from "@intra/shared/schemas/auth/forgotPasswordRequest.schema";
import {sendForgotPasswordEmail} from "../../email/email.controller";

/**
 * Elfelejtett jelszó megújítására szolgáló metódus.
 */
export const forgotPasswordRequestMethod = async (data: ForgotPasswordRequestDto): Promise<ForgotPasswordRequestResponse> => {
    try {
        // Validáljuk a kliens felől érkező adatokat
        await forgotPasswordRequestSchema('hu').client().validate(data);

        // Megkeressük a felhasználót
        const user = await prisma.user.findFirst({where: {email: data.email}});

        // Validáljuk, hogy a felhasználó rendben van e
        await forgotPasswordRequestSchema('hu').server().validate(user)

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
        throw APIError.aborted(error as string);
    }
}
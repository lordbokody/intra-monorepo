import {prisma} from "../../../database/prisma/database";
import {generateEmailConfirmationToken} from "../../../utils/token";
import {APIError} from "encore.dev/api";
import {ForgotPasswordRequestDto, ForgotPasswordRequestResponse} from "@intra/shared/types/auth.types"
import {forgotPasswordRequestSchema} from "./forgotPasswordRequest.schema";
import {sendForgotPasswordEmail} from "../../../email/email.controller";

/**
 * Elfelejtett jelszó megújítására szolgáló metódus.
 */
export const forgotPasswordRequestMethod = async (data: ForgotPasswordRequestDto): Promise<ForgotPasswordRequestResponse> => {
    try {
        await forgotPasswordRequestSchema.validate(data);

        const user = await prisma.user.findFirst({where: {email: data.email}});
        if (!user) {
            return {
                success: false,
                message: "Felhasználó nem található!",
            };
        }
        if(user.registrationStatus === 'emailNotConfirmed'){
            return {
                success: false,
                message: "Felhasználó email címe nincs megerősítve!",
            };
        }
        if(user.registrationStatus === 'partialRegistration'){
            return {
                success: false,
                message: "Nincs jelszó beállítva! Kérjük jelentkezz be Google/Facebook használatával!",
            };
        }
        await sendForgotPasswordEmail({
            token: generateEmailConfirmationToken(user.id),
            name: user.name,
            email: user.email
        })
        return {
            success: true,
        };
    } catch (error){
        throw APIError.aborted(error as string);
    }
}
import {prisma} from "../../../database/prisma/database";
import {generateEmailConfirmationToken} from "../../../utils/token";
import {APIError} from "encore.dev/api";
import {ReVerifyEmailDto, ReVerifyEmailResponse} from "@intra/shared/types/auth.types";
import {reVerifyEmailSchema} from "./reVerifyEmail.schema";
import {sendRegisterEmail} from "../../../email/email.controller";

/**
 * Újabb felhasználói megerősítő email kiküldésére szolgáló metódus.
 */
export const reVerifyEmailMethod = async (data: ReVerifyEmailDto): Promise<ReVerifyEmailResponse> => {
    try {
        await reVerifyEmailSchema.validate(data);

        const user = await prisma.user.findFirst({where: {email: data.email}});
        if (!user) {
            return {
                success: false,
                message: "Felhasználó nem található!",
            };
        }
        if(user.registrationStatus === 'registered' || user.registrationStatus === 'partialRegistration'){
            return {
                success: false,
                message: "Felhasználó email címe már megerősítve!",
            };
        }
        await sendRegisterEmail({
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
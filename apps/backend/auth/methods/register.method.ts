import {prisma} from "../../database/prisma/database";
import {generateEmailConfirmationToken} from "@intra/shared/utils/token.util";
import {APIError} from "encore.dev/api";
import {RegisterDto, RegisterResponse} from "@intra/shared/types/auth.types";
import {registerSchema} from "@intra/shared/schemas/auth/register.schema";
import {hashPassword} from "@intra/shared/utils/password.util";
import {sendRegisterEmail} from "../../email/email.controller";
import {checkEmailExists} from "../../utils/checkEmailExists.util";

/**
* Felhasználó létrehozására szolgáló metódus.
*/
export const registerMethod = async (data: RegisterDto): Promise<RegisterResponse> => {
    try {
        // Validáljuk a kliens felől érkező adatokat
        await registerSchema('hu').client(checkEmailExists).validate(data);

        // Létrehozzuk a felhasználót
        const user = await prisma.user.create({
            data: {
                name: data.name as string,
                password: await hashPassword(data.password),
                email: data.email as string,
                birthday: data.birthday,
                role: "unverified",
                registrationStatus: "emailNotConfirmed"
            }
        });

        // Elküldjük a regisztráció megerősítésére szolgáló emailt
        await sendRegisterEmail({
            token: generateEmailConfirmationToken(user.id),
            name: user.name,
            email: user.email
        });

        // Visszatérünk a válasszal
        return {
            success: true,
        };
    } catch (error){
        throw APIError.aborted(error as string);
    }
}
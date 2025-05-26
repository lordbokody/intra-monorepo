import {loginSchema} from "./login.schema";
import {prisma} from "../../../database/prisma/database";
import {generateLoginToken} from "../../../utils/token";
import {APIError} from "encore.dev/api";
import {LoginDto, LoginResponse} from "@intra/shared/types/auth.types";
import {comparePassword} from "../../../utils/password";

/**
 * Bejelentkezésre szólgálú metódus.
 */
export const loginMethod = async (data: LoginDto): Promise<LoginResponse> => {
    try {
        await loginSchema.validate(data);

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
                message: "Csak Google/Facebook segítségével tudsz bejelentkezni!",
            };
        }
        if(!await comparePassword(data.password, user.password as string)){
            return {
                success: false,
                message: "Hibás jelszó!",
            };
        }

        const { password, ...safeUser } = user;

        return {
            success: true,
            token: generateLoginToken(user.id, user.email, user.role, 'registered'),
            user: safeUser
        };
    } catch (error){
        throw APIError.aborted(error as string);
    }
}
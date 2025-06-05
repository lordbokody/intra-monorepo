import {finishRegistrationMethod} from "./methods/finishRegistration.method";
import type {ApplicationLanguage,} from "@intra/shared/types/common.types";
import {FinishRegistrationDto, VerifyEmailDto, LoginDto, RegisterDto} from "@intra/shared/types/auth.types";
import {FindOneByEmailDto} from "@intra/shared/types/user.types";
import {verifyEmailMethod} from "./methods/verifyEmail.method";
import {loginMethod} from "./methods/login.method";
import {registerMethod} from "./methods/register.method";
import {findOneByEmailMethod} from "./methods/findOneByEmail.method";

export const ApiService = {
    // Authentikációra szolgáló endpointok
    auth: {
        finishRegistration: async (data: FinishRegistrationDto, language: ApplicationLanguage, token: string) => {
            return await finishRegistrationMethod(data, language, token);
        },
            verifyEmail: async (data: VerifyEmailDto, language: ApplicationLanguage) => {
            return await verifyEmailMethod(data, language);
        },
            login: async (data: LoginDto, language: ApplicationLanguage) => {
            return await loginMethod(data, language);
        },
            register: async (data: RegisterDto, language: ApplicationLanguage) => {
            return await registerMethod(data, language);
        },
    },
    // Felhasználókkal kapcsolatos endpointok
    user: {
        findOneByEmail: async (data: FindOneByEmailDto, language: ApplicationLanguage) => {
            return await findOneByEmailMethod(data, language)
        }
    },
}
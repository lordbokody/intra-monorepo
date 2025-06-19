import {finishRegistrationMethod} from "./methods/auth/finishRegistration.method";
import type {ApplicationLanguage,} from "@intra/shared/types/common.types";
import {
    FinishRegistrationDto,
    VerifyEmailDto,
    LoginDto,
    RegisterDto,
    ForgotPasswordRequestDto,
    ForgotPasswordChangeDto, VerifyTokenDto, ReVerifyEmailDto
} from "@intra/shared/types/auth.types";
import {FindOneByEmailDto} from "@intra/shared/types/user.types";
import {verifyEmailMethod} from "./methods/auth/verifyEmail.method";
import {loginMethod} from "./methods/auth/login.method";
import {registerMethod} from "./methods/auth/register.method";
import {findOneByEmailMethod} from "./methods/user/findOneByEmail.method";
import {forgotPasswordRequestMethod} from "./methods/auth/forgotPasswordRequest.method";
import {forgotPasswordChangeMethod} from "./methods/auth/forgotPasswordChange.method";
import {verifyTokenMethod} from "./methods/auth/verifyToken.method";
import {reverifyEmailMethod} from "./methods/auth/reverifyEmail.method";

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
        forgotPasswordRequest: async (data: ForgotPasswordRequestDto, language: ApplicationLanguage) => {
            return await forgotPasswordRequestMethod(data, language);
        },
        forgotPasswordChange: async (data: ForgotPasswordChangeDto, language: ApplicationLanguage) => {
            return await forgotPasswordChangeMethod(data, language);
        },
        verifyToken: async (data: VerifyTokenDto, language: ApplicationLanguage) => {
            return await verifyTokenMethod(data, language);
        },
        reverifyEmail: async (data: ReVerifyEmailDto, language: ApplicationLanguage) => {
            return await reverifyEmailMethod(data, language);
        }
    },
    // Felhasználókkal kapcsolatos endpointok
    user: {
        findOneByEmail: async (data: FindOneByEmailDto, language: ApplicationLanguage) => {
            return await findOneByEmailMethod(data, language)
        }
    },
}
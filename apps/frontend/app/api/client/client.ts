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
import {reVerifyEmailMethod} from "./methods/auth/reverifyEmail.method";

/**
 * Api service
 * FONTOS
 * Aszerint kell rendezni az objektumokat hogy kövesse a backend serviceit!!!
 */
export const ApiService = {
    // Authentikációra szolgáló endpointok
    auth: {
        // Regisztráció befejezése
        finishRegistration: async (data: FinishRegistrationDto, language: ApplicationLanguage, token: string) => {
            return await finishRegistrationMethod(data, language, token);
        },
        // Email megerősítése
        verifyEmail: async (data: VerifyEmailDto, language: ApplicationLanguage) => {
            return await verifyEmailMethod(data, language);
        },
        // Bejelentkezés
        login: async (data: LoginDto, language: ApplicationLanguage) => {
            return await loginMethod(data, language);
        },
        // Regisztráció
        register: async (data: RegisterDto, language: ApplicationLanguage) => {
            return await registerMethod(data, language);
        },
        // Elfelejtett jelszó kérelem
        forgotPasswordRequest: async (data: ForgotPasswordRequestDto, language: ApplicationLanguage) => {
            return await forgotPasswordRequestMethod(data, language);
        },
        // Elfelejtett jelszó megváltoztatása
        forgotPasswordChange: async (data: ForgotPasswordChangeDto, language: ApplicationLanguage) => {
            return await forgotPasswordChangeMethod(data, language);
        },
        // Token ellenőrzése
        verifyToken: async (data: VerifyTokenDto, language: ApplicationLanguage) => {
            return await verifyTokenMethod(data, language);
        },
        // Újbóli megerősítő email kérése
        reVerifyEmail: async (data: ReVerifyEmailDto, language: ApplicationLanguage) => {
            return await reVerifyEmailMethod(data, language);
        }
    },
    // Felhasználókkal kapcsolatos endpointok
    user: {
        // Felhasználó megkeresése email alapján
        findOneByEmail: async (data: FindOneByEmailDto, language: ApplicationLanguage) => {
            return await findOneByEmailMethod(data, language)
        }
    },
}
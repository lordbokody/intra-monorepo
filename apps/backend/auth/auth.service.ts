import { registerMethod } from "./methods/register/register.method";
import { verifyEmailMethod } from "./methods/verifyEmail/verifyEmail.method";
import { reVerifyEmailMethod } from "./methods/reVerifyEmail/reVerifyEmail.method";
import { loginMethod } from "./methods/login/login.method";
import { forgotPasswordRequestMethod } from "./methods/forgotPasswordRequest/forgotPasswordRequest.method";
import { forgotPasswordChangeMethod } from "./methods/forgotPasswordChange/forgotPasswordChange.method";
import { loginOAuthMethod } from "./methods/loginOAuth/loginOAuth.method";
import { finishRegistrationMethod } from "./methods/finishRegistration/finishRegistration.method";
import {
    RegisterDto,
    RegisterResponse,
    VerifyEmailDto,
    VerifyEmailResponse,
    ReVerifyEmailDto,
    ReVerifyEmailResponse,
    LoginDto,
    LoginResponse,
    ForgotPasswordRequestDto,
    ForgotPasswordRequestResponse,
    ForgotPasswordChangeDto,
    ForgotPasswordChangeResponse,
    LoginOAuthDto,
    LoginOAuthResponse,
    FinishRegistrationDto,
    FinishRegistrationResponse
} from "@intra/shared/types/auth.types";

const AuthService = {
    /**
     * Felhasználó létrehozására szolgáló service.
     */
    register: async (data: RegisterDto): Promise<RegisterResponse> => {
        return await registerMethod(data);
    },
    /**
     * Felhasználó email címének megerősítésére szolgáló service.
     */
    verifyEmail: async (data: VerifyEmailDto): Promise<VerifyEmailResponse> => {
        return await verifyEmailMethod(data);
    },
    /**
     * Újabb felhasználói megerősítő email kiküldésére szolgáló service.
     */
    reVerifyEmail: async (data: ReVerifyEmailDto): Promise<ReVerifyEmailResponse> => {
        return await reVerifyEmailMethod(data);
    },
    /**
     * Bejelentkezésre szólgálú service.
     */
    login: async (data: LoginDto): Promise<LoginResponse> => {
        return await loginMethod(data);
    },
    /**
     * Elfelejtett jelszó megújítására szolgáló service.
     */
    forgotPasswordRequest: async (data: ForgotPasswordRequestDto): Promise<ForgotPasswordRequestResponse> => {
        return await forgotPasswordRequestMethod(data)
    },
    /**
     * Elfelejtett jelszó módosítására szolgáló service.
     */
    forgotPasswordChange: async (data: ForgotPasswordChangeDto): Promise<ForgotPasswordChangeResponse> => {
        return await forgotPasswordChangeMethod(data);
    },
    /**
     * OAuth regisztráció/belépés
     */
    loginOAuth: async (data: LoginOAuthDto): Promise<LoginOAuthResponse> => {
        return await loginOAuthMethod(data)
    },
    /**
     * Részleges regisztráció befejezése
     */
    finishRegistration: async (data: FinishRegistrationDto): Promise<FinishRegistrationResponse> => {
        return await finishRegistrationMethod(data);
    }
}

export default AuthService;
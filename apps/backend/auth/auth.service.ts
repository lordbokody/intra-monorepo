import { registerMethod } from "./methods/register.method";
import { verifyEmailMethod } from "./methods/verifyEmail.method";
import { reVerifyEmailMethod } from "./methods/reVerifyEmail.method";
import { loginMethod } from "./methods/login.method";
import { forgotPasswordRequestMethod } from "./methods/forgotPasswordRequest.method";
import { forgotPasswordChangeMethod } from "./methods/forgotPasswordChange.method";
import { loginOAuthMethod } from "./methods/loginOAuth.method";
import { finishRegistrationMethod } from "./methods/finishRegistration.method";
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
    FinishRegistrationResponse, VerifyTokenDto, VerifyTokenResponse
} from "@intra/shared/types/auth.types";
import {verifyTokenMethod} from "./methods/verifyToken.method";

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
    },
    /**
     * Token vizsgálata, hogy érvényes e még, vagy sem
     */
    verifyToken: async (data: VerifyTokenDto): Promise<VerifyTokenResponse> => {
        return await verifyTokenMethod(data);
    }
}

export default AuthService;
import { api } from "encore.dev/api";
import AuthService from "./auth.service"
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
} from "@intra/shared/types/auth.types"

/**
 * Felhasználó létrehozására szolgáló végpont.
 */
export const register = api(
    { expose: true, method: "POST", path: "/auth/register" },
    async (data: RegisterDto): Promise<RegisterResponse> => {
        return await AuthService.register(data);
    },
);

/**
 * Felhasználó email címének megerősítésére szolgáló végpont.
 */
export const verifyEmail = api(
    {expose: true, method: "PATCH", path: "/auth/verifyEmail" },
    async (data: VerifyEmailDto): Promise<VerifyEmailResponse> => {
        return await AuthService.verifyEmail(data)
    }
)

/**
 * Újabb felhasználói megerősítő email kiküldésére szolgáló végpont.
 */
export const reVerifyEmail = api(
    {expose: true, method: "POST", path: "/auth/reverifyEmail" },
    async (data: ReVerifyEmailDto): Promise<ReVerifyEmailResponse> => {
        return await AuthService.reVerifyEmail(data)
    }
)

/**
 * Bejelentkezésre szólgálú végpont.
 */
export const login = api(
    {expose: true, method: "POST", path: "/auth/login" },
    async (data: LoginDto): Promise<LoginResponse> => {
        return await AuthService.login(data)
    }
)

/**
 * Elfelejtett jelszó megújítására szolgáló végpont.
 */
export const forgotPasswordRequest = api(
    {expose: true, method: "POST", path: "/auth/forgotPasswordRequest" },
    async (data: ForgotPasswordRequestDto): Promise<ForgotPasswordRequestResponse> => {
        return await AuthService.forgotPasswordRequest(data)
    }
)

/**
 * Elfelejtett jelszó módosítására szolgáló végpont.
 */
export const forgotPasswordChange = api(
    {expose: true, method: "PUT", path: "/auth/forgotPasswordChange" },
    async (data: ForgotPasswordChangeDto): Promise<ForgotPasswordChangeResponse> => {
        return await AuthService.forgotPasswordChange(data)
    }
)
/**
 * OAuth belépésre/regisztrációra szolgáló végpont.
 */
export const loginOAuth = api(
    {expose: true, method: "POST", path: "/auth/loginOAuth" },
    async (data: LoginOAuthDto): Promise<LoginOAuthResponse> => {
        return await AuthService.loginOAuth(data)
    }
)
/**
 * Részleges regisztráció befejezése
 */
export const finishRegistration = api(
    {expose: true, auth: true, method: "PATCH", path: "/auth/finishRegistration" },
    async (data: FinishRegistrationDto): Promise<FinishRegistrationResponse> => {
        return await AuthService.finishRegistration(data)
    }
)
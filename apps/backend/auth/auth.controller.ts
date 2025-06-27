import {api} from "encore.dev/api";
import {
    RegisterResponse,
    VerifyEmailResponse,
    ReVerifyEmailResponse,
    LoginResponse,
    ForgotPasswordRequestResponse,
    ForgotPasswordChangeResponse,
    LoginOAuthResponse,
    FinishRegistrationResponse, VerifyTokenResponse
} from "@intra/shared/types/auth.types"

import {registerMethod, RegisterParams} from "./methods/register.method";
import {verifyEmailMethod, VerifyEmailParams} from "./methods/verifyEmail.method";
import {reVerifyEmailMethod, ReVerifyEmailParams} from "./methods/reVerifyEmail.method";
import {loginMethod, LoginParams} from "./methods/login.method";
import {forgotPasswordRequestMethod, ForgotPasswordRequestParams} from "./methods/forgotPasswordRequest.method";
import {forgotPasswordChangeMethod, ForgotPasswordChangeParams} from "./methods/forgotPasswordChange.method";
import {loginOAuthMethod, LoginOAuthParams} from "./methods/loginOAuth.method";
import {finishRegistrationMethod, FinishRegistrationParams} from "./methods/finishRegistration.method";
import {verifyTokenMethod, VerifyTokenParams} from "./methods/verifyToken.method";

/**
 * Felhasználó létrehozására szolgáló végpont.
 */
export const register = api(
    // api paraméterek
    { expose: true, method: "POST", path: "/auth/register"},
    // api függvény
    async (data: RegisterParams): Promise<RegisterResponse> => {
        // Meghívjuk a metódust
        return await registerMethod(data)
    }
);

/**
 * Felhasználó email címének megerősítésére szolgáló végpont.
 */
export const verifyEmail = api(
    // api paraméterek
    { expose: true, method: "PATCH", path: "/auth/verifyEmail" },
    // api függvény
    async (data: VerifyEmailParams): Promise<VerifyEmailResponse> => {
        // Meghívjuk a metódust
        return await verifyEmailMethod(data)
    }
)

/**
 * Újabb felhasználói megerősítő email kiküldésére szolgáló végpont.
 */
export const reVerifyEmail = api(
    // api paraméterek
    { expose: true, method: "POST", path: "/auth/reverifyEmail" },
    // api függvény
    async (data: ReVerifyEmailParams): Promise<ReVerifyEmailResponse> => {
        // Meghívjuk a metódust
        return await reVerifyEmailMethod(data)
    }
)

/**
 * Bejelentkezésre szólgálú végpont.
 */
export const login = api(
    // api paraméterek
    { expose: true, method: "POST", path: "/auth/login" },
    // api függvény
    async (data: LoginParams): Promise<LoginResponse> => {
        // Meghívjuk a metódust
        return await loginMethod(data)
    }
)

/**
 * Elfelejtett jelszó megújítására szolgáló végpont.
 */
export const forgotPasswordRequest = api(
    // api paraméterek
    { expose: true, method: "POST", path: "/auth/forgotPasswordRequest" },
    // api függvény
    async (data: ForgotPasswordRequestParams): Promise<ForgotPasswordRequestResponse> => {
        // Meghívjuk a metódust
        return await forgotPasswordRequestMethod(data)
    }
)

/**
 * Elfelejtett jelszó módosítására szolgáló végpont.
 */
export const forgotPasswordChange = api(
    // api paraméterek
    { expose: true, method: "PUT", path: "/auth/forgotPasswordChange" },
    // api függvény
    async (data: ForgotPasswordChangeParams): Promise<ForgotPasswordChangeResponse> => {
        // Meghívjuk a metódust
        return await forgotPasswordChangeMethod(data)
    }
)
/**
 * OAuth belépésre/regisztrációra szolgáló végpont.
 */
export const loginOAuth = api(
    // api paraméterek
    { expose: true, method: "POST", path: "/auth/loginOAuth" },
    // api függvény
    async (data: LoginOAuthParams): Promise<LoginOAuthResponse> => {
        // Meghívjuk a metódust
        return await loginOAuthMethod(data)
    }
)

/**
 * Részleges regisztráció befejezése
 */
export const finishRegistration = api(
    // api paraméterek
    { expose: true, auth: true, method: "PATCH", path: "/auth/finishRegistration" },
    // api függvény
    async (data: FinishRegistrationParams): Promise<FinishRegistrationResponse> => {
        // Meghívjuk a metódust
        return await finishRegistrationMethod(data)
    }
)
/**
 * Token vizsgálata, hogy érvényes e még, vagy sem
 */
export const verifyToken = api(
    // api paraméterek
    { expose: true, method: "POST", path: "/auth/verifyToken" },
    // api függvény
    async (data: VerifyTokenParams): Promise<VerifyTokenResponse> => {
        // Meghívjuk a metódust
        return await verifyTokenMethod(data)
    }
)
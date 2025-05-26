import { api } from "encore.dev/api";
import AuthService from "./auth.service";
/**
 * Felhasználó létrehozására szolgáló végpont.
 */
export const register = api({ expose: true, method: "POST", path: "/auth/register" }, async (data) => {
    return await AuthService.register(data);
});
/**
 * Felhasználó email címének megerősítésére szolgáló végpont.
 */
export const verifyEmail = api({ expose: true, method: "PATCH", path: "/auth/verifyEmail" }, async (data) => {
    return await AuthService.verifyEmail(data);
});
/**
 * Újabb felhasználói megerősítő email kiküldésére szolgáló végpont.
 */
export const reVerifyEmail = api({ expose: true, method: "POST", path: "/auth/reverifyEmail" }, async (data) => {
    return await AuthService.reVerifyEmail(data);
});
/**
 * Bejelentkezésre szólgálú végpont.
 */
export const login = api({ expose: true, method: "POST", path: "/auth/login" }, async (data) => {
    return await AuthService.login(data);
});
/**
 * Elfelejtett jelszó megújítására szolgáló végpont.
 */
export const forgotPasswordRequest = api({ expose: true, method: "POST", path: "/auth/forgotPasswordRequest" }, async (data) => {
    return await AuthService.forgotPasswordRequest(data);
});
/**
 * Elfelejtett jelszó módosítására szolgáló végpont.
 */
export const forgotPasswordChange = api({ expose: true, method: "PUT", path: "/auth/forgotPasswordChange" }, async (data) => {
    return await AuthService.forgotPasswordChange(data);
});
/**
 * OAuth belépésre/regisztrációra szolgáló végpont.
 */
export const loginOAuth = api({ expose: true, method: "POST", path: "/auth/loginOAuth" }, async (data) => {
    return await AuthService.loginOAuth(data);
});
/**
 * Részleges regisztráció befejezése
 */
export const finishRegistration = api({ expose: true, auth: true, method: "PATCH", path: "/auth/finishRegistration" }, async (data) => {
    return await AuthService.finishRegistration(data);
});
//# sourceMappingURL=auth.controller.js.map
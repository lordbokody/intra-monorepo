import { registerMethod } from "./methods/register/register.method";
import { verifyEmailMethod } from "./methods/verifyEmail/verifyEmail.method";
import { reVerifyEmailMethod } from "./methods/reVerifyEmail/reVerifyEmail.method";
import { loginMethod } from "./methods/login/login.method";
import { forgotPasswordRequestMethod } from "./methods/forgotPasswordRequest/forgotPasswordRequest.method";
import { forgotPasswordChangeMethod } from "./methods/forgotPasswordChange/forgotPasswordChange.method";
import { loginOAuthMethod } from "./methods/loginOAuth/loginOAuth.method";
import { finishRegistrationMethod } from "./methods/finishRegistration/finishRegistration.method";
const AuthService = {
    /**
     * Felhasználó létrehozására szolgáló service.
     */
    register: async (data) => {
        return await registerMethod(data);
    },
    /**
     * Felhasználó email címének megerősítésére szolgáló service.
     */
    verifyEmail: async (data) => {
        return await verifyEmailMethod(data);
    },
    /**
     * Újabb felhasználói megerősítő email kiküldésére szolgáló service.
     */
    reVerifyEmail: async (data) => {
        return await reVerifyEmailMethod(data);
    },
    /**
     * Bejelentkezésre szólgálú service.
     */
    login: async (data) => {
        return await loginMethod(data);
    },
    /**
     * Elfelejtett jelszó megújítására szolgáló service.
     */
    forgotPasswordRequest: async (data) => {
        return await forgotPasswordRequestMethod(data);
    },
    /**
     * Elfelejtett jelszó módosítására szolgáló service.
     */
    forgotPasswordChange: async (data) => {
        return await forgotPasswordChangeMethod(data);
    },
    /**
     * OAuth regisztráció/belépés
     */
    loginOAuth: async (data) => {
        return await loginOAuthMethod(data);
    },
    /**
     * Részleges regisztráció befejezése
     */
    finishRegistration: async (data) => {
        return await finishRegistrationMethod(data);
    }
};
export default AuthService;
//# sourceMappingURL=auth.service.js.map
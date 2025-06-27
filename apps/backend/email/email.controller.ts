import {api} from "encore.dev/api";
import {
    SendRegisterEmailResponse,
    SendForgotPasswordEmailResponse
} from "@intra/shared/types/email.types";
import {sendForgotPasswordEmailMethod, SendForgotPasswordEmailParams} from "./methods/sendForgotPassword.method";
import {sendRegisterEmailMethod, SendRegisterEmailParams} from "./methods/sendRegisterEmail.method";

/**
 * Regisztráció megerősítésére szolgáló email küldésének végpontja.
 */
export const sendRegisterEmail = api(
    // api paraméterek
    { expose: false, method: "POST", path: "/email/finish-registration" },
    // api függvény
    async (data: SendRegisterEmailParams): Promise<SendRegisterEmailResponse> => {
        // Meghívjuk a metódust
        return await sendRegisterEmailMethod(data)
    },
);

/**
 * Elfelejtett jelszó helyreállítására szolgáló email küldésének végpontja.
 */
export const sendForgotPasswordEmail = api(
    // api paraméterek
    { expose: false, method: "POST", path: "/email/forgot-password" },
    // api függvény
    async (data: SendForgotPasswordEmailParams): Promise<SendForgotPasswordEmailResponse> => {
        // Meghívjuk a metódust
        return await sendForgotPasswordEmailMethod(data)
    },
);

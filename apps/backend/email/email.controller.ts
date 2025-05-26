import {api} from "encore.dev/api";
import EmailService from "./email.service";
import {
    SendRegisterEmailDto,
    SendRegisterEmailResponse,
    SendForgotPasswordEmailDto,
    SendForgotPasswordEmailResponse
} from "@intra/shared/types/email.types";

/**
 * Regisztráció megerősítésére szolgáló email küldésének végpontja.
 */
export const sendRegisterEmail = api(
    { expose: false, method: "POST", path: "/email/finish-registration" },
    async (data: SendRegisterEmailDto): Promise<SendRegisterEmailResponse> => {
        return await EmailService.sendRegisterEmail(data);
    },
);

/**
 * Elfelejtett jelszó helyreállítására szolgáló email küldésének végpontja.
 */
export const sendForgotPasswordEmail = api(
    { expose: false, method: "POST", path: "/email/forgot-password" },
    async (data: SendForgotPasswordEmailDto): Promise<SendForgotPasswordEmailResponse> => {
        return await EmailService.sendForgotPasswordEmail(data);
    },
);

import { api } from "encore.dev/api";
import EmailService from "./email.service";
/**
 * Regisztráció megerősítésére szolgáló email küldésének végpontja.
 */
export const sendRegisterEmail = api({ expose: false, method: "POST", path: "/email/finish-registration" }, async (data) => {
    return await EmailService.sendRegisterEmail(data);
});
/**
 * Elfelejtett jelszó helyreállítására szolgáló email küldésének végpontja.
 */
export const sendForgotPasswordEmail = api({ expose: false, method: "POST", path: "/email/forgot-password" }, async (data) => {
    return await EmailService.sendForgotPasswordEmail(data);
});
//# sourceMappingURL=email.controller.js.map
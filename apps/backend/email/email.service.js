import { sendRegisterEmailMethod } from "./methods/sendRegisterEmail/sendRegisterEmail.method";
import { sendForgotPasswordEmailMethod } from "./methods/sendForgotPasswordEmail/sendForgotPassword.method";
const EmailService = {
    /**
     * Regisztráció megerősítésére szolgáló email küldésére szolgáló service.
     */
    sendRegisterEmail: async (data) => {
        return await sendRegisterEmailMethod(data);
    },
    /**
     * Elfelejtett jelszó helyreállítására szolgáló email küldésére szolgáló service.
     */
    sendForgotPasswordEmail: async (data) => {
        return await sendForgotPasswordEmailMethod(data);
    },
};
export default EmailService;
//# sourceMappingURL=email.service.js.map
import {sendRegisterEmailMethod} from "./methods/sendRegisterEmail.method";
import {sendForgotPasswordEmailMethod} from "./methods/sendForgotPassword.method";
import {
    SendRegisterEmailDto,
    SendRegisterEmailResponse,
    SendForgotPasswordEmailDto,
    SendForgotPasswordEmailResponse
} from "@intra/shared/types/email.types";


const EmailService = {
    /**
     * Regisztráció megerősítésére szolgáló email küldésére szolgáló service.
     */
    sendRegisterEmail: async (data: SendRegisterEmailDto): Promise<SendRegisterEmailResponse> => {
        return await sendRegisterEmailMethod(data);
    },
    /**
     * Elfelejtett jelszó helyreállítására szolgáló email küldésére szolgáló service.
     */
    sendForgotPasswordEmail: async (data: SendForgotPasswordEmailDto): Promise<SendForgotPasswordEmailResponse> => {
        return await sendForgotPasswordEmailMethod(data);
    },
};

export default EmailService;

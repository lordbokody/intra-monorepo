import {emailTransporter} from "../../email.transporter";
import {APIError} from "encore.dev/api";
import {SendForgotPasswordEmailDto, SendForgotPasswordEmailResponse} from "@intra/shared/types/email.types";
import {sendForgotPasswordEmailSchema} from "./sendForgotPassword.schema";

/**
 * Elfelejtett jelszó helyreállítására szolgáló email küldésére szolgáló metódus.
 */
export const sendForgotPasswordEmailMethod = async (data: SendForgotPasswordEmailDto): Promise<SendForgotPasswordEmailResponse> => {
    try {
        await sendForgotPasswordEmailSchema.validate(data);

        const mailOptions = {
            from: 'noreply@bokody.hu',
            to: data.email,
            subject: 'MKE Intra - Elfelejtett jelszó',
            template: 'forgotPasswordEmail',
            context: { name: data.name, verificationLink: `http://localhost:4000/${data.token}` },
        };
        await emailTransporter.sendMail(mailOptions);

        return {
            success: true,
        }
    } catch (error) {
        throw APIError.aborted(error as string);
    }
}
import { emailTransporter } from "../email.transporter.js";
import { APIError } from "encore.dev/api";
import { sendForgotPasswordEmailSchema } from "./sendForgotPassword.schema";
/**
 * Elfelejtett jelszó helyreállítására szolgáló email küldésére szolgáló metódus.
 */
export const sendForgotPasswordEmailMethod = async (data) => {
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
        };
    }
    catch (error) {
        throw APIError.aborted(error);
    }
};
//# sourceMappingURL=sendForgotPassword.method.js.map
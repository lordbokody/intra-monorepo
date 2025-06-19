import { APIError } from "encore.dev/api";
import { emailTransporter } from "../email.transporter.js";
import dotenv from "dotenv";
import { sendRegisterEmailSchema } from "./sendRegisterEmail/sendRegisterEmail.schema.js";
dotenv.config();
/**
 * Regisztráció megerősítésére szolgáló email küldésére szolgáló metódus.
 */
export const sendRegisterEmailMethod = async (data) => {
    try {
        await sendRegisterEmailSchema.validate(data);
        const mailOptions = {
            from: 'noreply@bokody.hu',
            to: data.email,
            subject: 'MKE Intra - Regisztráció megerősítése',
            template: 'confirmEmail',
            context: { name: data.name, verificationLink: `${process.env.FRONTEND_URL}/public/email-confirmation?token=${data.token}` },
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
//# sourceMappingURL=sendRegisterEmail.method.js.map
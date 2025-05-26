import {APIError} from "encore.dev/api";
import {emailTransporter} from "../../email.transporter";
import {SendRegisterEmailDto, SendRegisterEmailResponse} from "@intra/shared/types/email.types";
import dotenv from "dotenv";
import {sendRegisterEmailSchema} from "./sendRegisterEmail.schema";

dotenv.config();

/**
 * Regisztráció megerősítésére szolgáló email küldésére szolgáló metódus.
 */
export const sendRegisterEmailMethod = async (data: SendRegisterEmailDto): Promise<SendRegisterEmailResponse> => {
    try {
        await sendRegisterEmailSchema.validate(data);

        const mailOptions = {
            from: 'noreply@bokody.hu',
            to: data.email,
            subject: 'MKE Intra - Regisztráció megerősítése',
            template: 'confirmEmail',
            context: { name: data.name, verificationLink: `${process.env.FRONTEND_URL}/public/email-confirmed?token=${data.token}` },
        };

        await emailTransporter.sendMail(mailOptions);

        return {
            success: true,
        }
    } catch (error) {
        throw APIError.aborted(error as string);
    }
}
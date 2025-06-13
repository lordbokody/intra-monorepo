import {emailTransporter} from "../email.transporter";
import {APIError} from "encore.dev/api";
import {SendForgotPasswordEmailDto, SendForgotPasswordEmailResponse} from "@intra/shared/types/email.types";
import {sendForgotPasswordEmailSchema} from "@intra/shared/schemas/email/sendForgotPassword.schema";
import dotenv from "dotenv";
import {createTranslator} from "@intra/shared/utils/translator.util";

dotenv.config();

/**
 * Elfelejtett jelszó helyreállítására szolgáló email küldésére szolgáló metódus.
 */
export const sendForgotPasswordEmailMethod = async (data: SendForgotPasswordEmailDto): Promise<SendForgotPasswordEmailResponse> => {
    try {
        // Betöltjük a nyelvet
        const locale = 'hu'
        const t = createTranslator(locale);

        // Validáljuk a kliens oldali adatokat
        await sendForgotPasswordEmailSchema(locale).client().validate(data);

        // Beállítjuk az email paramétereit
        const mailOptions = {
            from: process.env.EMAIL_FROM_EMAIL,
            to: data.email,
            subject: `${process.env.APP_NAME} - ${t('forgot-password-email-subject')}`,
            template: 'forgotPasswordEmail',
            context: { name: data.name, verificationLink: `${process.env.FRONTEND_URL}/public/change-password?token=${data.token}` },
        };

        // Elküldjük az emailt
        await emailTransporter.sendMail(mailOptions);

        // Visszatérünk a válasszal
        return {
            success: true,
        }
    } catch (error) {
        throw APIError.aborted(error as string);
    }
}
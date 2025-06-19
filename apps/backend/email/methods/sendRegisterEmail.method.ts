import {APIError} from "encore.dev/api";
import {emailTransporter} from "../email.transporter";
import {SendRegisterEmailDto, SendRegisterEmailResponse} from "@intra/shared/types/email.types";
import dotenv from "dotenv";
import {sendRegisterEmailSchema} from "@intra/shared/schemas/email/sendRegisterEmail.schema";
import {createTranslator} from "@intra/shared/utils/translator.util";

dotenv.config();

/**
 * Regisztráció megerősítésére szolgáló email küldésére szolgáló metódus.
 */
export const sendRegisterEmailMethod = async (data: SendRegisterEmailDto): Promise<SendRegisterEmailResponse> => {
    try {
        // Betöltjük a nyelvet
        const locale = 'hu'
        const t = createTranslator(locale);

        // Validáljuk a kliens oldali adatokat
        await sendRegisterEmailSchema('hu').client().validate(data);

        // Beállítjuk az email paramétereit
        const mailOptions = {
            from: process.env.EMAIL_FROM_EMAIL,
            to: data.email,
            subject: `${process.env.APP_NAME} - ${t('registration-confirmation-email-subject')}`,
            template: 'confirmEmail',
            context: { name: data.name, verificationLink: `${process.env.FRONTEND_URL}/public/email-confirmation?token=${data.token}` },
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
import {emailTransporter} from "../email.transporter";
import {APIError, Header} from "encore.dev/api";
import {SendForgotPasswordEmailDto, SendForgotPasswordEmailResponse} from "@intra/shared/types/email.types";
import {sendForgotPasswordEmailSchema} from "@intra/shared/schemas/email/sendForgotPassword.schema";
import dotenv from "dotenv";
import {createTranslator} from "@intra/shared/utils/translator.util";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

// Betöltjük a rendszerparamétereket
dotenv.config();

/**
 * Kiegészítjük a Dto-t a Header nyelvi értékével
 */
export interface SendForgotPasswordEmailParams extends SendForgotPasswordEmailDto {
    locale: Header<"Accept-Language">;
}

/**
 * Elfelejtett jelszó helyreállítására szolgáló email küldésére szolgáló metódus.
 */
export const sendForgotPasswordEmailMethod = async (data: SendForgotPasswordEmailParams): Promise<SendForgotPasswordEmailResponse> => {
    try {
        // Létrehozzuk a validáló sémát
        const validationSchema = sendForgotPasswordEmailSchema(data.locale as ApplicationLanguage)

        // Validáljuk a kliens oldali adatokat
        await validationSchema.client().validate(data);

        // Betöltjük a fordításokat
        const t = createTranslator(data.locale as ApplicationLanguage);
        const texts = {
            title: t("email-forgot-title"),
            dear: t("email-forgot-dear"),
            message: t("email-forgot-message"),
            click: t("email-forgot-click"),
            button: t("email-forgot-button"),
            ignore: t("email-forgot-ignore"),
        }

        // Beállítjuk az email paramétereit
        const mailOptions = {
            from: process.env.EMAIL_FROM_EMAIL,
            to: data.email,
            subject: `${process.env.APP_NAME} - ${t('forgot-password-email-subject')}`,
            template: 'forgotPasswordEmail',
            context: {
                name: data.name,
                verificationLink: `${process.env.FRONTEND_URL}/public/change-password?token=${data.token}`,
                texts
            },
        };

        // Elküldjük az emailt
        await emailTransporter.sendMail(mailOptions);

        // Visszatérünk a válasszal
        return {
            success: true,
        }
    } catch (error) {
        // Hibakezelés
        throw APIError.aborted(error as string);
    }
}
import {APIError, Header} from "encore.dev/api";
import {emailTransporter} from "../email.transporter";
import {SendRegisterEmailDto, SendRegisterEmailResponse} from "@intra/shared/types/email.types";
import dotenv from "dotenv";
import {sendRegisterEmailSchema} from "@intra/shared/schemas/email/sendRegisterEmail.schema";
import {createTranslator} from "@intra/shared/utils/translator.util";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

// Betöltjük a rendszerparamétereket
dotenv.config();

/**
 * Kiegészítjük a Dto-t a Header nyelvi értékével
 */
export interface SendRegisterEmailParams extends SendRegisterEmailDto {
    locale: Header<"Accept-Language">;
}

/**
 * Regisztráció megerősítésére szolgáló email küldésére szolgáló metódus.
 */
export const sendRegisterEmailMethod = async (data: SendRegisterEmailParams): Promise<SendRegisterEmailResponse> => {
    try {
        // Létrehozzuk a validáló sémát
        const validationSchema = sendRegisterEmailSchema(data.locale as ApplicationLanguage)

        // Validáljuk a kliens oldali adatokat
        await validationSchema.client().validate(data);

        // Betöltjük a fordításokat
        const t = createTranslator(data.locale as ApplicationLanguage);
        const texts = {
            title: t("confirm-email"),
            welcome: t("email-confirm-welcome"),
            message: t("email-confirm-message"),
            button: t("email-confirm-button"),
            ignore: t("email-confirm-ignore")
        }

        // Beállítjuk az email paramétereit
        const mailOptions = {
            from: process.env.EMAIL_FROM_EMAIL,
            to: data.email,
            subject: `${process.env.APP_NAME} - ${t('registration-confirmation-email-subject')}`,
            template: 'confirmEmail',
            context: {
                name: data.name,
                verificationLink: `${process.env.FRONTEND_URL}/public/email-confirmation?token=${data.token}`,
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
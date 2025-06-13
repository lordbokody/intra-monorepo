import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";
import {ApplicationLanguage} from "../../types/common.types";

export const loginOAuthSchema = (locale: ApplicationLanguage = "hu") => {
    const t = createTranslator(locale);

    const client = () =>
        yup.object({
            email: yup.string().required(t("required")),
            name: yup.string().required(t("required")),
        });

    const server = () =>
        yup
            .mixed()
            .test(
                "user-email-not-confirmed",
                t("user-email-not-confirmed"),
                (value: any) => value?.registrationStatus !== "emailNotConfirmed"
            );

    return { client, server };
};

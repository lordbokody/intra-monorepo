import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";

export const loginOAuthSchema = (locale: string = "hu") => {
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

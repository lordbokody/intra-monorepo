import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";
import {ApplicationLanguage} from "../../types/common.types";

export const forgotPasswordRequestSchema = (locale: ApplicationLanguage = "hu") => {
    const t = createTranslator(locale);

    const client = () =>
        yup.object({
            email: yup.string().required(t("required")),
        });

    const server = () =>
        yup
            .mixed()
            .required(t("user-not-found"))
            .test("user-exists", t("user-not-found"), (value) => value !== null)
            .test(
                "email-confirmed",
                t("user-email-not-confirmed"),
                (value: any) => value?.registrationStatus === "registered"
            )
            .test(
                "has-password",
                t("user-has-no-password"),
                (value: any) => Boolean(value?.password)
            );

    return { client, server };
};

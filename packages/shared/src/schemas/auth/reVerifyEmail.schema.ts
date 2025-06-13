import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";
import {ApplicationLanguage} from "../../types/common.types";

export const reVerifyEmailSchema = (locale: ApplicationLanguage = "hu") => {
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
                "email-already-confirmed",
                t("emailConfirmationConfirmed"),
                (value: any) =>
                    value?.registrationStatus !== "registered" &&
                    value?.registrationStatus !== "partialRegistration"
            );

    return { client, server };
};

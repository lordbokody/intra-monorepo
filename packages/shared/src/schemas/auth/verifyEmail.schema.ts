import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";
import {verifyToken} from "../../utils/token.util";
import {ApplicationLanguage} from "../../types/common.types";

export const verifyEmailSchema = (locale: ApplicationLanguage = "hu") => {
    const t = createTranslator(locale);

    const client = () =>
        yup.object({
            token: yup
                .string()
                .required(t("required"))
                .test(
                    "is-valid-token",
                    t("invalid-or-expired-token"),
                    (value) => {
                        if (!value) return false;
                        const userID = verifyToken(value);
                        return !!userID;
                    }
                ),
        });


    const server = () =>
        yup
            .mixed()
            .required(t("user-not-found"))
            .test("user-exists", t("user-not-found"), (value) => value !== null)
            .test(
                "already-confirmed",
                t("emailConfirmationConfirmed"),
                (value: any) =>
                    value?.registrationStatus !== "registered" &&
                    value?.registrationStatus !== "partialRegistration"
            );

    return { client, server };
};

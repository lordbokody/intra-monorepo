import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";
import {verifyEmailConfirmationToken} from "../../utils/token.util";

export const verifyEmailSchema = (locale: string = "hu") => {
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
                        const userID = verifyEmailConfirmationToken(value);
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

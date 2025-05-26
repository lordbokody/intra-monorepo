import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";
import { verifyEmailConfirmationToken } from "../../utils/token.util";

export const forgotPasswordChangeSchema = (locale: string = "hu") => {
    const t = createTranslator(locale);

    const client = () =>
        yup.object({
            password: yup.string().required(t("required")),

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
            .test("user-exists", t("user-not-found"), (value) => value !== null);

    return { client, server };
};

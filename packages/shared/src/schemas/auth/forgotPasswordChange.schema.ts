import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";
import { verifyToken } from "../../utils/token.util";
import {ApplicationLanguage} from "../../types/common.types";
import {validatePassword} from "../../utils/validators.util";

export const forgotPasswordChangeSchema = (locale: ApplicationLanguage = "hu") => {
    const t = createTranslator(locale);

    const client = () =>
        yup.object({
            password: yup.string()
                .test("is-strong-password", t("is-strong-password"), validatePassword)
                .required(t("required")),

            confirmPassword: yup.string()
                .trim()
                .oneOf([yup.ref("password")], t("are-passwords-match"))
                .required(t("required")),

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
            .test("user-exists", t("user-not-found"), (value) => value !== null);

    return { client, server };
};

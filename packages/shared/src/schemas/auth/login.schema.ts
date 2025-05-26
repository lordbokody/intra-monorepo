import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";
import { comparePassword } from "../../utils/password.util";

export const loginSchema = (locale: string = "hu") => {
    const t = createTranslator(locale);

    const client = () =>
        yup.object({
            email: yup.string().required(t("required")),
            password: yup.string().required(t("required")),
        });

    const server = () =>
        yup
            .mixed()
            .required(t("user-not-found"))
            .test("user-exists", t("invalid-login"), (value) => value !== null)
            .test(
                "registration-status-confirmed",
                t("user-email-not-confirmed"),
                (value: any) => value?.registrationStatus === "registered"
            )
            .test(
                "has-password",
                t("user-has-no-password"),
                (value: any) => Boolean(value?.password)
            )
            .test(
                "password-match",
                t("invalid-login"),
                async function (user: any) {
                    const inputPassword = this.options.context?.inputPassword;
                    if (!user?.password || !inputPassword) return false;
                    return await comparePassword(inputPassword, user.password);
                }
            );

    return { client, server };
};

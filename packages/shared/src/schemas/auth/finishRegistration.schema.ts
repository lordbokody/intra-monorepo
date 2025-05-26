import * as yup from "yup";
import {
    validateName,
    validatePassword,
    validateBirthday,
    validateMinimumYear,
} from "../../utils/validators.util";
import { createTranslator } from "../../utils/translator.util";

export const finishRegistrationSchema = (locale: string = "hu") => {
    const t = createTranslator(locale);

    const client = () =>
        yup.object().shape({
            name: yup.string()
                .test("is-valid-name", t("is-valid-name"), validateName)
                .required(t("required")),

            password: yup.string()
                .test("is-strong-password", t("is-strong-password"), validatePassword)
                .required(t("required")),

            confirmPassword: yup.string()
                .trim()
                .oneOf([yup.ref("password")], t("are-passwords-match"))
                .required(t("required")),

            birthday: yup.string()
                .test("is-valid-birthday", t("is-valid-birthday"), validateBirthday)
                .test("is-minimum-year", t("is-minimum-year"), validateMinimumYear)
                .required(t("required")),

            acceptTerms: yup.boolean().oneOf([true], t("required")),
            acceptPrivacy: yup.boolean().oneOf([true], t("required")),
        });

    const server = () =>
        yup
            .mixed()
            .required(t("user-not-found"))
            .test("user-exists", t("user-not-found"), (value) => value !== null)
            .test(
                "registration-status",
                t("invalid-registration-status"),
                (value: any) => value?.registrationStatus === "partialRegistration"
            );

    return { client, server };
};
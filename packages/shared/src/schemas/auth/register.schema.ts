import * as yup from "yup";
import {
    validateBirthday,
    validateEmail,
    validateMinimumYear,
    validateName,
    validatePassword,
} from "../../utils/validators.util";
import { createTranslator } from "../../utils/translator.util";
import {ApplicationLanguage} from "../../types/common.types";

export const registerSchema = (locale: ApplicationLanguage = "hu") => {
    const t = createTranslator(locale);

    const client = (checkEmailExists: Function) =>
        yup.object().shape({
            name: yup.string()
                .test("is-valid-name", t("is-valid-name"), validateName)
                .required(t("required")),

            email: yup.string()

                .test("is-valid-email", t('is-valid-email'), validateEmail)
                .test(
                    "is-unique-email",
                    t('is-unique-email'),
                    async (value) => {
                        if (!value || !validateEmail(value)) return true;
                        return await checkEmailExists(value);
                    }
                )
                .required(t('required')),

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

    return { client };
};

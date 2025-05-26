import * as Yup from "yup";
import {validateName, validatePassword, validateBirthday, validateMinimumYear} from "@repo/shared/utils/validators.util";

export const finishRegisterSchema = (t: Function) => Yup.object().shape({
    name: Yup.string()
        .test("is-valid-name", t('is-valid-name'), validateName)
        .required(t('required')),


    password: Yup.string()
        .test(
            "is-strong-password",
            t('is-strong-password'),
            validatePassword
        )
        .required(t('required')),

    confirmPassword: Yup.string()
        .trim()
        .oneOf([Yup.ref("password")], t('are-passwords-match'))
        .required(t('required')),

    birthday: Yup.string()
        .test("is-valid-birthday", t('is-valid-birthday'), validateBirthday)
        .test("is-minimum-year", t('is-minimum-year'), validateMinimumYear)
        .required(t('required')),

    acceptTerms: Yup.boolean()
        .oneOf([true], t('required')),

    acceptPrivacy: Yup.boolean()
        .oneOf([true], t('required')),
});
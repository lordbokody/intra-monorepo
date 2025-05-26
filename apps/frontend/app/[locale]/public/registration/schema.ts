import * as Yup from "yup";
import {validateName, validateEmail, validatePassword, validateBirthday, validateMinimumYear} from "@repo/shared/utils/validators.util";
import {axiosRequest} from "../../../../utils/axios";
import type {CheckEmailResponse} from "./types";


const checkEmailExists = async (email: string): Promise<boolean> => {
    const response = await axiosRequest<CheckEmailResponse>({
        method: 'get',
        route: `/user/find/${email}`,
    });

    return !response.success;
};

export const registerSchema = (t: Function) => Yup.object().shape({
    name: Yup.string()
        .test("is-valid-name", t('is-valid-name'), validateName)
        .required(t('required')),

    email: Yup.string()

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
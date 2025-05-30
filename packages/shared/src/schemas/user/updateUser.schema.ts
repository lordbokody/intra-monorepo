import * as yup from "yup";
import {
    validateBirthday,
    validateEmail,
    validateMinimumYear,
    validateName,
    validatePassword
} from "../../utils/validators.util";
import {createTranslator} from "../../utils/translator.util";

export const updateUserSchema = (locale: string = 'hu') => {
    const t = createTranslator(locale);

    const client = (checkEmailExists: Function) =>
        yup.object({
            name: yup.string()
                .test("is-valid-name", t('is-valid-name'), validateName)
                .required(t('required')),
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
                .test("is-strong-password", t('is-strong-password'), validatePassword)
                .required(t('required')),
            birthday: yup.string()
                .test("is-valid-birthday", t('is-valid-birthday'), validateBirthday)
                .test("is-minimum-year", t('is-minimum-year'), validateMinimumYear)
                .required(t('required')),
        });

    const auth = () =>
        yup.object({
            id: yup.number().required(),
            password: yup.string().notRequired(),
            role: yup.string().notRequired(),
        })
            .test(
                "can-edit-user",
                t("no-access"),
                function (data) {
                    const authRole = this.options.context?.role;
                    const authId = this.options.context?.id;

                    if (!data) return false;

                    if (authRole !== "admin" && authId !== data.id) {
                        return this.createError({ message: t('user-delete-not-allowed') });
                    }

                    if (authRole === "admin" && authId !== data.id && !!data.password) {
                        return this.createError({ message: t('user-password-not-allowed') });
                    }

                    if (authRole !== "admin" && !!data.role) {
                        return this.createError({ message: t('role-no-access') });
                    }

                    return true;
                }
            );

    const server = () =>
        yup
            .mixed()
            .required(t("user-not-found"))
            .test("user-exists", t("user-not-found"), (value) => value !== null);

    return { client, auth, server };
}
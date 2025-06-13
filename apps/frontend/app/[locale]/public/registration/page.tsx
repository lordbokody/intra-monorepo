'use client'

import { FormikProvider, Form } from 'formik';
import {InputText} from "../../../../components/forms/inputs/InputText";
import {InputEmail} from "../../../../components/forms/inputs/InputEmail";
import {InputPassword} from "../../../../components/forms/inputs/InputPassword";
import {InputDate} from "../../../../components/forms/inputs/InputDate";
import {InputCheckbox} from "../../../../components/forms/inputs/InputCheckbox";
import {ButtonSubmit} from "../../../../components/forms/buttons/buttonSubmit/ButtonSubmit";
import { formStyles as styles } from "@intra/ui/formStyles";
import {useTranslations} from 'next-intl';
import {useRegistrationForm} from "./form";
import Link from "next/link";
import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";

export default function RegisterPage() {
    // Betöltjük a fordításokat
    const t = useTranslations('all');

    // Betöltjük a formot
    const {
        formik,
        buttonState,
        errorText,
        isError
    } = useRegistrationForm()

    // Létrehozzuk a sablont
    return (
        <LayoutForm>
            <FormikProvider value={formik}>
                <Form className={styles.form} >
                    <h2 className={styles.label}>{t('registration')}</h2>

                    <InputText
                        label={t('name')}
                        id="name"
                        name="name"
                        required={true}
                    />
                    <InputEmail
                        label={t('email')}
                        id="email"
                        name="email"
                        required={true}
                        debounce={true}
                    />
                    <InputPassword
                        label={t('password')}
                        id="password"
                        name="password"
                        required={true}
                    />
                    <InputPassword
                        label={t('confirmPassword')}
                        id="confirmPassword"
                        name="confirmPassword"
                        required={true}
                    />
                    <InputDate
                        label={t('birthday')}
                        id="birthday"
                        name="birthday"
                        required={true}
                    />
                    <InputCheckbox
                        label={t('acceptTerms')}
                        id="acceptTerms"
                        name="acceptTerms"
                        required={true}
                    />
                    <InputCheckbox
                        label={t('acceptPrivacy')}
                        id="acceptPrivacy"
                        name="acceptPrivacy"
                        required={true}
                    />
                    <p className={styles.required}>{t('*-required')}</p>
                    <p className={styles.error(isError)}>{errorText}</p>
                    <ButtonSubmit state={buttonState}>
                        {t('registration')}
                    </ButtonSubmit>
                    <div className={styles.linkRow}>
                        <Link className={styles.link} href="/public/login">{t('backToHome')}</Link>
                    </div>
                </Form>
            </FormikProvider>
        </LayoutForm>
    )
}
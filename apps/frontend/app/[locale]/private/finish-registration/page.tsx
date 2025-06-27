'use client'

import { FormikProvider, Form } from 'formik';
import { InputText } from "../../../../components/forms/inputs/InputText";
import { InputEmail } from "../../../../components/forms/inputs/InputEmail";
import { InputPassword } from "../../../../components/forms/inputs/InputPassword";
import { InputDate } from "../../../../components/forms/inputs/InputDate";
import { InputCheckbox } from "../../../../components/forms/inputs/InputCheckbox";
import { ButtonSubmit } from "../../../../components/forms/buttons/buttonSubmit/ButtonSubmit";
import { formStyles as styles } from "@intra/ui/formStyles";
import { useTranslations } from 'next-intl';
import { LayoutForm } from "../../../../components/layout/layoutForm/LayoutForm";
import { useFinishRegistrationForm } from './form';

/**
 * Regisztráció befejezése oldal
 */
export default function RegisterPage() {
    // Betöltjük a fordításokat
    const t = useTranslations('all');

    // Betöltjük a formot
    const {
        formik,
        buttonState,
        isError,
        errorText
    } = useFinishRegistrationForm();

    // Létrehozzuk a sablont
    return (
        <LayoutForm>
            <FormikProvider value={formik}>
                <Form className={styles.form}>
                    {/*Oldal címe*/}
                    <h2 className={styles.label}>{t('finish-registration')}</h2>

                    {/*Input mezők*/}
                    <InputText label={t('name')} id="name" name="name" value={formik.values.name} required />
                    <InputEmail label={t('email')} id="email" name="email" value={formik.values.email} required disabled preLoad />
                    <InputPassword label={t('password')} id="password" name="password" value={formik.values.password} required />
                    <InputPassword label={t('confirmPassword')} id="confirmPassword" name="confirmPassword" value={formik.values.confirmPassword} required />
                    <InputDate label={t('birthday')} id="birthday" name="birthday" value={formik.values.birthday} required />
                    <InputCheckbox label={t('acceptTerms')} id="acceptTerms" name="acceptTerms" value={formik.values.acceptTerms} required />
                    <InputCheckbox label={t('acceptPrivacy')} id="acceptPrivacy" name="acceptPrivacy" value={formik.values.acceptPrivacy} required />

                    {/*Információs szövegek*/}
                    <p className={styles.required}>{t('*-required')}</p>
                    <p className={styles.error(isError)}>{errorText}</p>

                    {/*Form elküldésének gombja*/}
                    <ButtonSubmit state={buttonState}>{t('finish')}</ButtonSubmit>
                </Form>
            </FormikProvider>
        </LayoutForm>
    );
}

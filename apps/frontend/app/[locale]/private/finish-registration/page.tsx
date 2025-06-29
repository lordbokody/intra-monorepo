'use client'

import { FormikProvider, Form } from 'formik';
import { InputText } from "@intra/ui/components/forms/inputs/InputText";
import { InputEmail } from "@intra/ui/components/forms/inputs/InputEmail";
import { InputPassword } from "@intra/ui/components/forms/inputs/InputPassword";
import { InputDate } from "@intra/ui/components/forms/inputs/InputDate";
import { InputCheckbox } from "@intra/ui/components/forms/inputs/InputCheckbox";
import { ButtonSubmit } from "@intra/ui/components/forms/buttons/ButtonSubmit";
import {formStyles} from "@intra/ui/components/styles/formStyles";
import { FormCard } from "@intra/ui/components/layout/FormCard/FormCard";
import { useFinishRegistrationForm } from './form';
import {useAppTranslations} from "@intra/ui/utils/useAppTranslations";

/**
 * Regisztráció befejezése oldal
 */
export default function RegisterPage() {
    // Betöltjük a fordításokat
    const { t } = useAppTranslations();

    // Betöltjük a formot
    const {
        formik,
        buttonState,
        isError,
        errorText
    } = useFinishRegistrationForm();

    // Létrehozzuk a sablont
    return (
        <FormCard>
            <FormikProvider value={formik}>
                <Form className={formStyles.form}>
                    {/*Oldal címe*/}
                    <h2 className={formStyles.label}>{t('finish-registration')}</h2>

                    {/*Input mezők*/}
                    <InputText label={t('name')} id="name" name="name" value={formik.values.name} required />
                    <InputEmail label={t('email')} id="email" name="email" value={formik.values.email} required disabled preLoad />
                    <InputPassword label={t('password')} id="password" name="password" value={formik.values.password} required />
                    <InputPassword label={t('confirmPassword')} id="confirmPassword" name="confirmPassword" value={formik.values.confirmPassword} required />
                    <InputDate label={t('birthday')} id="birthday" name="birthday" value={formik.values.birthday} required />
                    <InputCheckbox label={t('acceptTerms')} id="acceptTerms" name="acceptTerms" value={formik.values.acceptTerms} required />
                    <InputCheckbox label={t('acceptPrivacy')} id="acceptPrivacy" name="acceptPrivacy" value={formik.values.acceptPrivacy} required />

                    {/*Információs szövegek*/}
                    <p className={formStyles.required}>{t('*-required')}</p>
                    <p className={formStyles.error(isError)}>{errorText}</p>

                    {/*Form elküldésének gombja*/}
                    <ButtonSubmit state={buttonState}>{t('finish')}</ButtonSubmit>
                </Form>
            </FormikProvider>
        </FormCard>
    );
}

'use client'

import { FormikProvider, Form } from 'formik';
import {InputText} from "@intra/ui/components/forms/inputs/InputText";
import {InputEmail} from "@intra/ui/components/forms/inputs/InputEmail";
import {InputPassword} from "@intra/ui/components/forms/inputs/InputPassword";
import {InputDate} from "@intra/ui/components/forms/inputs/InputDate";
import {InputCheckbox} from "@intra/ui/components/forms/inputs/InputCheckbox";
import {ButtonSubmit} from "@intra/ui/components/forms/buttons/ButtonSubmit";
import {formStyles} from "@intra/ui/components/styles/formStyles";
import {useLocale, useTranslations} from 'next-intl';
import {useRegistrationForm} from "./form";
import Link from "next/link";
import {FormCard} from "../../../../../../packages/ui/src/components/layout/FormCard/FormCard";
import {useState} from "react";
import {PageStatus} from "@intra/shared/types/common.types";

/**
 * Regisztrációs oldal
 */
export default function RegisterPage() {
    // Oldal állapota
    const [pageStatus, setPageStatus] = useState<PageStatus>('default');

    // Betöltjük a fordításokat
    const locale = useLocale();
    const t = useTranslations('all');

    // Betöltjük a formot
    const {
        formik,
        buttonState,
        errorText,
        isError
    } = useRegistrationForm(setPageStatus)

    // Létrehozzuk a sablont
    return (
        <FormCard>
            <FormikProvider value={formik}>
                <Form className={formStyles.form} >
                    {/*Form neve*/}
                    <h2 className={formStyles.label}>{t('registration')}</h2>

                    {/*Alapértelmezett állapot*/}
                    {pageStatus === 'default' && (
                        <>
                            {/*Input mezők*/}
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

                            {/*Információs szövegek*/}
                            <p className={formStyles.required}>{t('*-required')}</p>
                            <p className={formStyles.error(isError)}>{errorText}</p>

                            {/*Submit gomb*/}
                            <ButtonSubmit state={buttonState}>
                                {t('registration')}
                            </ButtonSubmit>
                        </>
                    )}

                    {/*Sikeres form kitöltés*/}
                    {pageStatus === 'succeeded' && (
                        <>
                            <p className={formStyles.message}>{t("registrationSuccess")}</p>
                            <p className={formStyles.description}>{t("registrationInfo")}</p>
                        </>
                    )}

                    {/*Linkek*/}
                    <div className={formStyles.linkRow}>
                        <Link className={formStyles.link} href={`/${locale}/public/login`}>{t('backToHome')}</Link>
                    </div>
                </Form>
            </FormikProvider>
        </FormCard>
    )
}
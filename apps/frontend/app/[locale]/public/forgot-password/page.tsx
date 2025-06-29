"use client"

import { FormikProvider, Form } from 'formik';
import Link from "next/link";
import {FormCard} from "@intra/ui/components/layout/FormCard/FormCard";
import {formStyles} from "@intra/ui/components/styles/formStyles";
import {InputEmail} from "@intra/ui/components/forms/inputs/InputEmail";
import {ButtonSubmit} from "@intra/ui/components/forms/buttons/ButtonSubmit";
import {useForgotPasswordRequestForm} from "./form";
import {useState} from "react";
import type {PageStatus} from "@intra/shared/types/common.types";
import {useAppTranslations} from "@intra/ui/utils/useAppTranslations";

/**
 * Elfelejtett jelszó oldal
 */
export default function ForgotPasswordPage() {
    // Oldal állapota
    const [pageStatus, setPageStatus] = useState<PageStatus>('default');

    // Betöltjük a fordításokat
    const { locale, t } = useAppTranslations();

    // Betöltjük a formot
    const {
        formik,
        isError,
        errorText,
        buttonState
    } = useForgotPasswordRequestForm(setPageStatus)

    // Létrehozzuk a sablont
    return (
        <FormCard>
            <div className={formStyles.form}>
                <FormikProvider value={formik}>
                    <Form>
                        {/*Form neve*/}
                        <h2 className={formStyles.label}>{t("forgot-password-email-subject")}</h2>

                        {/*Alapértelmezett állapot*/}
                        {pageStatus === 'default' && (
                            <>
                                <p className={formStyles.description}>{t("forgot-password-desc")}</p>
                                <InputEmail
                                    label={t("email")}
                                    id="email"
                                    name="email"
                                />
                                <p className={formStyles.error(isError)}>{errorText}</p>
                                <ButtonSubmit state={buttonState}>{t("submit")}</ButtonSubmit>
                            </>
                        )}

                        {/*Sikeres form kitöltés*/}
                        {pageStatus === 'succeeded' && (
                            <>
                                <p className={formStyles.description}>{t("forgot-password-success")}</p>
                            </>
                        )}

                        {/*Linkek */}
                        <div className={formStyles.linkRow}>
                            <Link className={formStyles.link} href={`/${locale}/public/login`}>{t('backToHome')}</Link>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </FormCard>

    );
}

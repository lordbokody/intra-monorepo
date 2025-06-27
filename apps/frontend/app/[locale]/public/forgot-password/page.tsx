"use client"

import { FormikProvider, Form } from 'formik';
import Link from "next/link";
import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import { formStyles as styles } from "@intra/ui/formStyles";
import {InputEmail} from "../../../../components/forms/inputs/InputEmail";
import {ButtonSubmit} from "../../../../components/forms/buttons/buttonSubmit/ButtonSubmit";
import {useLocale, useTranslations} from "next-intl";
import {useForgotPasswordRequestForm} from "./form";
import {useState} from "react";
import type {PageStatus} from "@intra/shared/types/common.types";

/**
 * Elfelejtett jelszó oldal
 */
export default function ForgotPasswordPage() {
    // Oldal állapota
    const [pageStatus, setPageStatus] = useState<PageStatus>('default');

    // Betöltjük a fordításokat
    const locale = useLocale();
    const t = useTranslations('all');

    // Betöltjük a formot
    const {
        formik,
        isError,
        errorText,
        buttonState
    } = useForgotPasswordRequestForm(setPageStatus)

    // Létrehozzuk a sablont
    return (
        <LayoutForm>
            <div className={styles.form}>
                <FormikProvider value={formik}>
                    <Form>
                        {/*Form neve*/}
                        <h2 className={styles.label}>{t("forgot-password-email-subject")}</h2>

                        {/*Alapértelmezett állapot*/}
                        {pageStatus === 'default' && (
                            <>
                                <p className={styles.description}>{t("forgot-password-desc")}</p>
                                <InputEmail
                                    label={t("email")}
                                    id="email"
                                    name="email"
                                />
                                <p className={styles.error(isError)}>{errorText}</p>
                                <ButtonSubmit state={buttonState}>{t("submit")}</ButtonSubmit>
                            </>
                        )}

                        {/*Sikeres form kitöltés*/}
                        {pageStatus === 'succeeded' && (
                            <>
                                <p className={styles.description}>{t("forgot-password-success")}</p>
                            </>
                        )}

                        {/*Linkek */}
                        <div className={styles.linkRow}>
                            <Link className={styles.link} href={`/${locale}/public/login`}>{t('backToHome')}</Link>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </LayoutForm>

    );
}

"use client"

import { FormikProvider, Form } from 'formik';
import Link from "next/link";
import {FormCard} from "../../../../components/layout/FormCard/FormCard";
import { formStyles as styles } from "@intra/ui/formStyles";
import {InputEmail} from "../../../../components/forms/inputs/InputEmail";
import {ButtonSubmit} from "../../../../components/forms/buttons/buttonSubmit/ButtonSubmit";
import {useLocale, useTranslations} from "next-intl";
import {useResendEmailForm} from "./form";
import {useState} from "react";
import type {PageStatus} from "@intra/shared/types/common.types";

/**
 * Megerősítő email újraküldő oldal
 */
export default function ResendEmailPage() {
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
    } = useResendEmailForm(setPageStatus)

    // Létrehozzuk a sablont
    return (
        <FormCard>
            <div className={styles.form}>
                <FormikProvider value={formik}>
                    <Form>
                        {/*Form neve*/}
                        <h2 className={styles.label}>{t("confirm-email")}</h2>

                        {/*Alapértelmezett állapot*/}
                        {pageStatus === 'default' && (
                            <>
                                {/*Leírás*/}
                                <p className={styles.description}>{t("confirm-email-desc")}</p>

                                {/*Input mező*/}
                                <InputEmail
                                    label={t("email")}
                                    id="email"
                                    name="email"
                                />

                                {/*Tájékoztató szövegek*/}
                                <p className={styles.error(isError)}>{errorText}</p>

                                {/*Submit gomb*/}
                                <ButtonSubmit state={buttonState}>{t("submit")}</ButtonSubmit>
                            </>
                        )}

                        {/*Sikeres form kitöltés*/}
                        {pageStatus === 'succeeded' && (
                            <>
                                <p className={styles.description}>{t("confirm-email-success")}</p>
                            </>
                        )}

                        {/*Linkek */}
                        <div className={styles.linkRow}>
                            <Link className={styles.link} href={`/${locale}/public/login`}>{t('backToHome')}</Link>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </FormCard>

    );
}

"use client"

import { FormikProvider, Form } from 'formik';
import Link from "next/link";
import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import { formStyles as styles } from "@intra/ui/formStyles";
import {InputEmail} from "../../../../components/forms/inputs/InputEmail";
import {ButtonSubmit} from "../../../../components/forms/buttons/buttonSubmit/ButtonSubmit";
import {useTranslations} from "next-intl";
import {useForgotPasswordRequestForm} from "./form";


export default function ForgotPasswordPage() {
    // Betöltjük a fordításokat
    const t = useTranslations('all');

    // Betöltjük a formot
    const {
        formik,
        isError,
        errorText,
        buttonState
    } = useForgotPasswordRequestForm()

    // Létrehozzuk a sablont
    return (
        <LayoutForm>
            <div className={styles.form}>
                <FormikProvider value={formik}>
                    <Form>
                        <h2 className={styles.label}>{t("forgot-password-email-subject")}</h2>
                        <p className={styles.description}>{t("forgot-password-desc")}</p>
                        <InputEmail
                            label={t("email")}
                            id="email"
                            name="email"
                        />
                        <p className={styles.error(isError)}>{errorText}</p>
                        <ButtonSubmit state={buttonState}>{t("submit")}</ButtonSubmit>
                    </Form>
                </FormikProvider>
                <div className={styles.linkRow}>
                    <Link className={styles.link} href="/public/login">{t('backToHome')}</Link>
                </div>
            </div>
        </LayoutForm>

    );
}

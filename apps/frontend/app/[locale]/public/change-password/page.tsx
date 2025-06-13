"use client"

import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import { FormikProvider, Form } from 'formik';
import {formStyles} from "@intra/ui/styles/formStyles";
import {InputPassword} from "@intra/ui/components/forms/inputs/InputPassword";
import {ButtonSubmit} from "@intra/ui/components/forms/buttons/buttonSubmit/ButtonSubmit";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {useChangePasswordForm} from "./form";
import {useChangePasswordMiddleware} from "./middleware";
import {useState} from "react";
import type {PageStatus} from "@intra/shared/types/common.types";
import {LoaderCircle} from "lucide-react";

export default function ChangePasswordPage() {
    // Oldal állapota
    const [pageStatus, setPageStatus] = useState<PageStatus>('loading');

    // Middleware, ahol ellenőrizzük a token érvényességét
    const {
        token
    } = useChangePasswordMiddleware(setPageStatus)

    // Betöltjük a fordításokat
    const t = useTranslations('all');

    // Betöltjük a formot
    const {
        formik,
        buttonState,
        isError,
        errorText
    } = useChangePasswordForm(token as string)

    // Létrehozzuk a sablont
    return (
        <LayoutForm>
            <FormikProvider value={formik}>
                <Form className={formStyles.form} >
                    <h2 className={formStyles.label}>{t('change-password')}</h2>

                    {/*Render állapot, ha tölt az oldal*/}
                    {pageStatus === 'loading' && (
                        <div><LoaderCircle/></div>
                    )}

                    {/*Render állapot, ha hibás vagy hiányzik a tokenünk*/}
                    {(pageStatus === 'invalid' || pageStatus === 'missingToken') && (
                        <p>hiba</p>
                    )}

                    {/*Render állapot, ha jó a tokenünk*/}
                    {pageStatus === 'valid' && (
                        <>
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

                            <p className={formStyles.required}>{t('*-required')}</p>
                            <p className={formStyles.error(isError)}>{errorText}</p>
                            <ButtonSubmit state={buttonState}>
                                {t('submit')}
                            </ButtonSubmit>
                        </>
                    )}

                    <div className={formStyles.linkRow}>
                        <Link className={formStyles.link} href="/public/login">{t('backToHome')}</Link>
                    </div>
                </Form>
            </FormikProvider>
        </LayoutForm>

    );
}

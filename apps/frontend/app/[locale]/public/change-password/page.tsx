"use client"

import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import { FormikProvider, Form } from 'formik';
import {formStyles} from "../../../../components/styles/formStyles";
import {InputPassword} from "@intra/ui/components/forms/inputs/InputPassword";
import {ButtonSubmit} from "@intra/ui/components/forms/buttons/buttonSubmit/ButtonSubmit";
import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {useChangePasswordForm} from "./form";
import {useChangePasswordMiddleware} from "./middleware";
import {useState} from "react";
import type {PageStatus} from "@intra/shared/types/common.types";
import {LoaderCircle} from "lucide-react";

/**
 * Jelszó változtató oldal
 */
export default function ChangePasswordPage() {
    // Oldal állapota
    const [pageStatus, setPageStatus] = useState<PageStatus>('loading');

    // Middleware, ahol ellenőrizzük a token érvényességét
    const {
        token
    } = useChangePasswordMiddleware(setPageStatus)

    // Betöltjük a fordításokat
    const locale = useLocale();
    const t = useTranslations('all');

    // Betöltjük a formot
    const {
        formik,
        buttonState,
        isError,
        errorText
    } = useChangePasswordForm(token as string, setPageStatus)

    // Létrehozzuk a sablont
    return (
        <LayoutForm>
            <FormikProvider value={formik}>
                <Form className={formStyles.form} >
                    {/*Form neve*/}
                    <h2 className={formStyles.label}>{t('change-password')}</h2>

                    {/*Render állapot, ha tölt az oldal*/}
                    {pageStatus === 'loading' && (
                        <div className={formStyles.loadingDiv}>
                            <LoaderCircle className={formStyles.loadingCircle}/>
                        </div>
                    )}

                    {/*/!*Render állapot, ha hibás vagy hiányzik a tokenünk*!/*/}
                    {(pageStatus === 'invalid' || pageStatus === 'missingToken') && (
                        <>
                            <p className={formStyles.message}>{t("expired-password-change-token")}</p>
                            <Link href={`/${locale}/public/forgot-password`} className={formStyles.linkMessage}>{t("click-here-to-password-change")}</Link>
                        </>
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

                    {/*Sikeres jelszó helyreállítás*/}
                    {pageStatus === 'succeeded' && (
                        <>
                            <p className={formStyles.message}>{t("succeded-password-change")}</p>
                            <p className={formStyles.description}>{t("you-can-login-now")}</p>
                        </>
                    )}

                    {/*Linkek*/}
                    <div className={formStyles.linkRow}>
                        <Link className={formStyles.link} href={`/${locale}/public/login`}>{t('backToHome')}</Link>
                    </div>
                </Form>
            </FormikProvider>
        </LayoutForm>

    );
}

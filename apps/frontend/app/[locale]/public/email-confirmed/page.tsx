'use client'

import { useState, useEffect } from "react";
import {useSearchParams} from 'next/navigation';
import type {VerifyEmailDto, VerifyEmailResponse} from "@intra/shared/types/auth.types";
import type {ApplicationLanguage, PageStatus} from "@intra/shared/types/common.types";
import { formStyles as styles } from "@intra/ui/formStyles";
import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import {useLocale, useTranslations} from "next-intl";
import {ApiService} from "../../../api/client/client";
import Link from "next/link";
import {formStyles} from "../../../../components/styles/formStyles";
import {LoaderCircle} from "lucide-react";

export default function SuccessRegistrationPage() {
    // Oldal állapota
    const [pageStatus, setPageStatus] = useState<PageStatus>('loading');

    // App nyelvének változói
    const t = useTranslations('all');
    const locale = useLocale();

    // Url paraméter betöltése
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    // Api lekérés futott e állapotának tárolása
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    // Api hívás függvénye
    const verifyEmail = async () => {
        try {
            // Jelezzük a lefutást
            setIsLoaded(true)

            // Létrehozzuk az api request adatait
            const requestData = { token }

            // Meghívjuk az apit
            const data: VerifyEmailResponse = await ApiService.auth.verifyEmail(
                requestData as VerifyEmailDto,  // adatok
                locale as ApplicationLanguage   // app nyelv
            )

            if (data.success) {
                // Ha sikeres akkor jelezzük
                setPageStatus('succeeded')
            }
        } catch (error: any) {
            // Hiba esetén hibát dobunk
            if(error.message === t('emailConfirmationConfirmed')){
                setPageStatus('valid');
            } else {
                setPageStatus('invalid');
            }
        }
    }

    // Ha megvan a tokenünk meghívjuk a lekérést
    useEffect(() => {
        if(!isLoaded) {
            if (!token) {
                setPageStatus('missingToken')
            } else {
                (async () => {
                    await verifyEmail();
                })();
            }
        }
    }, [token]);

    // Visszatérünk a sablonnal
    return (
        <LayoutForm>
            <div className={styles.form}>
                {/*Form neve*/}
                <h2 className={styles.label}>{t("registration-confirmation-email-subject")}</h2>

                {/*Render állapot, ha tölt az oldal*/}
                {pageStatus === 'loading' && (
                    <div className={formStyles.loadingDiv}>
                        <LoaderCircle className={formStyles.loadingCircle}/>
                    </div>
                )}

                {/*/!*Render állapot az email megerősítésről - már megerősítve */}
                {pageStatus === 'valid' && (
                    <>
                        <p className={formStyles.description}>{t("emailConfirmationConfirmed")}</p>
                    </>
                )}

                {/*/!*Render állapot az email megerősítésről - sikeres */}
                {pageStatus === 'succeeded' && (
                    <>
                        <p className={formStyles.description}>{t("emailConfirmationSuccess")}</p>
                    </>
                )}

                {/*/!*Render állapot ha hiba történt */}
                {pageStatus === 'invalid' && (
                    <>
                        <p className={formStyles.message}>{t("expired-email-confirmation-token")}</p>
                        <p onClick={() => setPageStatus('default')} className={formStyles.linkMessage}>{t("get-net-email-confirmation")}</p>
                    </>
                )}

                {/*Render állapot ha új megerősítőt kér*/}
                {pageStatus === 'default' && (
                    <>
                        <p>uj kell he</p>
                    </>
                )}

                {/*Linkek*/}
                <div className={styles.linkRow}>
                    <Link className={styles.link} href="/public/login">{t('backToHome')}</Link>
                </div>
            </div>
        </LayoutForm>
    );
}

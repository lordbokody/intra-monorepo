'use client'

import { useState, useEffect } from "react";
import {useSearchParams} from 'next/navigation';
import type {VerifyEmailDto, VerifyEmailResponse} from "@intra/shared/types/auth.types";
import type {ApplicationLanguage, PageStatus} from "@intra/shared/types/common.types";
import {formStyles} from "@intra/ui/components/styles/formStyles";
import {FormCard} from "@intra/ui/components/layout/FormCard/FormCard";
import {ApiService} from "../../../api/client/client";
import Link from "next/link";
import {LoaderCircle} from "lucide-react";
import {useAppTranslations} from "@intra/ui/utils/useAppTranslations";

/**
 * Email megerősítésére szolgáló oldal
 */
export default function SuccessRegistrationPage() {
    // Oldal állapota
    const [pageStatus, setPageStatus] = useState<PageStatus>('loading');

    // App nyelvének változói
    const { locale, t } = useAppTranslations();

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
        // Csak akkor futtatjuk, ha még nem kapott triggert
        if(!isLoaded) {
            if (!token) {
                // Ha nincs token jelezzük az oldalon
                setPageStatus('missingToken')
            } else {
                // Ha van token meghívjuk a hozzá tartozó függvényt
                (async () => {
                    await verifyEmail();
                })();
            }
        }
    }, [token]);

    // Visszatérünk a sablonnal
    return (
        <FormCard>
            <div className={formStyles.form}>
                {/*Form neve*/}
                <h2 className={formStyles.label}>{t("registration-confirmation-email-subject")}</h2>

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
                        <Link href={`/${locale}/public/resend-email`} className={formStyles.linkMessage}>{t("get-net-email-confirmation")}</Link>
                    </>
                )}

                {/*Linkek*/}
                <div className={formStyles.linkRow}>
                    <Link className={formStyles.link} href={`/${locale}/public/login`}>{t('backToHome')}</Link>
                </div>
            </div>
        </FormCard>
    );
}

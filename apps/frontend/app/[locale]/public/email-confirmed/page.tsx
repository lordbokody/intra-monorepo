'use client'

import { useState, useEffect } from "react";
import {useRouter, useSearchParams} from 'next/navigation';
import type {VerifyEmailDto, VerifyEmailResponse, VerifyEmailStatus} from "@intra/shared/types/auth.types";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {styles} from "./styles";
import {sleep} from "@intra/shared/utils/sleep.util";
import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import {useLocale, useTranslations} from "next-intl";
import {ApiService} from "../../../api/client/client";

export default function SuccessRegistrationPage() {
    // Az email megerősítésének státusza
    const [status, setStatus] = useState<VerifyEmailStatus>('loading');

    // Url paraméter betöltése
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    // App router
    const router = useRouter();

    // App nyelvének változói
    const t = useTranslations('all');
    const locale = useLocale();

    // Az oldal státuszainak üzenetei
    const getLabel = (status: VerifyEmailStatus) => {
        switch (status) {
            case "loading":
                return t("emailConfirmationLoading")
            case 'success':
                return t("emailConfirmationSuccess")
            case 'confirmed':
                return t("emailConfirmationConfirmed")
            case 'error':
                return t("error")
        }
    }

    // Sikeres api hívás segédfüggvénye
    const handleSuccess = async () => {
        await sleep(2000);
        router.push('/public/login');
    }

    // Api hívás függvénye
    const verifyEmail = async () => {
        try {
            // Létrehozzuk az api request adatait
            const requestData = { token }

            // Meghívjuk az apit
            const data: VerifyEmailResponse = await ApiService.auth.verifyEmail(
                requestData as VerifyEmailDto,  // adatok
                locale as ApplicationLanguage   // app nyelv
            )

            if (data.success) {
                // Ha sikeres akkor jelezzük
                setStatus('success')
            } else {
                // Ha már meg van erősítve az email cím jelezzük
                if(data.message === t('emailConfirmationConfirmed')){
                    setStatus('confirmed');
                }
            }

            // Sikeres futás esetén hívjuk a segédfüggvényt
            await handleSuccess();
        } catch (error) {
            // Hiba esetén hibát dobunk
            setStatus('error');
        }
    }

    // Ha a token az url-ből létrejön meghívjuk az api-t
    useEffect(() => {
        const timer = setTimeout(async () => {
            await verifyEmail()
        }, 2000);

        return () => clearTimeout(timer);
    }, [token]);

    // Visszatérünk a sablonnal
    return (
        <LayoutForm>
            <div className={styles.card(status)}>
                {styles.icon(status)}
                <div>
                    <p className={styles.label(status)}>
                        {getLabel(status)}
                    </p>
                </div>
            </div>
        </LayoutForm>
    );
}

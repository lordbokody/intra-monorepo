'use client'

import { useState, useEffect } from "react";
import {useRouter, useSearchParams} from 'next/navigation';
import { axiosRequest } from "../../../../utils/axios";
import type { VerifyEmailResponse, VerifyEmailStatus } from "@intra/shared/types/auth.types";
import {styles} from "./styles";
import {sleep} from "@intra/shared/utils/sleep.util";
import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import {useLocale, useTranslations} from "next-intl";

export default function SuccessRegistrationPage() {
    const [status, setStatus] = useState<VerifyEmailStatus>('loading');
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const router = useRouter();
    const t = useTranslations('all');
    const locale = useLocale();

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

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const response = await axiosRequest<VerifyEmailResponse>({
                    method: 'patch',
                    route: '/auth/verifyEmail',
                    data: {
                        token
                    }
                });

                if (response.success) {
                    setStatus('success')
                } else {
                    if(response.message === 'Felhasználó email címe már megerősítve!'){
                        setStatus('confirmed');
                    }
                }
                await sleep(2000);
                router.push('/public/login');
            } catch (error) {
                setStatus('error');
                console.error(error);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [token]);

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

'use client';

import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import {useLocale, useTranslations} from 'next-intl';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import { finishRegistrationSchema } from '@intra/shared/schemas/auth/finishRegistration.schema';
import { sleep } from '@intra/shared/utils/sleep.util';
import { getButtonState, ButtonStateType } from '../../../../utils/getButtonState';
import { FinishRegistrationDto, FinishRegistrationResponse } from '@intra/shared/types/auth.types';
import {ApiService} from "../../../api/client/client";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";

export const useFinishRegistrationForm = () => {
    // App router
    const router = useRouter();

    // App nyelvi változók
    const locale = useLocale() as ApplicationLanguage;
    const t = useTranslations("all");

    // Auth sessiont
    const { data: session } = useSession();

    // Form sikeres beküldését tároló változó
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    // Form hibaüzeneteit tároló változók
    const [isError, setIsError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string | null>(null);

    // Routeok közötti átirányítási állapot változója
    const [isForwarding, setIsForwarding] = useState<boolean>(false);

    // Form submit gombjának állapotát tároló változó
    const [buttonState, setButtonState] = useState<ButtonStateType>('enabled');

    // Form alapértelmezett adatai
    const initialValues: FinishRegistrationDto = {
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        password: '',
        confirmPassword: '',
        birthday: '',
        acceptTerms: false,
        acceptPrivacy: false,
    };

    // Segédfüggvény a formban lévő hibák kezelésére
    const handleError = async (message?: string) => {
        setIsError(true);
        setErrorText(message || null);
        await sleep(3000);
        setIsError(false);
    };

    // Segédfüggvény a form sikeres lefutása után
    const handleSuccess = async () => {
        setIsSuccess(true);
        await sleep(3000);
        setIsForwarding(true);
        router.push('/private/home');
    }

    // Form submit függvénye
    const onSubmit = async (values: FinishRegistrationDto): Promise<void> => {
        try {
            // Meghívjuk az API klienst
            const data: FinishRegistrationResponse = await ApiService.auth.finishRegistration(
                values,                         // form adatok
                locale as ApplicationLanguage,  // app nyelv
                session?.backendJwt as string   // auth token
            );

            // Ha sikertelen a hívás, akkor hibát dobunk
            if (!data.success) return await handleError(data.message);

            // Bejelentkezünk az auth session-be
            const signInResult = await signIn('credentials', {
                redirect: false,
                token: data.token,
                role: data.user?.role,
                registrationStatus: data.user?.registrationStatus,
            });

            // Ha sikertelen az auth session bejelentkezés, akkor hibát dobunk
            if (!signInResult?.ok) return await handleError(t("auth-failed"));

            // Sikeres futás esetén meghívjuk a szükséges műveletet
            await handleSuccess();
        } catch (error) {
            // Ha sikertelen a hívás, akkor hibát dobunk
            await handleError((error as Error).message);
        }
    };

    // Létrehozzuk a formot
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit,
        validationSchema: finishRegistrationSchema(locale).client(),
        validateOnBlur: true,
        validateOnChange: true,
    });

    // A form állapotainak változását figyelve állítjuk a submit gombot
    useEffect(() => {
        const state = getButtonState(
            formik.isValid,
            formik.dirty,
            formik.isSubmitting,
            isSuccess,
            isForwarding,
            isError
        );
        setButtonState(state);
    }, [formik.isValid, formik.dirty, formik.isSubmitting, isSuccess, isError, isForwarding]);

    // Visszatérünk a formmal és a gomb státuszával
    return { formik, buttonState, isError, errorText };
};

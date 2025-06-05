'use client'

import {useEffect, useState} from "react";
import {ButtonStateType, getButtonState} from "../../../../utils/getButtonState";
import {useRouter} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {signIn} from "next-auth/react";
import {useFormik} from "formik";
import {sleep} from "@intra/shared/utils/sleep.util";
import {LoginDto, LoginResponse} from "@intra/shared/types/auth.types";
import {ApiService} from "../../../api/client/client";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

export const useLoginForm = () => {
    // Form sikeres beküldését tároló változó
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    // Routeok közötti átirányítási állapot változója
    const [isForwarding, setIsForwarding] = useState<boolean>(false);

    // Form submit gombjának állapotát tároló változók
    const [buttonState, setButtonState] = useState<ButtonStateType>('disabled');
    const [buttonGoogleState, setButtonGoogleState] = useState<ButtonStateType>('enabled');

    // Form hibaüzeneteit tároló változók
    const [isError, setIsError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string | null>(null);

    // App router
    const router = useRouter();

    // App nyelvi változók
    const locale = useLocale();
    const t = useTranslations("all");

    // Form alapértelmezett adatai
    const initialValues: LoginDto = {
        email: '',
        password: '',
    }

    // Segédfüggvény a Google bejelentkezéshez
    const signInWithGoogle = () => {
        setButtonGoogleState('submitting')
        return signIn("google")
    }

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

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                // Meghívjuk az API klienst
                const data: LoginResponse = await ApiService.auth.login(
                    values,
                    locale as ApplicationLanguage
                )

                // Ha sikertelen a hívás, akkor hibát dobunk
                if (!data.success) return await handleError(data.message);

                // Bejelentkezünk az auth session-be
                const signInResult = await signIn("credentials", {
                    redirect: false,
                    token: data.token,
                    role: data?.user?.role,
                    registrationStatus: data?.user?.registrationStatus,
                });

                // Ha sikertelen az auth session bejelentkezés, akkor hibát dobunk
                if (!signInResult?.ok) return await handleError(t("auth-failed"));

                // Sikeres futás esetén meghívjuk a szükséges műveletet
                await handleSuccess();
            } catch (error) {
                // Ha sikertelen a hívás, akkor hibát dobunk
                await handleError((error as Error).message);
            }
        },
        validateOnBlur: true,
        validateOnChange: true,
    });

    // A form állapotainak változását figyelve állítjuk a submit gombot
    useEffect(() => {
        const buttonState = getButtonState(formik.isValid, formik.dirty, formik.isSubmitting, isSuccess, isForwarding, isError);
        setButtonState(buttonState);
    }, [formik.isValid, formik.dirty, formik.isSubmitting, isSuccess, isError, isForwarding]);

    // A form állapotainak változását figyelve állítjuk a submit gombot
    useEffect(() => {
        if(buttonGoogleState === 'submitting') {
            setButtonState('disabled');
        }
    }, [buttonGoogleState]);

    // Visszatérünk a formmal és a gomb státuszával
    return { formik, buttonState, isError, errorText, buttonGoogleState, signInWithGoogle };
}
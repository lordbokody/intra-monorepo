'use client'

import {useLocale} from "next-intl";
import { useEffect, useState } from 'react';
import {ButtonStateType, getButtonState} from "../../../../utils/getButtonState";
import { ReVerifyEmailDto, ReVerifyEmailResponse } from "@intra/shared/types/auth.types";
import {sleep} from "@intra/shared/utils/sleep.util";
import {ApiService} from "../../../api/client/client";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {useFormik} from "formik";
import {forgotPasswordRequestSchema} from "@intra/shared/schemas/auth/forgotPasswordRequest.schema";

/**
 * Megerősítő email újraküldő oldal formja
 */
export const useResendEmailForm = (setPageStatus: Function) => {
    // App nyelvi változók
    const locale = useLocale() as ApplicationLanguage;

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
    const initialValues: ReVerifyEmailDto = {
        email: ''
    }

    // Segédfüggvény a formban lévő hibák kezelésére
    const handleError = async (message?: string) => {
        // Beállítjuk, hogy hiba van
        setIsError(true);

        // Beállítjuk a hibaüzenetet
        setErrorText(message || null);

        //Várunk 3 másodpercet
        await sleep(3000);

        // Kikapcsoljuk, hogy hiba van
        setIsError(false);
    };

    // Segédfüggvény a form sikeres lefutása után
    const handleSuccess = async () => {
        // Beállítjuk, hogy sikeres a futás
        setIsSuccess(true);

        // Várunk 2 másodpercet
        await sleep(2000);

        // Beállítjuk, hogy átirányítás alatt vagyunk
        setIsForwarding(true);

        // Jelezzük a felületen, hogy sikeres a futás
        setPageStatus('succeeded')
    }

    // Form submit függvénye
    const onSubmit = async (values: ReVerifyEmailDto): Promise<void>  => {
        try {
            // Meghívjuk az API klienst
            const data: ReVerifyEmailResponse = await ApiService.auth.reVerifyEmail(
                values,                         // form adatok
                locale as ApplicationLanguage,  // app nyelv
            )

            // Ha sikertelen a hívás, akkor hibát dobunk
            if (!data.success) return await handleError(data.message);

            // Sikeres futás esetén meghívjuk a szükséges műveletet
            await handleSuccess();
        } catch (error) {
            // Ha sikertelen a hívás, akkor hibát dobunk
            await handleError((error as Error).message);
        }
    }

    // Létrehozzuk a formot
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit,
        validationSchema: forgotPasswordRequestSchema(locale).client(),
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
}
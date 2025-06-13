'use client'

import {useLocale} from "next-intl";
import { useEffect, useState } from 'react';
import {ButtonStateType, getButtonState} from "../../../../utils/getButtonState";
import { ForgotPasswordRequestDto, ForgotPasswordRequestResponse } from "@intra/shared/types/auth.types";
import {sleep} from "@intra/shared/utils/sleep.util";
import {ApiService} from "../../../api/client/client";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {useFormik} from "formik";
import {forgotPasswordRequestSchema} from "@intra/shared/schemas/auth/forgotPasswordRequest.schema";

export const useForgotPasswordRequestForm = (setPageStatus: Function) => {
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
    const initialValues: ForgotPasswordRequestDto = {
        email: ''
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
        await sleep(500);
        setIsForwarding(true);
        setPageStatus('succeeded')
    }

    // Form submit függvénye
    const onSubmit = async (values: ForgotPasswordRequestDto): Promise<void>  => {
        try {
            // Meghívjuk az API klienst
            const data: ForgotPasswordRequestResponse = await ApiService.auth.forgotPasswordRequest(
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
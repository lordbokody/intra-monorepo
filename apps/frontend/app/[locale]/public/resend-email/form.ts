'use client'

import { ReVerifyEmailDto, ReVerifyEmailResponse } from "@intra/shared/types/auth.types";
import {ApiService} from "../../../api/client/client";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {useFormik} from "formik";
import {forgotPasswordRequestSchema} from "@intra/shared/schemas/auth/forgotPasswordRequest.schema";
import {useFormStatus} from "@intra/ui/utils/useFormStatus";
import {useAppTranslations} from "@intra/ui/utils/useAppTranslations";

/**
 * Megerősítő email újraküldő oldal formja
 */
export const useResendEmailForm = (setPageStatus: Function) => {
    // App nyelvi változók
    const { locale } = useAppTranslations();

    // Form alapértelmezett adatai
    const initialValues: ReVerifyEmailDto = {
        email: ''
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
            if (!data.success){
                return await handleError(data.message as string);
            }

            // Sikeres futás esetén meghívjuk a szükséges műveletet
            await handleSuccess(() => {
                setPageStatus('succeeded')
            })
        } catch (error) {
            // Ha sikertelen a hívás, akkor hibát dobunk
            await handleError((error as Error).message as string);
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

    // Betöltjük a form státuszát kezelő hookot
    const {
        isError,
        errorText,
        buttonState,
        handleError,
        handleSuccess,
    } = useFormStatus({
        isValid: formik.isValid,
        isDirty: formik.dirty,
        isSubmitting: formik.isSubmitting,
    });

    // Visszatérünk a formmal és a gomb státuszával
    return { formik, buttonState, isError, errorText };
}
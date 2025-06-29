"use client"

import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {ForgotPasswordChangeDto} from "@intra/shared/types/auth.types"
import {ApiService} from "../../../api/client/client";
import {useFormik} from "formik";
import {forgotPasswordChangeSchema} from "@intra/shared/schemas/auth/forgotPasswordChange.schema";
import {useFormStatus} from "@intra/ui/utils/useFormStatus";
import {useAppTranslations} from "@intra/ui/utils/useAppTranslations";

/**
 * Jelszó változtató oldalhoz tartozó form
 */
export const useChangePasswordForm = (token: string, setPageStatus: Function) => {
    // App nyelvi változók
    const { locale } = useAppTranslations();

    // Form alapértelmezett adatai
    const initialValues: ForgotPasswordChangeDto = {
        password: '',
        confirmPassword: '',
        token
    }

    // Form submit függvénye
    const onSubmit = async (values: ForgotPasswordChangeDto) => {
        try {
            // Meghívjuk az API klienst
            await ApiService.auth.forgotPasswordChange(
                values,                         // form adatok
                locale as ApplicationLanguage,  // app nyelv
            )

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
        onSubmit,
        enableReinitialize: true,
        validationSchema: forgotPasswordChangeSchema(locale).client(),
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
    return { formik, buttonState, errorText, isError }
}
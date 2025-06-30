"use client"

import {useFormik} from "formik";
import {RegisterDto, RegisterResponse} from "@intra/shared/types/auth.types";
import {ApiService} from "../../../api/client/client";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {registerSchema} from "@intra/shared/schemas/auth/register.schema";
import {checkEmailExists} from "../../../api/client/helpers/checkEmailExists.helper";
import {useFormStatus} from "@intra/ui/utils/useFormStatus";
import {useAppTranslations} from "@intra/ui/utils/useAppTranslations";

/**
 * Regisztráció oldalhoz tartozó form
 */
export const useRegistrationForm = (setPageStatus: Function) => {
    // App nyelvi változók
    const { locale } = useAppTranslations();

    // Form alapértelmezett adatai
    const initialValues: RegisterDto = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthday: '',
        acceptTerms: false,
        acceptPrivacy: false
    }

    // Form submit függvénye
    const onSubmit = async (values: RegisterDto) => {
        try {
            // Meghívjuk az API klienst
            const data: RegisterResponse = await ApiService.auth.register(
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
        onSubmit,
        validationSchema: registerSchema(locale).client(checkEmailExists(locale)),
        validateOnBlur: true,
        validateOnChange: true,
    });

    // A form állapotainak változását figyelve állítjuk a submit gombot
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
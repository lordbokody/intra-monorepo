'use client'

import {useState} from "react";
import {ButtonStateType} from "@intra/shared/types/common.types";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {useFormik} from "formik";
import {LoginDto, LoginResponse} from "@intra/shared/types/auth.types";
import {ApiService} from "../../../api/client/client";
import {ApplicationLanguage} from "@intra/shared/types/common.types";
import {useFormStatus} from "@intra/ui/utils/useFormStatus";
import {useAppTranslations} from "@intra/ui/utils/useAppTranslations";

/**
 * Login oldalhoz tartozó form
 */
export const useLoginForm = () => {
    // Form submit gombjának állapotát tároló változók
    const [buttonGoogleState, setButtonGoogleState] = useState<ButtonStateType>('enabled');

    // App router
    const router = useRouter();

    // App nyelvi változók
    const { locale, t } = useAppTranslations();

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

    // Form submit függvénye
    const onSubmit = async (values: LoginDto): Promise<void> => {
        try {
            // Meghívjuk az API klienst
            const data: LoginResponse = await ApiService.auth.login(
                values,
                locale as ApplicationLanguage
            )

            // Ha sikertelen a hívás, akkor hibát dobunk
            if (!data.success){
                return await handleError(data.message as string);
            }

            // Bejelentkezünk az auth session-be
            const signInResult = await signIn("credentials", {
                redirect: false,
                token: data.token,
                role: data?.user?.role,
                registrationStatus: data?.user?.registrationStatus,
            });

            // Ha sikertelen az auth session bejelentkezés, akkor hibát dobunk
            if (!signInResult?.ok){
                return await handleError(t("auth-failed"));
            }

            // Sikeres futás esetén meghívjuk a szükséges műveletet
            await handleSuccess(() => {
                router.push(`/${locale}/private/home`)
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
    return { formik, buttonState, isError, errorText, buttonGoogleState, signInWithGoogle };
}
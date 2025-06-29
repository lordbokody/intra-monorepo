'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { finishRegistrationSchema } from '@intra/shared/schemas/auth/finishRegistration.schema';
import { FinishRegistrationDto, FinishRegistrationResponse } from '@intra/shared/types/auth.types';
import {ApiService} from "../../../api/client/client";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {useFormStatus} from "@intra/ui/utils/useFormStatus";
import {useAppTranslations} from "@intra/ui/utils/useAppTranslations";

/**
 * Regisztráció befejezése oldalhoz tartozó form
 */
export const useFinishRegistrationForm = () => {
    // App router
    const router = useRouter();

    // App nyelvi változók
    const { locale, t } = useAppTranslations();

    // Auth sessiont
    const { data: session } = useSession();

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
            if (!data.success){
                return await handleError(data.message as string);
            }

            // Bejelentkezünk az auth session-be
            const signInResult = await signIn('credentials', {
                redirect: false,
                token: data.token,
                role: data.user?.role,
                registrationStatus: data.user?.registrationStatus,
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
};

import {useEffect, useState} from "react";
import {ButtonStateType, getButtonState} from "../../../../utils/getButtonState";
import {useRouter} from "next/navigation";
import {useLocale} from "next-intl";
import {useFormik} from "formik";
import {RegisterDto} from "@intra/shared/types/auth.types";
import { sleep } from '@intra/shared/utils/sleep.util';
import {ApiService} from "../../../api/client/client";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {registerSchema} from "@intra/shared/schemas/auth/register.schema";
import {checkEmailExists} from "../../../../utils/checkEmailExists.util";


export const useRegistrationForm = (setPageStatus: Function) => {
    // Form sikeres beküldését tároló változó
    const [isSuccess, setIsSuccess] = useState(false);

    // Routeok közötti átirányítási állapot változója
    const [isForwarding, setIsForwarding] = useState(false);

    // Form submit gombjának állapotát tároló változó
    const [buttonState, setButtonState] = useState<ButtonStateType>('disabled');

    // App nyelvi változók
    const locale = useLocale() as ApplicationLanguage;

    // Form hibaüzeneteit tároló változók
    const [isError, setIsError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string | null>(null);

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
        await sleep(2000);
        setIsForwarding(true);
        setPageStatus('succeeded');
    }

    // Form submit függvénye
    const onSubmit = async (values: RegisterDto) => {
        try {
            // Meghívjuk az API klienst
            await ApiService.auth.register(
                values,                         // form adatok
                locale as ApplicationLanguage,  // app nyelv
            )

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
        onSubmit,
        validationSchema: registerSchema(locale).client(checkEmailExists(locale)),
        validateOnBlur: true,
        validateOnChange: true,
    });

    // A form állapotainak változását figyelve állítjuk a submit gombot
    useEffect(() => {
        const buttonState = getButtonState(formik.isValid, formik.dirty, formik.isSubmitting, isSuccess, isForwarding, isError);
        setButtonState(buttonState);
    }, [formik.isValid, formik.dirty, formik.isSubmitting, isSuccess, isError, isForwarding]);

    // Visszatérünk a formmal és a gomb státuszával
    return { formik, buttonState, errorText, isError }
}
"use client"

import {useSearchParams} from "next/navigation";
import {useLocale} from "next-intl";
import {useEffect, useState} from "react";
import {ApiService} from "../../../api/client/client";
import type {VerifyTokenDto, VerifyTokenResponse} from "@intra/shared/types/auth.types";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";

export const useChangePasswordMiddleware = (setPageStatus: Function) => {
    // Betöltjük a fordításokat
    const locale = useLocale();

    // Url paraméter betöltése
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    // Middleware futott e állapotának tárolása
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    // Sikeres api hívás esetén futó segédfüggvény
    const handleSuccess = async (result: VerifyTokenResponse) => {
        setPageStatus(result.success ? 'valid' : 'invalid');
    }

    // Middleware futásának függvénye
    const handleMiddleware = async () => {
        setIsLoaded(true);
        try {
            const requestData: VerifyTokenDto = {
                token: token as string
            }

            // Meghívjuk az API klienst
            const result = await ApiService.auth.verifyToken(
                requestData,                    // form adatok
                locale as ApplicationLanguage,  // app nyelv
            )

            // Sikeres futás esetén meghívjuk a szükséges műveletet
            await handleSuccess(result);
        } catch (error) {
            // Ha sikertelen a hívás, akkor állítunk a token státuszán
            setPageStatus('invalid')
        }
    }

    // Middleware futtatása
    useEffect(() => {
        if(!isLoaded) {
            if (!token) {
                setPageStatus('missingToken')
            } else {
                handleMiddleware()
            }
        }
    }, [token])

    // Visszatérünk a tokennel, amit majd felhasználunk a formban
    return { token }
}
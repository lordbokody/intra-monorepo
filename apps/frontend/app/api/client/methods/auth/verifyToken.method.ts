import {VerifyTokenDto, VerifyTokenResponse} from "@intra/shared/types/auth.types";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {AxiosMethod, axiosRequest} from "../../axios";

/**
 * Token ellenőrzésének API hívása
 */
export const verifyTokenMethod = async (data: VerifyTokenDto, language: ApplicationLanguage): Promise<VerifyTokenResponse> => {
    try {
        // Létrehozzuk a request adatokat
        const requestData = {
            method: 'post' as AxiosMethod,
            route: '/auth/verifyToken',
            data,
            language,
        }

        // Meghívjuk a szervert
        return await axiosRequest<VerifyTokenResponse>(requestData)
    } catch (error: any) {
        // Betöltjük a hibaüzenetet
        let errorText = error.response?.data?.message || (error as string);

        // Az error szövegből levágjuk a validation részt
        if (typeof errorText === 'string') {
            errorText = errorText.replace(/^ValidationError:\s*/, '');
        }

        // Eldobjuk a hibát
        throw new Error(errorText as string);
    }
}
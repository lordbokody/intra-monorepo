import {ApplicationLanguage} from "@intra/shared/types/common.types";
import {RegisterDto, RegisterResponse} from "@intra/shared/types/auth.types";
import {axiosRequest, AxiosMethod} from "../../axios";

/**
 * Regisztráció API hívása
 */
export const registerMethod = async (data: RegisterDto, language: ApplicationLanguage) => {
    try {
        // Létrehozzuk a request adatokat
        const requestData = {
            method: 'post' as AxiosMethod,
            route: '/auth/register',
            data,
            language
        }

        // Meghívjuk a szervert
        return await axiosRequest<RegisterResponse>(requestData)
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
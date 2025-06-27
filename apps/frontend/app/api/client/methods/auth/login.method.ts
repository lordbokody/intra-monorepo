import {LoginDto, LoginResponse} from "@intra/shared/types/auth.types";
import {axiosRequest, AxiosMethod} from "../../axios";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Login API hívása
 */
export const loginMethod = async (data: LoginDto, language: ApplicationLanguage): Promise<LoginResponse> => {
    try {
        // Létrehozzuk a request adatokat
        const requestData = {
            method: 'post' as AxiosMethod,
            route: '/auth/login',
            data,
            language
        }

        // Meghívjuk a szervert
        return await axiosRequest<LoginResponse>(requestData)
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
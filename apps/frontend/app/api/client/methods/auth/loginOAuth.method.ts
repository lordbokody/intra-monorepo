import {LoginOAuthDto, LoginOAuthResponse} from "@intra/shared/types/auth.types";
import {axiosRequest, AxiosMethod} from "../../axios";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Login Oauth API hívása
 */
export const loginOAuthMethod = async (data: LoginOAuthDto, language: ApplicationLanguage): Promise<LoginOAuthResponse> => {
    try {
        // Létrehozzuk a request adatokat
        const requestData = {
            method: 'post' as AxiosMethod,
            route: '/auth/loginOAuth',
            data,
            language
        }

        // Meghívjuk a szervert
        return await axiosRequest<LoginOAuthResponse>(requestData)
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
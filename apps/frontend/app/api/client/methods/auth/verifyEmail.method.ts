import {VerifyEmailDto, VerifyEmailResponse} from "@intra/shared/types/auth.types";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {AxiosMethod, axiosRequest} from "../../axios";

/**
 * Email megerősítésének API hívása
 */
export const verifyEmailMethod = async (data: VerifyEmailDto, language: ApplicationLanguage): Promise<VerifyEmailResponse> => {
    try {
        // Létrehozzuk a request adatokat
        const requestData = {
            method: 'patch' as AxiosMethod,
            route: '/auth/verifyEmail',
            data,
            language,
        }

        // Meghívjuk a szervert
        return await axiosRequest<VerifyEmailResponse>(requestData)
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
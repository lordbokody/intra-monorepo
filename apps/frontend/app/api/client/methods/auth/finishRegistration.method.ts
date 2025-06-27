import {AxiosMethod, axiosRequest} from "../../axios";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {FinishRegistrationDto, FinishRegistrationResponse} from "@intra/shared/types/auth.types";

/**
 * Regisztráció befejezésének API hívása
 */
export const finishRegistrationMethod = async (data: FinishRegistrationDto, language: ApplicationLanguage, token: string): Promise<FinishRegistrationResponse> => {
    try {
        // Létrehozzuk a request adatokat
        const requestData = {
            method: 'patch' as AxiosMethod,
            route: '/auth/finishRegistration',
            data,
            language,
            token,
        }

        // Meghívjuk a szervert
        return await axiosRequest<FinishRegistrationResponse>(requestData)
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
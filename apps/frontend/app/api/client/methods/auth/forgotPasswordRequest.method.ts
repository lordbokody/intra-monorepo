import {ApplicationLanguage} from "@intra/shared/types/common.types";
import {ForgotPasswordRequestDto, ForgotPasswordRequestResponse} from "@intra/shared/types/auth.types";
import {axiosRequest, AxiosMethod} from "../../axios";

/**
 *  Elfelejtett jelszó kérelem API hívása
 */
export const forgotPasswordRequestMethod = async (data: ForgotPasswordRequestDto, language: ApplicationLanguage) => {
    try {
        // Létrehozzuk a request adatokat
        const requestData = {
            method: 'post' as AxiosMethod,
            route: '/auth/forgotPasswordRequest',
            data,
            language
        }

        // Meghívjuk a szervert
        return await axiosRequest<ForgotPasswordRequestResponse>(requestData)
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
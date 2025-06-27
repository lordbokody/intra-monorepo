import {FindOneByEmailDto, FindOneByEmailResponse} from "@intra/shared/types/user.types";
import {axiosRequest, AxiosMethod} from "../../axios";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Felhasználó megkeresése email alapján API hívása
 */
export const findOneByEmailMethod = async (data: FindOneByEmailDto, language: ApplicationLanguage): Promise<FindOneByEmailResponse> => {
    try {
        // Létrehozzuk a request adatokat
        const requestData = {
            method: 'get' as AxiosMethod,
            route: `/user/find/${data}`,
            language
        };

        // Meghívjuk a szervert
        return await axiosRequest<FindOneByEmailResponse>(requestData)
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
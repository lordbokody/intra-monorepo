import {AxiosMethod, axiosRequest} from "../axios";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {FinishRegistrationDto, FinishRegistrationResponse} from "@intra/shared/types/auth.types";

export const finishRegistrationMethod = async (data: FinishRegistrationDto, language: ApplicationLanguage, token: string): Promise<FinishRegistrationResponse> => {
    try {
        const requestData = {
            method: 'patch' as AxiosMethod,
            route: '/auth/finishRegistration',
            data,
            language,
            token,
        }
        return await axiosRequest<FinishRegistrationResponse>(requestData)
    } catch (error) {
        throw new Error(error as string);
    }
}
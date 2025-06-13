import {VerifyTokenDto, VerifyTokenResponse} from "@intra/shared/types/auth.types";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {AxiosMethod, axiosRequest} from "../../axios";

export const verifyTokenMethod = async (data: VerifyTokenDto, language: ApplicationLanguage): Promise<VerifyTokenResponse> => {
    try {
        const requestData = {
            method: 'post' as AxiosMethod,
            route: '/auth/verifyToken',
            data,
            language,
        }

        return await axiosRequest<VerifyTokenResponse>(requestData)
    } catch (error: any) {
        let errorText = error.response?.data?.message || (error as string);
        if (typeof errorText === 'string') {
            errorText = errorText.replace(/^ValidationError:\s*/, '');
        }
        throw new Error(errorText as string);
    }
}
import {VerifyEmailDto, VerifyEmailResponse} from "@intra/shared/types/auth.types";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";
import {AxiosMethod, axiosRequest} from "../axios";

export const verifyEmailMethod = async (data: VerifyEmailDto, language: ApplicationLanguage): Promise<VerifyEmailResponse> => {
    try {
        const requestData = {
            method: 'patch' as AxiosMethod,
            route: '/auth/verifyEmail',
            data,
            language,
        }

        return await axiosRequest<VerifyEmailResponse>(requestData)
    } catch (error) {
        throw new Error(error as string);
    }
}
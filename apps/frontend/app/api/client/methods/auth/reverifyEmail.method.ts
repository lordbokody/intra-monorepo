import {ApplicationLanguage} from "@intra/shared/types/common.types";
import {ReVerifyEmailDto, ReVerifyEmailResponse} from "@intra/shared/types/auth.types";
import {axiosRequest, AxiosMethod} from "../../axios";

export const reverifyEmailMethod = async (data: ReVerifyEmailDto, language: ApplicationLanguage) => {
    try {
        const requestData = {
            method: 'post' as AxiosMethod,
            route: '/auth/reverifyEmail',
            data,
            language
        }

        return await axiosRequest<ReVerifyEmailResponse>(requestData)
    } catch (error: any) {
        let errorText = error.response?.data?.message || (error as string);
        if (typeof errorText === 'string') {
            errorText = errorText.replace(/^ValidationError:\s*/, '');
        }
        throw new Error(errorText as string);
    }
}
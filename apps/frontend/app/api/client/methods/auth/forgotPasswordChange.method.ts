import {ApplicationLanguage} from "@intra/shared/types/common.types";
import {ForgotPasswordChangeDto, ForgotPasswordChangeResponse} from "@intra/shared/types/auth.types";
import {axiosRequest, AxiosMethod} from "../../axios";

export const forgotPasswordChangeMethod = async (data: ForgotPasswordChangeDto, language: ApplicationLanguage) => {
    try {
        const requestData = {
            method: 'post' as AxiosMethod,
            route: '/auth/forgotPasswordChange',
            data,
            language
        }
        return await axiosRequest<ForgotPasswordChangeResponse>(requestData)
    } catch (error: any) {
        let errorText = error.response?.data?.message || (error as string);
        if (typeof errorText === 'string') {
            errorText = errorText.replace(/^ValidationError:\s*/, '');
        }
        throw new Error(errorText as string);
    }
}
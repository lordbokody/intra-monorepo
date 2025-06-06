import {ApplicationLanguage} from "@intra/shared/types/common.types";
import {ForgotPasswordRequestDto, ForgotPasswordRequestResponse} from "@intra/shared/types/auth.types";
import {axiosRequest, AxiosMethod} from "../../axios";

export const forgotPasswordRequestMethod = async (data: ForgotPasswordRequestDto, language: ApplicationLanguage) => {
    try {
        const requestData = {
            method: 'post' as AxiosMethod,
            route: '/auth/forgotPasswordRequest',
            data,
            language
        }
        return await axiosRequest<ForgotPasswordRequestResponse>(requestData)
    } catch (error: any) {
        let errorText = error.response?.data?.message || (error as string);
        if (typeof errorText === 'string') {
            errorText = errorText.replace(/^ValidationError:\s*/, '');
        }
        throw new Error(errorText as string);
    }
}
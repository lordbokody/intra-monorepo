import {LoginDto, LoginResponse} from "@intra/shared/types/auth.types";
import {axiosRequest, AxiosMethod} from "../../axios";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";

export const loginMethod = async (data: LoginDto, language: ApplicationLanguage): Promise<LoginResponse> => {
    try {
        const requestData = {
            method: 'post' as AxiosMethod,
            route: '/auth/login',
            data,
            language
        }

        return await axiosRequest<LoginResponse>(requestData)
    } catch (error: any) {
        let errorText = error.response?.data?.message || (error as string);
        if (typeof errorText === 'string') {
            errorText = errorText.replace(/^ValidationError:\s*/, '');
        }
        throw new Error(errorText as string);
    }
}
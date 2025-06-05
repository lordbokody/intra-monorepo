import {LoginDto, LoginResponse} from "@intra/shared/types/auth.types";
import {axiosRequest, AxiosMethod} from "../axios";
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
    } catch (error) {
        throw new Error(error as string);
    }
}
import {ApplicationLanguage} from "@intra/shared/types/common.types";
import {RegisterDto, RegisterResponse} from "@intra/shared/types/auth.types";
import {axiosRequest, AxiosMethod} from "../axios";

export const registerMethod = async (data: RegisterDto, language: ApplicationLanguage) => {
    try {
        const requestData = {
            method: 'post' as AxiosMethod,
            route: '/auth/register',
            data,
            language
        }
        return await axiosRequest<RegisterResponse>(requestData)
    } catch (error) {
        throw new Error(error as string);
    }
}
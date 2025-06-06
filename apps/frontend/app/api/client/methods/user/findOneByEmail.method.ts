import {FindOneByEmailDto, FindOneByEmailResponse} from "@intra/shared/types/user.types";
import {axiosRequest, AxiosMethod} from "../../axios";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";

export const findOneByEmailMethod = async (data: FindOneByEmailDto, language: ApplicationLanguage): Promise<FindOneByEmailResponse> => {
    try {
        const requestData = {
            method: 'get' as AxiosMethod,
            route: `/user/find/${data}`,
            language
        };

        return await axiosRequest<FindOneByEmailResponse>(requestData)
    } catch (error: any) {
        let errorText = error.response?.data?.message || (error as string);
        if (typeof errorText === 'string') {
            errorText = errorText.replace(/^ValidationError:\s*/, '');
        }
        throw new Error(errorText as string);
    }
}
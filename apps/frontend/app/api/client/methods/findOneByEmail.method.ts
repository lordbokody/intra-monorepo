import {FindOneByEmailDto, FindOneByEmailResponse} from "@intra/shared/types/user.types";
import {axiosRequest, AxiosMethod} from "../axios";
import type {ApplicationLanguage} from "@intra/shared/types/common.types";

export const findOneByEmailMethod = async (data: FindOneByEmailDto, language: ApplicationLanguage): Promise<FindOneByEmailResponse> => {
    try {
        const requestData = {
            method: 'get' as AxiosMethod,
            route: `/user/find/${data.email}`,
            language
        };

        return await axiosRequest<FindOneByEmailResponse>(requestData)
    } catch (error) {
        throw new Error(error as string);
    }
}
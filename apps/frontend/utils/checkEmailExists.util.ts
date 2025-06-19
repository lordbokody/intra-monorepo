import {FindOneByEmailDto, FindOneByEmailResponse} from "@intra/shared/types/user.types";
import {ApplicationLanguage} from "@intra/shared/types/common.types";
import {ApiService} from "../app/api/client/client";

export const checkEmailExists =
    (locale: ApplicationLanguage) =>
        async (data: FindOneByEmailDto): Promise<boolean> => {
            const response: FindOneByEmailResponse = await ApiService.user.findOneByEmail(data, locale);
            return !response.success;
        };

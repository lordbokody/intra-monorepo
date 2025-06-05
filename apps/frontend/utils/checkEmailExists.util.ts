'use client'

import {FindOneByEmailDto, FindOneByEmailResponse} from "@intra/shared/types/user.types";
import {ApplicationLanguage} from "@intra/shared/types/common.types";
import {ApiService} from "../app/api/client/client";
import {useLocale} from "next-intl";

export const checkEmailExists = async (data: FindOneByEmailDto): Promise<boolean> => {
    // App nyelvi változók
    const locale = useLocale();

    const response: FindOneByEmailResponse = await ApiService.user.findOneByEmail(data, locale as ApplicationLanguage);

    return !response.success;
};
import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";
import {ApplicationLanguage} from "../../types/common.types";

export const sendForgotPasswordEmailSchema = (locale: ApplicationLanguage = "hu") => {
    const t = createTranslator(locale);

    const client = () =>
        yup.object({
            name: yup.string().required(t("required")),
            email: yup.string().required(t("required")),
            token: yup.string().required(t("required")),
        });

    return { client };
};

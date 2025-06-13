import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";
import {ApplicationLanguage} from "../../types/common.types";

export const findOneByEmailSchema = (locale: ApplicationLanguage = "hu") => {
    const t = createTranslator(locale);

    const client = () =>
        yup.object({
            email: yup.string().required(t("required")),
        });

    return { client };
};

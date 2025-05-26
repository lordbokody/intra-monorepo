import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";

export const sendForgotPasswordEmailSchema = (locale: string = "hu") => {
    const t = createTranslator(locale);

    const client = () =>
        yup.object({
            name: yup.string().required(t("required")),
            email: yup.string().required(t("required")),
            token: yup.string().required(t("required")),
        });

    return { client };
};

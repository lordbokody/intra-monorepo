import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";
import {ApplicationLanguage} from "../../types/common.types";

export const getAllUsersSchema = (locale: ApplicationLanguage = "hu") => {
    const t = createTranslator(locale);

    const server = () =>
        yup
            .mixed()
            .test(
                "is-admin",
                t("no-access"),
                function () {
                    const role = this.options.context?.role;
                    return role === "admin";
                }
            );

    return { server };
};

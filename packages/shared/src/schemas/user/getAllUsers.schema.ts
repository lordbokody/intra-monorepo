import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";

export const getAllUsersSchema = (locale: string = "hu") => {
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

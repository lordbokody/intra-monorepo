import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";

export const deleteUserSchema = (locale: string = "hu") => {
    const t = createTranslator(locale);

    const client = () =>
        yup.object({
            id: yup
                .number()
                .required(t("required"))
                .test(
                    "can-delete",
                    t("user-delete-not-allowed"),
                    function (value) {
                        const contextRole = this.options.context?.role;
                        const contextUserID = this.options.context?.id;

                        if (contextRole === "admin") return true;
                        return value === contextUserID;
                    }
                ),
        });

    const server = () =>
        yup
            .mixed()
            .required(t("user-not-found"))
            .test("user-exists", t("user-not-found"), (value) => value !== null);

    return { client, server };
};
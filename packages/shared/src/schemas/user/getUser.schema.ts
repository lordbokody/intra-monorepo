import * as yup from "yup";
import { createTranslator } from "../../utils/translator.util";

export const getUserSchema = (locale: string = "hu") => {
    const t = createTranslator(locale);

    const client = () =>
        yup.object({
            id: yup.number().required(t("required")),
        });

    const server = () =>
        yup
            .mixed()
            .required(t("user-not-found"))
            .test("user-exists", t("user-not-found"), (value) => value !== null);

    const auth = () =>
        yup
            .mixed()
            .test(
                "registration-status-verified",
                t("registration-not-complete"),
                function () {
                    const status = this.options.context?.registrationStatus;
                    return status === "registered";
                }
            )
            .test(
                "role-not-unverified",
                t("role-not-finalized"),
                function () {
                    const role = this.options.context?.role;
                    return role !== "unverified";
                }
            );

    return { client, server, auth };
};

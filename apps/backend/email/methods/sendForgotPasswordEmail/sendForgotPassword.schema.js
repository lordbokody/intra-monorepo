import * as yup from "yup";
export const sendForgotPasswordEmailSchema = yup.object({
    name: yup.string().required("Név megadása kötelező!"),
    email: yup.string().required("Email megadása kötelező!"),
    token: yup.string().required("Token megadása kötelező!"),
});
//# sourceMappingURL=sendForgotPassword.schema.js.map
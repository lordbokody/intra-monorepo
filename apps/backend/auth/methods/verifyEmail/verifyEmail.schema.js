import * as yup from "yup";
export const verifyEmailSchema = yup.object({
    token: yup.string().required("Token megadása kötelező!")
});
//# sourceMappingURL=verifyEmail.schema.js.map
import * as yup from "yup";
export const reVerifyEmailSchema = yup.object({
    email: yup.string().required("Email megadása kötelező!")
});
//# sourceMappingURL=reVerifyEmail.schema.js.map
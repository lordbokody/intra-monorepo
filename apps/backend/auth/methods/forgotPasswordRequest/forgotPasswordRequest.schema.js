import * as yup from "yup";
export const forgotPasswordRequestSchema = yup.object({
    email: yup.string().required("Email megadása kötelező!")
});
//# sourceMappingURL=forgotPasswordRequest.schema.js.map
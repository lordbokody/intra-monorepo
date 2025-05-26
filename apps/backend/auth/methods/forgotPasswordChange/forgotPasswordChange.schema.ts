import * as yup from "yup";

export const forgotPasswordChangeSchema = yup.object({
    password: yup.string().required("A jelszó megadása kötelező!"),
    token: yup.string().required("Token megadása kötelező!"),
})
import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().required("Az email megadása kötelező!"),
    password: yup.string().required("A jelszó megadása kötelező!")
});
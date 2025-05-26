import * as yup from "yup";
export const loginOAuthSchema = yup.object({
    email: yup.string().required("Az email megadása kötelező!"),
    name: yup.string().required("A név megadása kötelező!")
});
//# sourceMappingURL=loginOAuth.schema.js.map
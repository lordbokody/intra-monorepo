import * as yup from "yup";
export const findOneByEmailSchema = yup.object({
    email: yup.string().required("Az email megadása kötelező!"),
});
//# sourceMappingURL=findOneByEmail.schema.js.map
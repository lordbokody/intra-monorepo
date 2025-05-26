import * as yup from "yup";
export const getUserSchema = yup.object({
    id: yup.number().required("Az id megadása kötelező!"),
});
//# sourceMappingURL=getUser.schema.js.map
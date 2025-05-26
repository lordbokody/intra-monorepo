import * as yup from "yup";
export const deleteUserSchema = yup.object({
    id: yup.number().required("Az id megadása kötelező!"),
});
//# sourceMappingURL=deleteUser.schema.js.map
import * as yup from "yup";
import { validateBirthday, validateEmail, validateName, validatePassword } from "@intra/shared/utils/validators.util";
import UserService from "../../../users/user.service";
export const registerSchema = yup.object({
    name: yup
        .string()
        .required("A név megadása kötelező!")
        .test('custom-name-validation', 'A név minimum 3 és maximum 50 karakter hosszú lehet!', (value) => validateName(value)),
    email: yup
        .string()
        .required("Az email megadása kötelező!")
        .test('custom-email-validation', 'Érvénytelen email formátum!', (value) => validateEmail(value)).test('unique-email-check', 'Email cím foglalt!', async function (value) {
        if (!value)
            return true;
        const userByEmail = await UserService.findOneByEmail({ email: value });
        return !userByEmail?.success;
    }),
    password: yup
        .string()
        .required("A jelszó megadása kötelező!")
        .test('custom-password-validation', 'A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell nagy- és kisbetűt, számot és speciális karaktert!', (value) => validatePassword(value)),
    birthday: yup
        .string()
        .required("A születési dátum megadása kötelező!")
        .test('custom-birthday-validation', 'Csak 18 éven felüliek regisztrálhatnak, és a dátum formátuma YYYY-MM-DD kell legyen!', (value) => validateBirthday(value)),
});
//# sourceMappingURL=register.schema.js.map
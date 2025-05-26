import * as yup from "yup";
import {validateBirthday, validateEmail, validateName, validatePassword} from "@intra/shared/utils/validators.util";

export const updateUserSchema = yup.object({
    name: yup
        .string()
        .test(
            'custom-name-validation',
            'A név minimum 3 és maximum 50 karakter hosszú lehet!',
            (value) => {
                if (!value) return true;
                return validateName(value);
            }
        ),
    email: yup
        .string()
        .test(
            'custom-email-validation',
            'Érvénytelen email formátum!',
            (value) => {
                if (!value) return true;
                return validateEmail(value);
            }
        ),
    password: yup
        .string()
        .test(
            'custom-password-validation',
            'A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell nagy- és kisbetűt, számot és speciális karaktert!',
            (value) => {
                if (!value) return true;
                return validatePassword(value);
            }
        ),
    birthday: yup
        .string()
        .test(
            'custom-birthday-validation',
            'Csak 18 éven felüliek regisztrálhatnak, és a dátum formátuma YYYY-MM-DD kell legyen!',
            (value) => {
                if (!value) return true;
                return validateBirthday(value);
            }
        ),
});

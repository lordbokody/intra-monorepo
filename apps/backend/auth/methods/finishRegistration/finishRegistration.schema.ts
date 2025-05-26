import * as yup from "yup";
import {validateBirthday, validateName, validatePassword} from "@intra/shared/utils/validators.util";

export const finishRegistrationSchema = yup.object({
    name: yup
        .string()
        .required("A név megadása kötelező!")
        .test(
            'custom-name-validation',
            'A név minimum 3 és maximum 50 karakter hosszú lehet!',
            (value) => validateName(value)
        ),
    password: yup
        .string()
        .required("A jelszó megadása kötelező!")
        .test(
            'custom-password-validation',
            'A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell nagy- és kisbetűt, számot és speciális karaktert!',
            (value) => validatePassword(value)
        ),
    birthday: yup
        .string()
        .required("A születési dátum megadása kötelező!")
        .test(
            'custom-birthday-validation',
            'Csak 18 éven felüliek regisztrálhatnak, és a dátum formátuma YYYY-MM-DD kell legyen!',
            (value) => validateBirthday(value)
        ),
});
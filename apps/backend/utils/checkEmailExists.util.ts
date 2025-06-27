import {findOneByEmailMethod} from "../users/methods/findOneByEmail.method";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Segédfüggvény az email cím ellenőrzéséhez a yup validátorokban
 */
export const checkEmailExists = async (email: string) => {
    // Ha nincs email visszatérünk
    if (!email) return true;

    // Megkeressük a felhasználót az email alapján
    const userByEmail = await findOneByEmailMethod({email, locale: 'hu' as ApplicationLanguage});

    // Visszatérünk a válasszal
    return !userByEmail?.success;
}
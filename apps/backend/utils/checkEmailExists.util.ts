import {findOneByEmailMethod} from "../users/methods/findOneByEmail.method";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Segédfüggvény az email cím ellenőrzéséhez a yup validátorokban
 */
export const checkEmailExists = async (email: string) => {
    if (!email) return true;
    const userByEmail = await findOneByEmailMethod({email, locale: 'hu' as ApplicationLanguage});
    return !userByEmail?.success;
}
import * as yup from "yup";
import {createTranslator} from "../../utils/translator.util";

export const getUserSchema = (locale: string = 'hu') => {
    const t = createTranslator(locale);

    return yup.object({
        id: yup.number().required(t('required')),
    })
}
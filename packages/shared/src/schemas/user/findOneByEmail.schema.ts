import * as yup from "yup";
import {createTranslator} from "../../utils/translator.util";

export const findOneByEmailSchema = (locale: string = 'hu') => {
    const t = createTranslator(locale);

    return yup.object({
        email: yup.string().required(t('required')),
    })
}
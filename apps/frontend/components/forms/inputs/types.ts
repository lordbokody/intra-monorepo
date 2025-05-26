import {FieldHookConfig} from "formik";

export type TextInputLiveFeedbackProps = {
    label: string;
    error?: string;
    debounce?: boolean;
    preLoad?: boolean;
} & FieldHookConfig<string>;
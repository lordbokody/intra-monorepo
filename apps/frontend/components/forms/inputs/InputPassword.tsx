import React, {useState} from "react";
import {useField} from "formik";
import {Eye, EyeOff} from "lucide-react";
import type {TextInputLiveFeedbackProps} from "./types";
import {inputStyles} from "../../styles/inputStyles";
import {useTranslations} from "next-intl";

export const InputPassword: React.FC<TextInputLiveFeedbackProps> = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(true);
    const [showPassword, setShowPassword] = useState(false);
    const t = useTranslations('all');

    const showError = meta.error && (meta.touched || field.value !== '' || isFocused);

    return (
        <div className={inputStyles.outerDiv}>
            <label htmlFor={props.id} className={inputStyles.label}>
                {props.required ? `${label} *` : label }
            </label>
            <input
                {...props}
                {...field}
                id={props.id}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type={showPassword ? 'text' : 'password'}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                className={inputStyles.input(showError, props.disabled)}
            />
            <button
                type="button"
                className={inputStyles.showButton}
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? t('hidePassword') : t('showPassword')}
            >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            <p id={`${props.id}-feedback`} className={inputStyles.error(showError)} aria-live="polite">
                {showError ? meta.error : ''}
            </p>
        </div>
    );
};
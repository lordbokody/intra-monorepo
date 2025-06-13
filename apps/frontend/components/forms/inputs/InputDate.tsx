import React, {useState} from "react";
import {useField} from "formik";
import type {TextInputLiveFeedbackProps} from "./types";
import {inputStyles} from "../../styles/inputStyles";

export const InputDate: React.FC<TextInputLiveFeedbackProps> = ({label, ...props}) => {
    const [field, meta] = useField(props);

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(true);

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
                type={'date'}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                className={inputStyles.inputDate(showError, props.disabled)}
            />
            <p id={`${props.id}-feedback`} className={inputStyles.error(showError)} aria-live="polite">
                {showError ? meta.error : ''}
            </p>
        </div>
    );
};
import React, {useState} from "react";
import {useField} from "formik";
import type {TextInputLiveFeedbackProps} from "./types";
import {styles} from "./styles";

export const InputText: React.FC<TextInputLiveFeedbackProps> = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(true);

    const showError = meta.error && (meta.touched || field.value !== '' || isFocused);

    return (
        <div className={styles.outerDiv}>
            <label htmlFor={props.id} className={styles.label}>
                {props.required ? `${label} *` : label }
            </label>
            <input
                {...props}
                {...field}
                id={props.id}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                type={'text'}
                className={styles.input(showError, props.disabled)}
            />
            <p id={`${props.id}-feedback`} className={styles.error(showError)} aria-live="polite">
                {showError ? meta.error : ''}
            </p>
        </div>
    );
};
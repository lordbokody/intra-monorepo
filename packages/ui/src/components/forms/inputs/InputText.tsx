import React, { useState } from "react";
import { useField } from "formik";
import { InputProps } from "@intra/shared/types/common.types";
import { inputStyles } from "../../styles/inputStyles";

/**
 * Input szöveg komponens, amely opcionálisan Formik-kompatibilis (alapértelmezetten true)
 */
export const InputText: React.FC<InputProps> = ({ label, isFormik = true, ...props }) => {
    // Formik field és meta csak akkor használjuk, ha isFormik === true
    const [field, meta] = isFormik
        ? useField({ name: props.name })
        : [undefined, { error: undefined, touched: false }];

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const showError =
        meta?.error && (meta.touched || (field?.value ?? props.value ?? "") !== "" || isFocused);

    return (
        <div className={inputStyles.outerDiv}>
            <label htmlFor={props.id} className={inputStyles.label}>
                {props.required ? `${label} *` : label}
            </label>
            <input
                {...props}
                {...(isFormik ? field : {})}
                id={props.id}
                onFocus={handleFocus}
                onBlur={(e) => {
                    handleBlur();
                    props.onBlur?.(e);
                }}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                type={"text"}
                className={inputStyles.input(showError, props.disabled)}
            />
            <p
                id={`${props.id}-feedback`}
                className={inputStyles.error(showError)}
                aria-live="polite"
            >
                {showError ? meta?.error : ""}
            </p>
        </div>
    );
};

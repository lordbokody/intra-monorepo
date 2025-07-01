import React, { useState } from "react";
import { useField } from "formik";
import { InputProps } from "@intra/shared/types/common.types";
import { inputStyles } from "../../styles/inputStyles";

/**
 * Input select komponens, amely opcionálisan Formik-kompatibilis (alapértelmezetten true)
 */
export const InputSelect: React.FC<InputProps> = ({
                                                            label,
                                                            isFormik = true,
                                                            options,
                                                            ...props
                                                        }) => {
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
            {/* Label */}
            <label htmlFor={props.id} className={inputStyles.label}>
                {props.required ? `${label} *` : label}
            </label>

            {/* Select mező */}
            <select
                {...props}
                {...(isFormik ? field : {})}
                id={props.id}
                onFocus={handleFocus}
                onBlur={(e) => {
                    handleBlur();
                    props.onBlur?.(e);
                }}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                className={inputStyles.input(showError, props.disabled)}
            >
                {/* Default option */}
                <option value="">Válassz...</option>
                {options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Hibaüzenetek */}
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

import React, { useState } from "react";
import { useField } from "formik";
import { InputProps } from "@intra/shared/types/common.types";
import { inputStyles } from "../../styles/inputStyles";

/**
 * Input date komponens, amely opcionálisan Formik-kompatibilis
 */
export const InputDate: React.FC<InputProps> = ({ label, isFormik = true, ...props }) => {
    // Csak akkor használjuk a useField-et, ha isFormik true
    const [field, meta] = isFormik
        ? useField({ name: props.name })
        : [undefined, { error: undefined, touched: false }];

    // Változó a focused állapot tárolására
    const [isFocused, setIsFocused] = useState(false);

    // Segédfüggvények a focused és blur állapotok kezelésére
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    // Hiba megjelenítés feltétele
    const showError =
        meta?.error && (meta.touched || (field?.value ?? props.value ?? "") !== "" || isFocused);

    return (
        <div className={inputStyles.outerDiv}>
            {/* Label */}
            <label htmlFor={props.id} className={inputStyles.label}>
                {props.required ? `${label} *` : label}
            </label>

            {/* Input mező */}
            <input
                {...props}
                {...(isFormik ? field : {})}
                id={props.id}
                onFocus={handleFocus}
                onBlur={(e) => {
                    handleBlur();
                    props.onBlur?.(e);
                }}
                type={"date"}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                className={inputStyles.inputDate(showError, props.disabled)}
            />

            {/* Hibaüzenet */}
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

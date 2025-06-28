import React, {useState} from "react";
import {useField} from "formik";
import {InputProps} from "@intra/shared/types/common.types";
import {inputStyles} from "../../styles/inputStyles";

/**
 * Input date komponens
 */
export const InputDate: React.FC<InputProps> = ({label, ...props}) => {
    // Formik hook a checkbox state kezeléséhez
    const [field, meta] = useField(props);

    // Változó a focused állapot tárolására
    const [isFocused, setIsFocused] = useState(false);

    // Segédfüggvények a focused és blur állapotok kezelésére
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(true);

    // Beállítjuk, hogy látszódjon e a hibaüzenet
    const showError = meta.error && (meta.touched || field.value !== '' || isFocused);

    // Visszatérünk a komponenssel
    return (
        <div className={inputStyles.outerDiv}>
            {/*Label*/}
            <label htmlFor={props.id} className={inputStyles.label}>
                {props.required ? `${label} *` : label }
            </label>

            {/*Input mező*/}
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

            {/*Hibaüzenet*/}
            <p id={`${props.id}-feedback`} className={inputStyles.error(showError)} aria-live="polite">
                {showError ? meta.error : ''}
            </p>
        </div>
    );
};
"use client"

import React, {useState} from "react";
import {useField} from "formik";
import {Eye, EyeOff} from "lucide-react";
import {InputProps} from "@intra/shared/types/common.types";
import {inputStyles} from "../../styles/inputStyles";
import {useTranslations} from "next-intl";

/**
 * Input jelszó komponens
 */
export const InputPassword: React.FC<InputProps> = ({ label, ...props }) => {
    // Formik hook a checkbox state kezeléséhez
    const [field, meta] = useField(props);

    // Változó a focused állapot tárolására
    const [isFocused, setIsFocused] = useState(false);

    // Segédfüggvények a focused és blur állapotok kezelésére
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(true);

    // A jelszó láthatóságát tároló változó
    const [showPassword, setShowPassword] = useState(false);

    // Betöltjük a fordításokat
    const t = useTranslations('all');

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
                type={showPassword ? 'text' : 'password'}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                className={inputStyles.input(showError, props.disabled)}
            />

            {/*A jelszó láthatóságát állító gomb*/}
            <button
                type="button"
                className={inputStyles.showButton}
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? t('hidePassword') : t('showPassword')}
            >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>

            {/*Hibaüzenetek*/}
            <p id={`${props.id}-feedback`} className={inputStyles.error(showError)} aria-live="polite">
                {showError ? meta.error : ''}
            </p>
        </div>
    );
};
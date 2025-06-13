import React, {useEffect, useState} from "react";
import {useField, useFormikContext} from "formik";
import {useDebounce} from "../../../utils/useDebounce";
import {LoaderCircle} from "lucide-react";
import type {TextInputLiveFeedbackProps} from "./types";
import {inputStyles} from "../../styles/inputStyles";

export const InputEmail: React.FC<TextInputLiveFeedbackProps> = ({ label, debounce = false, preLoad = false, ...props }) => {
    const [field, meta] = useField(props);
    const [localValue, setLocalValue] = useState<string>(field.value);
    const { setFieldValue } = useFormikContext();
    const [isFocused, setIsFocused] = useState(false);
    const [isLoadingIcon, setIsLoadingIcon] = useState(false);

    const debouncedEmailChange = useDebounce((value: string) => {
        setIsLoadingIcon(false);
        return setFieldValue(props.name as string, value, true);
    }, 3000);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalValue(value)

        if (debounce) {
            setIsLoadingIcon(true);
            debouncedEmailChange(value);
        } else {
            return setFieldValue(props.name as string, value, true);
        }
    };

    useEffect(() => {
        if(preLoad){
            setLocalValue(field.value);
        }
    }, [field.value]);

    /*useEffect(() => {
        return () => {
            debouncedEmailChange.cancel?.();
        };
    }, [debouncedEmailChange]);*/

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(true);

    const showError = meta.error && (meta.touched || isFocused || field.value !== '');

    return (
        <div className={inputStyles.outerDiv}>
            <label htmlFor={props.id} className={inputStyles.label}>
                {props.required ? `${label} *` : label}
            </label>
            <input
                {...props}
                id={props.id}
                type="email"
                value={localValue} // Use Formik's value directly
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                className={inputStyles.input(showError, props.disabled)}
                autoComplete="off"
            />
            <LoaderCircle size={18} className={inputStyles.loading(isLoadingIcon)} />
            <p id={`${props.id}-feedback`} className={inputStyles.error(showError)} aria-live="polite">
                {showError ? meta.error : ''}
            </p>
        </div>
    );
};
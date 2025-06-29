import React, {useEffect, useState} from "react";
import {useField, useFormikContext} from "formik";
import {useDebounce} from "frontend/utils/useDebounce";
import {LoaderCircle} from "lucide-react";
import {InputProps} from "@intra/shared/types/common.types";
import {inputStyles} from "../../styles/inputStyles";

/**
 * Input email komponens
 */
export const InputEmail: React.FC<InputProps> = ({ label, debounce = false, preLoad = false, ...props }) => {
    // Formik hook a checkbox state kezeléséhez
    const [field, meta] = useField(props);

    // A lokális mező érték tárolására szolgáló változó
    // Ez azért fontos, mivel az email debounce működés esetén nem szabad egyből
    // kiküldenünk a külső formik formba a mező értékét, csak azután, hogy az api
    // lefutott és validálta, hogy az email cím helyes
    const [localValue, setLocalValue] = useState<string>(field.value);

    // Külső formik form mező értékének állítása
    const { setFieldValue } = useFormikContext();

    // Változó a focused állapot tárolására
    const [isFocused, setIsFocused] = useState(false);

    // Változó a loading icon mutatására
    const [isLoadingIcon, setIsLoadingIcon] = useState(false);

    // Debounce függvény
    const debouncedEmailChange = useDebounce((value: string) => {
        // Eltűntetjük a töltő ikont
        setIsLoadingIcon(false);

        // Visszatérünk az új értékkel a formiknak
        return setFieldValue(props.name as string, value, true);
    }, 3000);

    // Segédfüggvény a mező értékének változásakor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Lekérjük az input mező értékét
        const value = e.target.value;

        // Beállítjuk, hogy csak lokálisan
        setLocalValue(value)

        if (debounce) {
            // Ha a komponensben külsőleg szettelve van a debounce futás, akkor aszerint futtatjuk

            // Beállítjuk a töltő ikont
            setIsLoadingIcon(true);

            // Futtatjuk a debounce függvényt
            debouncedEmailChange(value);
        } else {
            // Ha a komponensben külsőleg nincs szettelve a debounce futás, akkor aszerint futtatjuk

            // Visszatérünk az új értékkel a formiknak
            return setFieldValue(props.name as string, value, true);
        }
    };

    // Az input értékének változását figyelő függvény
    useEffect(() => {
        if(preLoad){
            setLocalValue(field.value);
        }
    }, [field.value]);

    // Segédfüggvények a focused és blur állapotok kezelésére
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(true);

    // Beállítjuk, hogy látszódjon e a hibaüzenet
    const showError = meta.error && (meta.touched || isFocused || field.value !== '');

    // Visszatérünk a komponenssel
    return (
        <div className={inputStyles.outerDiv}>
            {/*Label*/}
            <label htmlFor={props.id} className={inputStyles.label}>
                {props.required ? `${label} *` : label}
            </label>

            {/*Input mező*/}
            <input
                {...props}
                id={props.id}
                type="email"
                value={localValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                className={inputStyles.input(showError, props.disabled)}
                autoComplete="off"
            />

            {/*Töltő ikon*/}
            <LoaderCircle size={18} className={inputStyles.loading(isLoadingIcon)} />

            {/*Hibaüzenetek*/}
            <p id={`${props.id}-feedback`} className={inputStyles.error(showError)} aria-live="polite">
                {showError ? meta.error : ''}
            </p>
        </div>
    );
};
import React from "react";
import {useField} from "formik";
import {InputProps} from "@intra/shared/types/common.types";
import {inputStyles} from "../../styles/inputStyles";

/**
 * Input checkbox komponens
 */
export const InputCheckbox: React.FC<InputProps> = ({ label, ...props }) => {
    // Formik hook a checkbox state kezeléséhez
    const [field] = useField({ ...props, type: 'checkbox' });

    // Visszatérünk a komponenssel
    return (
        <div className={inputStyles.outerDiv}>
            <div className={inputStyles.innerDiv}>
                {/*Input mező*/}
                <input
                    {...props}
                    {...field}
                    id={props.id}
                    type="checkbox"
                    checked={field.value}
                    aria-describedby={`${props.id}-feedback ${props.id}-help`}
                    className={inputStyles.inputCheckbox}
                />

                {/*Label*/}
                <label htmlFor={props.id} className={inputStyles.labelCheckbox}>
                    {props.required ? `${label} *` : label }
                </label>
            </div>
        </div>
    );
};
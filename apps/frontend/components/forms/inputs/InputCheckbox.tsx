import React from "react";
import {useField} from "formik";
import type {TextInputLiveFeedbackProps} from "./types";
import {inputStyles} from "../../styles/inputStyles";

export const InputCheckbox: React.FC<TextInputLiveFeedbackProps> = ({ label, ...props }) => {
    const [field] = useField({ ...props, type: 'checkbox' });

    return (
        <div className={inputStyles.outerDiv}>
            <div className={inputStyles.innerDiv}>
                <input
                    {...props}
                    {...field}
                    id={props.id}
                    type="checkbox"
                    checked={field.value}
                    aria-describedby={`${props.id}-feedback ${props.id}-help`}
                    className={inputStyles.inputCheckbox}
                />
                <label htmlFor={props.id} className={inputStyles.labelCheckbox}>
                    {props.required ? `${label} *` : label }
                </label>
            </div>
        </div>
    );
};
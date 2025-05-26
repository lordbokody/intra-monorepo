import React from "react";
import {useField} from "formik";
import type {TextInputLiveFeedbackProps} from "./types";
import {styles} from "./styles";

export const InputCheckbox: React.FC<TextInputLiveFeedbackProps> = ({ label, ...props }) => {
    const [field] = useField({ ...props, type: 'checkbox' });

    return (
        <div className={styles.outerDiv}>
            <div className={styles.innerDiv}>
                <input
                    {...props}
                    {...field}
                    id={props.id}
                    type="checkbox"
                    checked={field.value}
                    aria-describedby={`${props.id}-feedback ${props.id}-help`}
                    className={styles.inputCheckbox}
                />
                <label htmlFor={props.id} className={styles.labelCheckbox}>
                    {props.required ? `${label} *` : label }
                </label>
            </div>
        </div>
    );
};
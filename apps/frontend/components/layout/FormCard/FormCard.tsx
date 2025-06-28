import React from "react";
import {formCardStyles} from "../../styles/formCardStyles";

/**
 * Form card bemeneti paraméterek
 */
export interface FormCardProps {
    children: React.ReactNode;
}

/**
 * Form card komponens
 */
export const FormCard: React.FC<FormCardProps> = ({ children }) => {
    return (
        <div className={formCardStyles.outer}>
            <div className={formCardStyles.inner}>
                {children}
            </div>
        </div>
    );
};

import React from "react";
import {getOuterDivClassNames, getInnerDivClassNames} from "./styles";
import type {LayoutFormProps} from "./types";

export const LayoutForm: React.FC<LayoutFormProps> = ({ children }) => {
    return (
        <div className={getOuterDivClassNames()}>
            <div className={getInnerDivClassNames()}>
                {children}
            </div>
        </div>
    );
};

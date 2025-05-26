import React from "react";
import {getButtonClassNames, getButtonChildren} from "./styles";
import {ButtonSubmitProps} from "./types";

export const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ state, children, ...props }) => {
    const isDisabled = state !== 'enabled';

    return (
        <button
            type="submit"
            className={getButtonClassNames(state)}
            disabled={isDisabled}
            {...props}
        >
            {getButtonChildren(state, children)}
        </button>
    );
};
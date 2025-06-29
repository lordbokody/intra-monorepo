import React from "react";
import {buttonStyles} from "../../styles/buttonStyles";
import {ButtonSubmitProps} from "@intra/shared/types/common.types";

/**
 * Submit gomb komponens, amit formokban használunk
 */
export const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ state, children, ...props }) => {
    // Beállítjuk, hogy tiltva van e a gomb
    const isDisabled = state !== 'enabled';

    // Visszatérünk a komponenssel
    return (
        <button
            type="submit"
            className={buttonStyles.state(state)}
            disabled={isDisabled}
            {...props}
        >
            {buttonStyles.children(state, children)}
        </button>
    );
};
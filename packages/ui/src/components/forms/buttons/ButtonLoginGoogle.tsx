"use client"

import {buttonStyles} from "../../styles/buttonStyles";
import React from "react";
import {useTranslations} from "next-intl";
import {ButtonSubmitProps} from "@intra/shared/types/common.types";

/**
 * Google oAuth gomb komponens, amit formokban használunk
 */
export const ButtonLoginGoogle: React.FC<ButtonSubmitProps> = ({ state, ...props }) => {
    // Beállítjuk, hogy tiltva van e a gomb
    const isDisabled = state !== 'enabled';

    // Betöltjük a fordításokat
    const t = useTranslations("all");

    // Visszatérünk a komponenssel
    return (
        <button
            className={buttonStyles.oauth}
            disabled={isDisabled}
            {...props}
        >
            {!isDisabled && (<svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 533.5 544.3"
                className={buttonStyles.svg}
            >
                <path d="M533.5 278.4c0-17.3-1.4-34.5-4.3-51.2H272v96.9h147.4c-6.4 34-25.5 62.7-54.5 82v67h87.8c51.3-47.2 80.8-116.6 80.8-194.7zM272 544.3c73.6 0 135.5-24.4 180.6-66.2l-87.8-67c-24.4 16.4-55.6 25.9-92.8 25.9-71.4 0-132-48.1-153.7-112.9H28.6v70.8c45.5 89.8 137.2 149.4 243.4 149.4zM118.3 323.9c-10.4-30.7-10.4-63.5 0-94.2v-70.8H28.6c-41.2 81.8-41.2 177.9 0 259.7l89.7-70.7zM272 107.7c39.9 0 75.8 13.8 104.2 40.7l78.1-78.1C408.4 24.4 346.5 0 272 0 165.8 0 74.1 59.6 28.6 149.4l89.7 70.8c21.7-64.8 82.3-112.9 153.7-112.9z" />
            </svg>)}

            {buttonStyles.children(state, t("googleLogin"))}
        </button>
    )
}

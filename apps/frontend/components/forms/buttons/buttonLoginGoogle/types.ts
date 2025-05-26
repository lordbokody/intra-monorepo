import React from "react";
import {ButtonStateType} from "../../../../utils/getButtonState";

export interface ButtonLoginGoogleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    state: ButtonStateType,
}
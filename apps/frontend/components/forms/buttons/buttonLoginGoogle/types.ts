import React from "react";
import {ButtonStateType} from "@intra/ui/dist/utils/getButtonState";

export interface ButtonLoginGoogleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    state: ButtonStateType,
}
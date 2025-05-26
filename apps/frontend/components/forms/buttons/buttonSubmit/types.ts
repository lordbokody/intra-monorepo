import React from "react";
import {ButtonStateType} from "../../../../utils/getButtonState";

export interface ButtonSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    state: ButtonStateType,
    children: React.ReactNode;
}
import React from "react";
import {ButtonStateType} from "@intra/ui/dist/utils/getButtonState";
import {Check, LoaderCircle, X} from "lucide-react";

export const getButtonClassNames = (state: ButtonStateType) => {
    const baseClassNames = 'relative text-white py-2 rounded-lg transition h-[40px] w-full mt-[10px]';

    switch (state) {
        case "disabled":
            return `${baseClassNames} bg-blue-600 disabled:opacity-50 cursor-not-allowed`
        case "enabled":
            return `${baseClassNames} bg-blue-600 hover:bg-blue-700 cursor-pointer`
        case "submitting":
            return `${baseClassNames} bg-blue-600 cursor-not-allowed`
        case "success":
            return `${baseClassNames} bg-green-600 cursor-not-allowed`
        case "forwarding":
            return `${baseClassNames} bg-green-600 cursor-not-allowed`
        case "error":
            return `${baseClassNames} bg-red-600 cursor-not-allowed`
    }
}

export const getSpanClassNames = () => {
    return "absolute inset-0 m-auto w-fit h-fit"
}

export const getButtonChildren = (state: ButtonStateType, children: React.ReactNode | string) => {
    switch (state) {
        case "disabled":
            return (
                <span>{children}</span>
            )
        case "enabled":
            return (
                <span>{children}</span>
            )
        case "submitting":
            return (
                <span className={getSpanClassNames()}>
                    <LoaderCircle className="animate-spin" size={18} />
                </span>
            )
        case "success":
            return (
                <span className={getSpanClassNames()}>
                    <Check size={18} />
                </span>
            )
        case "forwarding":
            return (
                <span className={getSpanClassNames()}>
                    <LoaderCircle className="animate-spin" size={18} />
                </span>
            )
        case "error":
            return (
                <span className={getSpanClassNames()}>
                    <X size={18} />
                </span>
            )
    }
}
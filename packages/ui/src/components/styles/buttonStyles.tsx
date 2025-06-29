import {ButtonStateType} from "@intra/shared/types/common.types";
import React from "react";
import {Check, LoaderCircle, X} from "lucide-react";

/**
 * Gombokhoz tartozó stílusok
 */
export const buttonStyles = {
    base: 'relative text-white py-2 rounded-lg transition h-[40px] w-full mt-[10px]',
    state(state: ButtonStateType){
        switch (state) {
            case "disabled":
                return `${this.base} bg-blue-600 disabled:opacity-50 cursor-not-allowed`
            case "enabled":
                return `${this.base} bg-blue-600 hover:bg-blue-700 cursor-pointer`
            case "submitting":
                return `${this.base} bg-blue-600 cursor-not-allowed`
            case "success":
                return `${this.base} bg-green-600 cursor-not-allowed`
            case "forwarding":
                return `${this.base} bg-green-600 cursor-not-allowed`
            case "error":
                return `${this.base} bg-red-600 cursor-not-allowed`
        }
    },
    span: "absolute inset-0 m-auto w-fit h-fit",
    children(state: ButtonStateType, children: React.ReactNode | string){
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
                    <span className={this.span}>
                    <LoaderCircle className="animate-spin" size={18} />
                </span>
                )
            case "success":
                return (
                    <span className={this.span}>
                    <Check size={18} />
                </span>
                )
            case "forwarding":
                return (
                    <span className={this.span}>
                    <LoaderCircle className="animate-spin" size={18} />
                </span>
                )
            case "error":
                return (
                    <span className={this.span}>
                    <X size={18} />
                </span>
                )
        }
    },
    oauth: 'flex items-center justify-center gap-2 relative text-white py-2 rounded-lg transition h-[40px] bg-[#D44C40] hover:bg-[#ba3e34] cursor-pointer',
    svg: 'w-5 h-5 fill-white'
}
import type {VerifyEmailStatus} from "./types";
import {Check, LoaderCircle, X} from "lucide-react";

export const styles = {
    card(status: VerifyEmailStatus) {
        const baseClassNames = 'max-w-md mx-auto mt-10 p-6 border text-white rounded-2xl shadow-lg flex items-center space-x-4 transition-all duration-300';

        switch (status) {
            case 'loading':
                return `${baseClassNames} bg-blue-100 border-blue-300 text-blue-800`;
            case 'success':
                return `${baseClassNames} bg-green-100 border-green-300 text-green-800`;
            case 'confirmed':
                return `${baseClassNames} bg-green-100 border-green-300 text-green-800`;
            case 'error':
                return `${baseClassNames} bg-red-100 border-red-300 text-red-800`;
        }
    },
    icon(status: VerifyEmailStatus) {
        switch (status) {
            case "loading":
                return ( <LoaderCircle className="w-6 h-6 text-blue-600 animate-spin" /> )
            case 'success':
                return ( <Check className="w-6 h-6 text-green-600" /> )
            case 'confirmed':
                return ( <Check className="w-6 h-6 text-green-600" /> )
            case 'error':
                return ( <X className="w-6 h-6 text-red-600" /> )
        }
    },
    label(status: VerifyEmailStatus) {
        const baseClassNames = 'text-lg font-semibold';

        switch (status) {
            case 'loading':
                return `${baseClassNames} text-blue-800`;
            case 'success':
                return `${baseClassNames} text-green-800`;
            case 'confirmed':
                return `${baseClassNames} text-green-800`;
            case 'error':
                return `${baseClassNames} text-red-800`;
        }
    }
}
import {ButtonStateType} from "@intra/shared/types/common.types";

/**
 * Segédfüggvény a gomb komponensek state állapotainak lekérésére
 */
export const getButtonState = (isValid: boolean, dirty: boolean, isSubmitting: boolean, isSuccess: boolean, isForwarding: boolean, isError: boolean): ButtonStateType => {
    if(isError){
        return 'error'
    }
    if(isForwarding){
        return 'forwarding'
    }
    if(isSuccess){
        return 'success'
    }
    if(isSubmitting){
        return "submitting"
    }
    if(!dirty){
        return 'disabled'
    }
    if(!isValid){
        return 'disabled'
    }

    return "enabled"
}
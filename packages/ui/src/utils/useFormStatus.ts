"use client"

import { useState, useCallback, useEffect } from "react";
import { sleep } from "@intra/shared/utils/sleep.util";
import { getButtonState } from "./getButtonState";
import type { ButtonStateType } from "@intra/shared/types/common.types";

// Default wait times (can be customized)
const SLEEP_TIME_ERROR = 3000;
const SLEEP_TIME_SUCCESS = 1000;

/**
 * Combined hook for managing success/error/forwarding UI states and buttonState in forms
 */
export const useFormStatus = ({
                                  isValid,
                                  isDirty,
                                  isSubmitting,
                              }: {
    isValid: boolean;
    isDirty: boolean;
    isSubmitting: boolean;
}) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [isForwarding, setIsForwarding] = useState(false);
    const [buttonState, setButtonState] = useState<ButtonStateType>("disabled");

    /**
     * Handles error state management with automatic reset
     */
    const handleError = useCallback(
        async (errorMessage: string | null, customFunction?: () => void) => {
            setIsError(true);
            setErrorText(errorMessage || null);

            if (customFunction) {
                customFunction();
            }

            await sleep(SLEEP_TIME_ERROR);
            setIsError(false);
        },
        []
    );

    /**
     * Handles success state management with forwarding trigger
     */
    const handleSuccess = useCallback(
        async (customFunction?: () => void) => {
            setIsSuccess(true);
            await sleep(SLEEP_TIME_SUCCESS);
            setIsForwarding(true);

            if (customFunction) {
                customFunction();
            }
        },
        []
    );

    /**
     * Optionally reset all status states
     */
    const resetStatus = useCallback(() => {
        setIsSuccess(false);
        setIsError(false);
        setErrorText(null);
        setIsForwarding(false);
    }, []);

    /**
     * Automatically manage buttonState based on form and status states
     */
    useEffect(() => {
        const state = getButtonState(
            isValid,
            isDirty,
            isSubmitting,
            isSuccess,
            isForwarding,
            isError
        );
        setButtonState(state);
    }, [isValid, isDirty, isSubmitting, isSuccess, isForwarding, isError]);

    return {
        isSuccess,
        isError,
        errorText,
        isForwarding,
        buttonState,
        handleError,
        handleSuccess,
        resetStatus,
    };
};

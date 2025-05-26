import {useEffect, useMemo, useRef} from "react";
import {debounce} from "lodash";

export const useDebounce = (callback: (...args: any[]) => void, delay: number = 3000) => {
    const ref = useRef<(...args: any[]) => void>(callback);

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
        const func = (...args: any[]) => {
            ref.current?.(...args);
        };

        return debounce(func, delay);
    }, [delay]);

    return debouncedCallback;
};
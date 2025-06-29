import {useEffect, useMemo, useRef} from "react";
import {debounce} from "lodash";

/**
 * A lodash debounce kibővítése Next.js-re
 * Valamilyen belső Next.js működés miatt a lodash debounce nem jól működik, ezért ebben a formában lehet csak használni
 * Fogalmam sincs mi történik benne, de működik, egy stackoverflow kommentből bugáztam ki hosszú kutatás után
 * Ha nem muszáj semmiképp se módosítsd!!!
 */
export const useDebounce = (callback: (...args: any[]) => void, delay: number = 3000) => {
    const ref = useRef<(...args: any[]) => void>(callback);

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    return useMemo(() => {
        const func = (...args: any[]) => {
            ref.current?.(...args);
        };

        return debounce(func, delay);
    }, [delay]);
};
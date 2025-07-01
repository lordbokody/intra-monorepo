import React from "react";
import {FieldHookConfig} from "formik";

/**
 * Mindenhol használt typeok
 */

export type ApplicationLanguage = 'hu' | 'en'

export type RegistrationStatus = 'emailNotConfirmed' | 'partialRegistration' | 'registered';

export type Role = 'unverified' | 'student' | 'admin';

/**
 * Backend typeok
 */

export interface Paginated {
    /** Total number of results */
    count: number;
    /** Number of results per page */
    pageSize: number;
    /** Total number of pages */
    totalPages: number;
    /** Current page number */
    current: number;
}

export type PaginatedParams = {
    size: number;
    page: number;
    count: number;
};

/**
 * Frontend typeok
 */

export type PageStatus = 'loading' | 'default' | 'missingToken' | 'invalid' | 'valid' | 'succeeded';

export type ButtonStateType = 'disabled' | 'enabled' | 'submitting' | 'success' |  'forwarding' | 'error'

export interface ButtonSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    state: ButtonStateType,
    children?: React.ReactNode;
}

export type InputProps = {
    label: string;
    error?: string;
    debounce?: boolean;
    preLoad?: boolean;
    options?: { label: string; value: string }[]
} & FieldHookConfig<string>;
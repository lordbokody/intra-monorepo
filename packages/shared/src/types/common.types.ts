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

export type ApplicationLanguage = 'hu' | 'en'

export type PageStatus = 'loading' | 'missingToken' | 'invalid' | 'valid' | 'succeeded';
import {Paginated, PaginatedParams} from "../types/common.types";

export const getOffset = (page: number, size: number): number => {
    return size * (page - 1);
};

export const paginatedData = (params: PaginatedParams): Paginated => {
    const response = {
        current: params.page,
        pageSize: params.size,
        totalPages: Math.ceil(params.count / params.size),
        count: params.count,
    };
    return response;
};
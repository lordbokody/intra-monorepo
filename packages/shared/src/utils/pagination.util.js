export const getOffset = (page, size) => {
    return size * (page - 1);
};
export const paginatedData = (params) => {
    const response = {
        current: params.page,
        pageSize: params.size,
        totalPages: Math.ceil(params.count / params.size),
        count: params.count,
    };
    return response;
};
//# sourceMappingURL=pagination.util.js.map
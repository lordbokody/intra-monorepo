import React from "react";
import { User } from "@intra/shared/types/user.types";
import { FilterConfig } from "./Table";

interface TableBodyProps {
    filteredData: User[];
    currentPage: number;
    rowsPerPage: number;
    filters: FilterConfig[];
}

export const TableBody: React.FC<TableBodyProps> = ({ filteredData, currentPage, rowsPerPage, filters }) => {

    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <tbody className="divide-y divide-gray-200">
        {paginatedData.map((user, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
                {filters.map((filter) => {
                    const value = user[filter.field];
                    return (
                        <td
                            key={filter.field}
                            className="px-4 py-2 text-sm text-gray-800"
                        >
                            {value ? String(value) : ""}
                        </td>
                    );
                })}
            </tr>
        ))}
        </tbody>
    );
};

import React from "react";
import {FilterConfig} from "./Table";

interface TableHeaderProps {
    filters: FilterConfig[];
}

export const TableHeader: React.FC<TableHeaderProps> = ({ filters }) => {
    return (
        <tr className="bg-gray-100">
            {filters.map((filter) => (
                <th
                    key={filter.field}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
                >
                    {filter.label}
                </th>
            ))}
        </tr>
    )
}
import { InputText } from "../forms/inputs/InputText";
import { InputDate } from "../forms/inputs/InputDate";
import { InputSelect } from "../forms/inputs/InputSelect";
import React from "react";
import { FilterConfig } from "./Table";
import {TableFilterFunnel} from "./TableFilterFunnel";

interface TableFiltersProps {
    filters: FilterConfig[];
    handleFilterChange: (field: string, value: string) => void;
    filterValues: Record<string, string>;
}

export const TableFilters: React.FC<TableFiltersProps> = ({ filters, handleFilterChange, filterValues }) => {
    return (
        <tr>
            {filters.map((filter) => (
                <th key={filter.field} className="px-2 py-2">
                    <div className="flex items-center gap-2">
                        {filter.type === "string" && (
                            <InputText
                                id={`filter-${filter.field}`}
                                name={filter.field}
                                placeholder={`Filter ${filter.label}`}
                                onChange={(e: any) =>
                                    handleFilterChange(filter.field, e.target.value)
                                }
                                value={filterValues[filter.field as string] || ""}
                                isFormik={false}
                            />
                        )}

                        {filter.type === "date" && (
                            <InputDate
                                id={`filter-${filter.field}`}
                                name={filter.field}
                                onChange={(e: any) =>
                                    handleFilterChange(filter.field, e.target.value)
                                }
                                value={filterValues[filter.field as string] || ""}
                                isFormik={false}
                            />
                        )}

                        {filter.type === "select" && filter.options && (
                            <InputSelect
                                id={`filter-${filter.field}`}
                                name={filter.field}
                                onChange={(e: any) =>
                                    handleFilterChange(filter.field, e.target.value)
                                }
                                value={filterValues[filter.field as string] || ""}
                                options={filter.options}
                                isFormik={false}
                            />
                        )}

                        <TableFilterFunnel filterType={filter.type}/>
                    </div>
                </th>
            ))}
        </tr>
    );
};

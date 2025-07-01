



"use client";

import React, { useState, useTransition, useEffect } from "react";
import { User } from "@intra/shared/types/user.types";
import {useDebounce} from "../../utils/useDebounce";
import { Loader } from "lucide-react";
import {TableFilters} from "./TableFilters";
import {TableBody} from "./TableBody";
import {TablePagination} from "./TablePagination";
import {TableHeader} from "./TableHeader";

export interface FilterConfig {
    field: keyof User;
    label: string;
    type: "string" | "date" | "select";
    options?: { label: string; value: string }[];
}

interface TableProps {
    data: User[];
    filters: FilterConfig[];
}

export const Table: React.FC<TableProps> = ({ data, filters }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValues, setFilterValues] = useState<Record<string, string>>({});
    const [filteredData, setFilteredData] = useState<User[]>(data);
    const [isPending, startTransition] = useTransition();

    const rowsPerPage = 10;

    // Debounce callback: szűrés logika
    const debouncedFilter = useDebounce(() => {
        startTransition(() => {
            const newFiltered = data.filter((item) =>
                filters.every((filter) => {
                    const value = filterValues[filter.field as string];
                    if (!value) return true;

                    const itemValue = item[filter.field];
                    if (!itemValue) return false;

                    if (filter.type === "string") {
                        return String(itemValue).toLowerCase().includes(value.toLowerCase());
                    } else if (filter.type === "date" || filter.type === "select") {
                        return String(itemValue) === value;
                    }
                    return true;
                })
            );
            setFilteredData(newFiltered);
            setCurrentPage(1);
        });
    }, 500);

    // Figyeli a filter mezők változását, de debounce-olva hívja meg a szűrést
    useEffect(() => {
        debouncedFilter();
    }, [filterValues, debouncedFilter]);

    const handleFilterChange = (field: string, value: string) => {
        setFilterValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="flex flex-col gap-4 relative">
            {isPending && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur flex items-center justify-center z-50">
                    <Loader className="h-8 w-8 animate-spin text-gray-600" />
                </div>
            )}

            <div className="overflow-x-auto rounded border border-gray-300">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        {/* Filter mezők */}
                        <TableFilters
                            filters={filters}
                            handleFilterChange={handleFilterChange}
                            filterValues={filterValues}
                        />

                        {/* Header */}
                        <TableHeader filters={filters} />
                    </thead>

                    <TableBody
                        filteredData={filteredData}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                        filters={filters}
                    />

                </table>
            </div>

            <TablePagination
                filteredData={filteredData}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                setCurrentPage={setCurrentPage}
            />

        </div>
    );
};
import React from "react";
import {User} from "@intra/shared/types/user.types";

interface TablePaginationProps {
    filteredData: User[];
    currentPage: number;
    rowsPerPage: number;
    setCurrentPage: (page: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({ filteredData, currentPage, rowsPerPage, setCurrentPage }) => {
    const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));

    const handlePrev = () => {
        setCurrentPage(Math.max(currentPage - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage(Math.min(currentPage + 1, totalPages));
    };

    return (
        <div className="flex items-center justify-between px-2">
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Previous
            </button>
            <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    )
}
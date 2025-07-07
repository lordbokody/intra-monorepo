import { Funnel } from "lucide-react";
import React, { useState } from "react";

interface TableFilterFunnelProps {
    filterType: "string" | "date" | "select" | "boolean";
    selectedOption?: string;
    onOptionChange?: (value: string) => void;
}

const FILTER_OPTIONS: Record<string, { label: string; value: string }[]> = {
    string: [
        { label: "Contains", value: "contains" },
        { label: "Equals", value: "equals" },
    ],
    date: [
        { label: "Equals", value: "equals" },
        { label: "Before", value: "lt" },
        { label: "On or Before", value: "lte" },
        { label: "After", value: "gt" },
        { label: "On or After", value: "gte" },
    ],
    select: [
        { label: "Equals", value: "equals" },
    ],
    boolean: [
        { label: "Is True", value: "isTrue" },
        { label: "Is False", value: "isFalse" },
    ],
};

export const TableFilterFunnel: React.FC<TableFilterFunnelProps> = ({ filterType, selectedOption, onOptionChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <Funnel
                className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setOpen(!open)}
            />
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                    <div className="p-2">
                        {FILTER_OPTIONS[filterType].map((option) => (
                            <label
                                key={option.value}
                                htmlFor={`${filterType}-${option.value}`}
                                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
                            >
                                <input
                                    type="radio"
                                    id={`${filterType}-${option.value}`}
                                    name={`${filterType}-filter`}
                                    value={option.value}
                                    checked={selectedOption === option.value}
                                    onChange={() => {
                                        onOptionChange(option.value);
                                        setOpen(false);
                                    }}
                                    className="form-radio text-blue-600"
                                />
                                <span className="text-sm">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
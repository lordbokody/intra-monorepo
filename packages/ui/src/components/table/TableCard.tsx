import React from "react";
import {tableCardStyles} from "../styles/tableCardStyles";

/**
 * Table card bemeneti paraméterek
 */
export interface TableCardProps {
    children: React.ReactNode;
}

/**
 * Table card komponens
 */
export const TableCard: React.FC<TableCardProps> = ({ children }) => {
    return (
        <div className={tableCardStyles.outer}>
            {/*<div className={tableCardStyles.inner}>*/}
                {children}
            {/*</div>*/}
        </div>
    );
};

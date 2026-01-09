import {type FC} from 'react';
import type {Cell} from "../models/Cell.ts";

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    return (
        <div
            className={`cell ${cell.color} ${selected ? 'selected' : ''} ${cell.available && cell.figure ? 'can-be-attacked' : ''}`}
            onClick={() => click(cell)}
        >
            {cell.available && !cell.figure && <div className={"available"}/>}
            {cell.figure?.logo && <img src={cell.figure.logo}/>}
        </div>
    );
};

export default CellComponent;
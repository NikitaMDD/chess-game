import React, {type FC} from 'react';
import type {Board} from "../models/Board.ts";
import CellComponent from "./CellComponent.tsx";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
    return (
        <div className="board">
            {board.cells.map((row, index) => (

                // console.log(cell);

                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponent
                            cell={cell}
                            key={cell.id}
                        />
                    )}
                </React.Fragment>

            ))}
        </div>
    );
};

export default BoardComponent;
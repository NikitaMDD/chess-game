import React, {type FC, useEffect, useState} from 'react';
import {Board} from "../models/Board.ts";
import CellComponent from "./CellComponent.tsx";
import {Cell} from "../models/Cell.ts";
import {Player} from "../models/Player.ts";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    useEffect(() => {
        highlightCells();
    }, [selectedCell]);

    return (
        <div>
            <h3 style={
                {marginBottom: "15px"}
            }>Ходят {currentPlayer?.color === "white" ? "белые" : "черные" }</h3>
            <div className="board">
                {board.cells.map((row, index) => (
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default BoardComponent;
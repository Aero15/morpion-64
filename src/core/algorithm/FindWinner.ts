import type GameBoard from "$core/entity/board/GameBoard.svelte";
import Point from "$core/entity/board/Point.svelte";
import type IWinnerInfo from "$core/interface/IWInnerInfo";

export function findWinner(
    board: GameBoard
): IWinnerInfo | undefined {
    // Check rows
    for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col <= board.cols - board.nbSymbolsInRow; col++) {
            const winner = findWinnerByDirection(board, row, col, 0, 1); // Check horizontally
            if (winner) return winner;
        }
    }

    // Check columns
    for (let col = 0; col < board.cols; col++) {
        for (let row = 0; row <= board.rows - board.nbSymbolsInRow; row++) {
            const winner = findWinnerByDirection(board, row, col, 1, 0); // Check vertically
            if (winner) return winner;
        }
    }

    // Checking the downward diagonals "\"
    for (let row = 0; row <= board.rows - board.nbSymbolsInRow; row++) {
        for (let col = 0; col <= board.cols - board.nbSymbolsInRow; col++) {
            const winner = findWinnerByDirection(board, row, col, 1, 1); // Check diagonal
            if (winner) return winner;
        }
    }

    // Checking the rising diagonals "/"
    for (let row = 0; row <= board.rows - board.nbSymbolsInRow; row++) {
        for (let col = board.nbSymbolsInRow - 1; col < board.cols; col++) {
            const winner = findWinnerByDirection(board, row, col, 1, -1); // Check diagonal
            if (winner) return winner;
        }
    }

    // No winner
    return undefined;
}

export function findWinnerByDirection(
    board: GameBoard,
    startRow: number,
    startCol: number,
    rowIncrement: number,
    colIncrement: number
): IWinnerInfo | null {
    // Get the symbol and color of the first cell
    const firstCell = board.getCellAt(new Point(startRow, startCol))!;
    if (!firstCell.symbol || !firstCell.color) return null;  // Check if the cell is empty

    const { symbol, color } = firstCell;
    const winningPositions: { x: number; y: number }[] = [{ x: startRow, y: startCol }];

    // Check other cells in the specified direction
    for (let i = 1; i < board.nbSymbolsInRow; i++) {
        const row = startRow + i * rowIncrement;
        const col = startCol + i * colIncrement;
        const cell = board.grid[row][col];

        if (cell.symbol !== symbol || cell.color !== color) {
            return null;  // If a cell does not match, we stop
        }

        winningPositions.push({ x: row, y: col });  // Add position to winners list
    }

    return { symbol, color, positions: winningPositions };
}
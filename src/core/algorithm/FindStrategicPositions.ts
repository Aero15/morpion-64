import type GameBoard from "$core/entity/board/GameBoard.svelte";
import Point from "$core/entity/board/Point.svelte";
import type IStrategicPositions from "$core/interface/IStrategicPositions";

/**
 * Search for strategic positions to align 3 symbols (& color).
 * @param symbol The symbol to find.
 * @param color The color associated with the symbol.
 * @returns The list of strategic positions  to align 3 symbols, or an empty list if there is no result.
 */
export function findStrategicPositions(
    board: GameBoard,
    symbol: string,
    color: string
): IStrategicPositions {
    const positionsToCompleteTwoSymbols: Point[] = [];
    const positionsToCompleteOneSymbol: Point[] = [];

    // Checking lines, columns and diagonals
    for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
            // Check each direction
            if (col <= board.cols - board.nbSymbolsInRow) {
                checkLine(board, row, col, 0, 1, symbol, color, positionsToCompleteTwoSymbols, positionsToCompleteOneSymbol);  // Horizontal
            }
            if (row <= board.rows - board.nbSymbolsInRow) {
                checkLine(board, row, col, 1, 0, symbol, color, positionsToCompleteTwoSymbols, positionsToCompleteOneSymbol);  // Vertical
            }
            if (row <= board.rows - board.nbSymbolsInRow && col <= board.cols - board.nbSymbolsInRow) {
                checkLine(board, row, col, 1, 1, symbol, color, positionsToCompleteTwoSymbols, positionsToCompleteOneSymbol);  // Diagonale descendante
            }
            if (row <= board.rows - board.nbSymbolsInRow && col >= board.nbSymbolsInRow - 1) {
                checkLine(board, row, col, 1, -1, symbol, color, positionsToCompleteTwoSymbols, positionsToCompleteOneSymbol);  // Diagonale montante
            }
        }
    }

    // Return the list of strategic positions
    return {
        twoSymbolsPositions: removeDuplicatePositions(positionsToCompleteTwoSymbols),
        oneSymbolPositions: removeDuplicatePositions(positionsToCompleteOneSymbol)
    };
}

// Check a line (horizontal, vertical, diagonal) for 1 or 2 symbols and empty cells
function checkLine(
    board: GameBoard,
    startRow: number, startCol: number,
    rowIncrement: number, colIncrement: number,
    symbol: string, color: string,
    positionsToCompleteTwoSymbols: Point[],
    positionsToCompleteOneSymbol: Point[]
): void {
    let symbolCount = 0;
    let emptyCount = 0;
    const emptyPositions: Point[] = [];

    // Parse a line and count symbols and empty cells
    for (let i = 0; i < board.nbSymbolsInRow; i++) {
        const row = startRow + i * rowIncrement;
        const col = startCol + i * colIncrement;
        const cell = board.getCellAt(new Point(row, col));

        if (cell?.symbol === symbol && cell.color === color) {
            symbolCount++;  // Count the number of symbols
        } else if (cell?.isEmpty()) {
            emptyCount++;  // Count the number of empty cells
            emptyPositions.push(new Point(row, col));  // Save the position of the empty cell
        }
    }

    // If there are 2 same symbols and 1 empty cell, it's a position to complete the alignment
    if (symbolCount === 2 && emptyCount === 1) {
        positionsToCompleteTwoSymbols.push(emptyPositions[0]); // Add the position of the empty cell
    }

    // If there is 1 symbol and 2 empty cells, it's another position to complete the alignment
    if (symbolCount === 1 && emptyCount === 2) {
        positionsToCompleteOneSymbol.push(...emptyPositions); // Add the positions of the empty cells
    }
}

// Remove duplicate positions from the list
function removeDuplicatePositions(
    positions: Point[]
): Point[] {
    const uniquePositions = new Set<string>(); // Using a Set to store unique positions
    const result: Point[] = [];

    for (const position of positions) {
        const positionKey = `${position.x},${position.y}`; // Create a unique key for each position
        if (!uniquePositions.has(positionKey)) {
            uniquePositions.add(positionKey); // If the position is unique, add it to the Set
            result.push(position);  // Add the position to the result
        }
    }

    return result;
}
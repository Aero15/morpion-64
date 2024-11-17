import type GameBoard from "$core/entity/board/GameBoard.svelte";
import Point from "$core/entity/board/Point.svelte";
import type IWinnerInfo from "$core/interface/IWInnerInfo";

export function findWinner(
    board: GameBoard
): IWinnerInfo | undefined {
    // Vérification des lignes
    for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col <= board.cols - board.nbSymbolsInRow; col++) {
            const winner = findWinnerByDirection(board, row, col, 0, 1); // Vérifie horizontalement
            if (winner) return winner;
        }
    }

    // Vérification des colonnes
    for (let col = 0; col < board.cols; col++) {
        for (let row = 0; row <= board.rows - board.nbSymbolsInRow; row++) {
            const winner = findWinnerByDirection(board, row, col, 1, 0); // Vérifie verticalement
            if (winner) return winner;
        }
    }

    // Vérification des diagonales descendante "\"
    for (let row = 0; row <= board.rows - board.nbSymbolsInRow; row++) {
        for (let col = 0; col <= board.cols - board.nbSymbolsInRow; col++) {
            const winner = findWinnerByDirection(board, row, col, 1, 1); // Vérifie diagonale descendante
            if (winner) return winner;
        }
    }

    // Vérification des diagonales montante "/"
    for (let row = 0; row <= board.rows - board.nbSymbolsInRow; row++) {
        for (let col = board.nbSymbolsInRow - 1; col < board.cols; col++) {
            const winner = findWinnerByDirection(board, row, col, 1, -1); // Vérifie diagonale montante
            if (winner) return winner;
        }
    }

    // Aucun gagnant
    return undefined;
}

export function findWinnerByDirection(
    board: GameBoard,
    startRow: number,
    startCol: number,
    rowIncrement: number,
    colIncrement: number
): IWinnerInfo | null {
    // Récupère le symbole et la couleur de la première case
    const firstCell = board.getCellAt(new Point(startRow, startCol))!;
    if (!firstCell.symbol || !firstCell.color) return null;  // Vérifie si la case est vide

    const { symbol, color } = firstCell;
    const winningPositions: { x: number; y: number }[] = [{ x: startRow, y: startCol }];

    // Vérifie les autres cases dans la direction spécifiée
    for (let i = 1; i < board.nbSymbolsInRow; i++) {
        const row = startRow + i * rowIncrement;
        const col = startCol + i * colIncrement;
        const cell = board.grid[row][col];

        if (cell.symbol !== symbol || cell.color !== color) {
            return null;  // Si une case ne correspond pas, on arrête
        }

        winningPositions.push({ x: row, y: col });  // Ajoute la position à la liste des gagnants
    }

    return { symbol, color, positions: winningPositions };
}
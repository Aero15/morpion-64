import type GameBoard from "$core/entity/board/GameBoard.svelte";
import Point from "$core/entity/board/Point.svelte";
import type IStrategicPositions from "$core/interface/IStrategicPositions";

/**
 * Recherche des positions stratégiques pour aligner 3 symboles (symbol/couleur).
 * @param symbol Le symbole à chercher.
 * @param color La couleur associée au symbole.
 * @returns Une liste de positions stratégiques pour aligner 3 symboles ou une liste vide.
 */
export function findStrategicPositions(
    board: GameBoard,
    symbol: string,
    color: string
): IStrategicPositions {
    const positionsToCompleteTwoSymbols: Point[] = [];
    const positionsToCompleteOneSymbol: Point[] = [];

    // Vérification des lignes, colonnes et diagonales
    for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
            // Vérifie chaque direction
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

    // Supprimer les doublons dans les deux listes
    return {
        twoSymbolsPositions: removeDuplicatePositions(positionsToCompleteTwoSymbols),
        oneSymbolPositions: removeDuplicatePositions(positionsToCompleteOneSymbol)
    };
}

// Vérifie une ligne (horizontale, verticale, diagonale) pour 1 ou 2 symboles et cases vides
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

    // Parcours la ligne et compte les symboles et les cases vides
    for (let i = 0; i < board.nbSymbolsInRow; i++) {
        const row = startRow + i * rowIncrement;
        const col = startCol + i * colIncrement;
        const cell = board.getCellAt(new Point(row, col));

        if (cell?.symbol === symbol && cell.color === color) {
            symbolCount++;  // Comptabilise les symboles trouvés
        } else if (cell?.isEmpty()) {
            emptyCount++;  // Comptabilise les cases vides
            emptyPositions.push(new Point(row, col));  // Enregistre la position vide
        }
    }

    // Si 2 symboles et 1 case vide, c'est une position pour compléter l'alignement
    if (symbolCount === 2 && emptyCount === 1) {
        positionsToCompleteTwoSymbols.push(emptyPositions[0]);  // Ajouter la case vide
    }

    // Si 1 symbole et 2 cases vides, c'est une position pour compléter l'alignement avec 2 symboles
    if (symbolCount === 1 && emptyCount === 2) {
        positionsToCompleteOneSymbol.push(...emptyPositions);  // Ajouter les deux positions vides
    }
}

// Méthode pour supprimer les doublons dans la liste des positions
function removeDuplicatePositions(
    positions: Point[]
): Point[] {
    const uniquePositions = new Set<string>(); // Utilise un Set pour éliminer les doublons
    const result: Point[] = [];

    for (const position of positions) {
        const positionKey = `${position.x},${position.y}`;  // Création d'une clé unique pour chaque position
        if (!uniquePositions.has(positionKey)) {
            uniquePositions.add(positionKey);  // Si la position n'a pas encore été rencontrée, on l'ajoute
            result.push(position);  // Ajoute la position dans la liste finale
        }
    }

    return result;
}
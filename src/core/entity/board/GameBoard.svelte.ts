import type { Color } from "$core/enums/Color";
import type { Symbol } from "$core/enums/Symbol";
import type IStrategicPositions from "$core/interface/IStrategicPositions";
import type IWinnerInfo from "$core/interface/IWInnerInfo";
import { maxGridSize, minGridSize } from "$core/store/settings.svelte";
import Cell from "./Cell.svelte";
import Point from "./Point.svelte";

export default class GameBoard {
    private _grid: Cell[][] = $state([]);
    private _rows: number;
    private _cols: number;
    private _nbSymbolsInRow: number = 3;
  
    constructor(
        rows: number = 3,
        cols: number = 3
    ) {
        if (
            rows < minGridSize.x || rows > maxGridSize.x ||
            cols < minGridSize.y || cols > maxGridSize.y
        ) {
            const min = minGridSize.x
            const max = maxGridSize.x
            throw new Error(`
                Le nombre de lignes et de colonnes doit
                être compris entre ${min} et ${max}.
            `);
        }

        this._rows = rows;
        this._cols = cols;
    
        this._grid = [];
        for (let ii = 0; ii < rows; ii++) {
            const row: Cell[] = [];
            for (let jj = 0; jj < cols; jj++) {
                const position = new Point(ii, jj);
                const cell = new Cell(position);
                row.push(cell);
            }
            this.grid.push(row);
        }
    }

    get grid(): Cell[][] {
        return this._grid;
    }

    get rows(): number {
        return this._rows;
    }

    get cols(): number {
        return this._cols;
    }

    get nbSymbolsInRow(): number {
        return this._nbSymbolsInRow;
    }
  
    // Méthode pour placer un symbole à une position donnée
    placeSymbolAt(
        position: Point,
        symbol: Symbol,
        color: Color | string
    ): void {
        const cell = this.getCellAt(position);
        if (!cell) {
            throw new Error("Position invalide.");
        }
        if (!cell.isEmpty()) {
            throw new Error("La cellule est déjà remplie.");
        }

        const { x, y } = position;
        this._grid[x][y].symbol = symbol; // Place le symbole dans la cellule
        this._grid[x][y].color = color;
    }

    setEmptyAt(position: Point): void {
        const cell = this.getCellAt(position);
        if (!cell) {
            throw new Error("Position invalide.");
        }
        const { x, y } = position;
        this._grid[x][y].clear();
    }
  
    // Méthode pour obtenir le symbole à une position donnée
    getSymbolAt(position: Point): string | undefined {
        const cell = this.getCellAt(position);
        return cell ? cell.symbol : undefined; // Retourne le symbole ou undefined si la cellule est vide
    }

    // Méthode pour obtenir la couleur à une position donnée
    getColorAt(position: Point): string | undefined {
        const cell = this.getCellAt(position);
        return cell ? cell.color : undefined; // Retourne le symbole ou undefined si la cellule est vide
    }
  
    // Méthode pour obtenir la cellule à une position donnée
    getCellAt(position: Point): Cell | undefined {
        const { x, y } = position;
        if (this._grid[x] && this._grid[x][y]) {
            return this._grid[x][y];
        }
        return undefined; // Retourne undefined si la position est invalide
    }

    getEmptyPositions(): Point[] {
        const emptyPositions: Point[] = [];
        for (const row of this._grid) {
            for (const cell of row) {
                if (cell.isEmpty()) {
                    emptyPositions.push(cell.position);
                }
            }
        }
        return emptyPositions;
    }

    findWinner(): IWinnerInfo | undefined {
        // Vérification des lignes
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col <= this.cols - this.nbSymbolsInRow; col++) {
                const winner = this.findWinnerByDirection(row, col, 0, 1); // Vérifie horizontalement
                if (winner) return winner;
            }
        }

        // Vérification des colonnes
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row <= this.rows - this.nbSymbolsInRow; row++) {
                const winner = this.findWinnerByDirection(row, col, 1, 0); // Vérifie verticalement
                if (winner) return winner;
            }
        }

        // Vérification des diagonales descendante "\"
        for (let row = 0; row <= this.rows - this.nbSymbolsInRow; row++) {
            for (let col = 0; col <= this.cols - this.nbSymbolsInRow; col++) {
                const winner = this.findWinnerByDirection(row, col, 1, 1); // Vérifie diagonale descendante
                if (winner) return winner;
            }
        }

        // Vérification des diagonales montante "/"
        for (let row = 0; row <= this.rows - this.nbSymbolsInRow; row++) {
            for (let col = this.nbSymbolsInRow - 1; col < this.cols; col++) {
                const winner = this.findWinnerByDirection(row, col, 1, -1); // Vérifie diagonale montante
                if (winner) return winner;
            }
        }

        // Aucun gagnant
        return undefined;
    }

    findWinnerByDirection(
        startRow: number,
        startCol: number,
        rowIncrement: number,
        colIncrement: number
    ): IWinnerInfo | null {
        // Récupère le symbole et la couleur de la première case
        const firstCell = this.getCellAt(new Point(startRow, startCol))!;
        if (!firstCell.symbol || !firstCell.color) return null;  // Vérifie si la case est vide
    
        const { symbol, color } = firstCell;
        const winningPositions: { x: number; y: number }[] = [{ x: startRow, y: startCol }];
    
        // Vérifie les autres cases dans la direction spécifiée
        for (let i = 1; i < this.nbSymbolsInRow; i++) {
            const row = startRow + i * rowIncrement;
            const col = startCol + i * colIncrement;
            const cell = this.grid[row][col];
    
            if (cell.symbol !== symbol || cell.color !== color) {
                return null;  // Si une case ne correspond pas, on arrête
            }
    
            winningPositions.push({ x: row, y: col });  // Ajoute la position à la liste des gagnants
        }
    
        return { symbol, color, positions: winningPositions };
    }

    setHighlightedAt(x: number, y: number, highlight: boolean = true): void {
        this._grid[x][y].highlighted = highlight
    }

    // Effacer la surbrillance des cellules
    clearHighlight(): void {
        for (const row of this._grid) {
            for (const cell of row) {
                cell.highlighted = false;
            }
        }
    }

    /**
     * Recherche des positions stratégiques pour aligner 3 symboles (symbol/couleur).
     * @param symbol Le symbole à chercher.
     * @param color La couleur associée au symbole.
     * @returns Une liste de positions stratégiques pour aligner 3 symboles ou une liste vide.
     */
    findStrategicPositions(
        symbol: string,
        color: string
    ): IStrategicPositions {
        const positionsToCompleteTwoSymbols: Point[] = [];
        const positionsToCompleteOneSymbol: Point[] = [];

        // Vérification des lignes, colonnes et diagonales
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                // Vérifie chaque direction
                if (col <= this.cols - this.nbSymbolsInRow) {
                    this.checkLine(row, col, 0, 1, symbol, color, positionsToCompleteTwoSymbols, positionsToCompleteOneSymbol);  // Horizontal
                }
                if (row <= this.rows - this.nbSymbolsInRow) {
                    this.checkLine(row, col, 1, 0, symbol, color, positionsToCompleteTwoSymbols, positionsToCompleteOneSymbol);  // Vertical
                }
                if (row <= this.rows - this.nbSymbolsInRow && col <= this.cols - this.nbSymbolsInRow) {
                    this.checkLine(row, col, 1, 1, symbol, color, positionsToCompleteTwoSymbols, positionsToCompleteOneSymbol);  // Diagonale descendante
                }
                if (row <= this.rows - this.nbSymbolsInRow && col >= this.nbSymbolsInRow - 1) {
                    this.checkLine(row, col, 1, -1, symbol, color, positionsToCompleteTwoSymbols, positionsToCompleteOneSymbol);  // Diagonale montante
                }
            }
        }

        // Supprimer les doublons dans les deux listes
        return {
            twoSymbolsPositions: this.removeDuplicatePositions(positionsToCompleteTwoSymbols),
            oneSymbolPositions: this.removeDuplicatePositions(positionsToCompleteOneSymbol)
        };
    }

    // Vérifie une ligne (horizontale, verticale, diagonale) pour 1 ou 2 symboles et cases vides
    private checkLine(
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
        for (let i = 0; i < this.nbSymbolsInRow; i++) {
            const row = startRow + i * rowIncrement;
            const col = startCol + i * colIncrement;
            const cell = this.getCellAt(new Point(row, col));

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
    private removeDuplicatePositions(positions: Point[]): Point[] {
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
}
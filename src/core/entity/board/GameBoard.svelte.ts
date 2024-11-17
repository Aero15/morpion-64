import { findStrategicPositions } from "$core/algorithm/FindStrategicPositions";
import { findWinner } from "$core/algorithm/FindWinner";
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
        return findWinner(this);
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
        return findStrategicPositions(this, symbol, color);
    }
}
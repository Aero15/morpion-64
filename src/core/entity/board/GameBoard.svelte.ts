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
            const minX = minGridSize.x,     minY = minGridSize.y
            const maxX = maxGridSize.x,     maxY = maxGridSize.y
            const min  = `${minX}x${minY}`, max  = `${maxX}x${maxY}`
            throw new Error(`
                The number of rows and columns must be between
                ${min} and ${max}.
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
  
    // Place symbol at position
    placeSymbolAt(
        position: Point,
        symbol: Symbol,
        color: Color | string
    ): void {
        const cell = this.getCellAt(position);
        // Do check
        if (!cell) {
            throw new Error("Invalid position.");
        }
        if (!cell.isEmpty()) {
            throw new Error("The cell is already filled.");
        }

        // Update cell symbol and color
        const { x, y } = position;
        this._grid[x][y].symbol = symbol;
        this._grid[x][y].color = color;
    }

    setEmptyAt(position: Point): void {
        const cell = this.getCellAt(position);
        if (!cell) {
            throw new Error("Invalid position.");
        }
        const { x, y } = position;
        this._grid[x][y].clear();
    }
  
    getSymbolAt(position: Point): string | undefined {
        const cell = this.getCellAt(position);
        return cell ? cell.symbol : undefined;
    }

    getColorAt(position: Point): string | undefined {
        const cell = this.getCellAt(position);
        return cell ? cell.color : undefined;
    }
  
    getCellAt(position: Point): Cell | undefined {
        const { x, y } = position;
        if (this._grid[x] && this._grid[x][y]) {
            return this._grid[x][y]; // Return the cell if it exists
        }
        return undefined; // Return undefined if not
    }

    // Return all empty positions in the board
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

    // Remove all highlight in the board
    clearHighlight(): void {
        for (const row of this._grid) {
            for (const cell of row) {
                cell.highlighted = false;
            }
        }
    }

    /**
     * Search for strategic positions to align 3 symbols (symbol and color).
     * @param symbol The symbol to find.
     * @param color The color associated with the symbol.
     * @returns A list of strategic positions to align 3 symbols or an empty list.
     */
    findStrategicPositions(
        symbol: string,
        color: string
    ): IStrategicPositions {
        return findStrategicPositions(this, symbol, color);
    }
}
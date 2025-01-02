import type { Color } from "$core/enums/Color";
import type { Symbol } from "$core/enums/Symbol";
import Point from "./Point.svelte";

export default class Cell {
    private _position: Point;
    private _symbol?: Symbol = $state(undefined);
    private _color?: Color | string = $state(undefined);
    private _highlighted: boolean = $state(false);
    private _filledAt?: Date = $state(undefined);
  
    constructor(
        position: Point,
        symbol?: Symbol,
        color?: Color | string
    ) {
        this._position = position;
        this._symbol = symbol;
        this._color = color;

        // Save timestamp if symbol is set
        this._filledAt = this._symbol ? new Date() : undefined;
    }
  
    // Getter for position
    get position(): Point {
      return this._position;
    }
  
    // Getter and Setter for symbol
    get symbol(): string | undefined {
      return this._symbol;
    }
  
    set symbol(value: Symbol | undefined) {
      this._symbol = value;

      // Update filledAt
      this._filledAt = value ? new Date() : undefined;
    }

    // Getter and Setter for color
    get color(): Color | string | undefined {
      return this._color;
    }
  
    set color(value: Color | string | undefined) {
      this._color = value;
    }

    // Getter and Setter for highlighted
    get highlighted(): boolean {
      return this._highlighted;
    }
  
    set highlighted(value: boolean) {
      this._highlighted = value;
    }
  
    // Getter for filledAt
    get filledAt(): Date | undefined {
      return this._filledAt;
    }
  
    // Return true if the cell is empty
    isEmpty(): boolean {
      return this._symbol === undefined;
    }

    clear(): void {
        this._symbol = undefined;
        this._color = undefined;
        this._highlighted = false;
        this._filledAt = undefined;
    }
}
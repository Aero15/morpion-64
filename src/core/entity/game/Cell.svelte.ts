import type { Color } from "$core/enums/Color";
import type { Symbol } from "$core/enums/Symbol";
import Point from "./Point.svelte";

export default class Cell {
    private _position: Point;
    private _symbol?: Symbol = $state(undefined);
    private _color?: Color | string = $state(undefined);
    private _filledAt?: Date = $state(undefined);
  
    constructor(
        position: Point,
        symbol?: Symbol,
        color?: Color | string
    ) {
        this._position = position;
        this._symbol = symbol;
        this._color = color;

        // Remplir la date si un symbole est fourni
        this._filledAt = this._symbol ? new Date() : undefined;
    }
  
    // Getter pour position
    get position(): Point {
      return this._position;
    }
  
    // Getter et Setter pour symbol
    get symbol(): string | undefined {
      return this._symbol;
    }
  
    set symbol(value: Symbol | undefined) {
      this._symbol = value;

      // Met à jour filledAt en conséquence
      this._filledAt = value ? new Date() : undefined;
    }

    // Getter et Setter pour color
    get color(): Color | string | undefined {
      return this._color;
    }
  
    set color(value: Color | string | undefined) {
      this._color = value;
    }
  
    // Getter pour filledAt
    get filledAt(): Date | undefined {
      return this._filledAt;
    }
  
    // Méthode pour vérifier si la cellule est vide
    isEmpty(): boolean {
      return this._symbol === undefined;
    }

    clear(): void {
        this._symbol = undefined;
        this._color = undefined;
        this._filledAt = undefined;
    }
}
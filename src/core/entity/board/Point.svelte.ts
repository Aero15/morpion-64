export default class Point {
    private _x: number = $state(0);
    private _y: number = $state(0);

    constructor(
        x: number,
        y: number
    ) {
        this._x = x;
        this._y = y;
    }
  
    // Getter for x
    get x(): number {
        return this._x;
    }
  
    // Setter for x
    set x(value: number) {
        this._x = value;
    }
  
    // Getter for y
    get y(): number {
        return this._y;
    }
  
    // Setter for y
    set y(value: number) {
        this._y = value;
    }

    toArray(): number[] {
        return [this._x, this._y];
    }
}
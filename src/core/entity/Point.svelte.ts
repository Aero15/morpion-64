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
  
    // Getter pour x
    get x(): number {
        return this._x;
    }
  
    // Setter pour x
    set x(value: number) {
        this._x = value;
    }
  
    // Getter pour y
    get y(): number {
        return this._y;
    }
  
    // Setter pour y
    set y(value: number) {
        this._y = value;
    }

    toArray(): number[] {
        return [this._x, this._y];
    }
}
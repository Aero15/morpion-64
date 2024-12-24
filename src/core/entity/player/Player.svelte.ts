import type { Color } from "$core/enums/Color";
import { PlayerType } from "$core/enums/PlayerType";
import { Symbol } from "$core/enums/Symbol";
import type IPlayer from "$core/interface/IPlayer";
import type GameEngine from "$core/entity/engine/GameEngine.svelte";

export default abstract class Player implements IPlayer {
    private static id: number = 0;

    private _id: number;
    private _name: string = $state('');
    private _color: Color | string = $state('');
    private _symbol: Symbol = $state(Symbol.Cross);
    private _score: number = $state(0);
    private _type: PlayerType;
  
    constructor(
        name: string,
        symbol: Symbol,
        color: Color | string,
        type: PlayerType = PlayerType.Human
    ) {
        this._id = ++Player.id;
        this._name = name;
        this._symbol = symbol;
        this._color = color;
        this._type = type;
    }

    // Getter and Setter for id
    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }
  
    // Getter and Setter for name
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }
  
    // Getter and Setter for symbol
    get symbol(): Symbol {
        return this._symbol;
    }
    set symbol(value: Symbol) {
        this._symbol = value;
    }
  
    // Getter and Setter for color
    get color(): Color | string {
        return this._color;
    }
    set color(value: Color | string) {
        this._color = value;
    }

    // Getter and Setter for type
    get type(): PlayerType {
        return this._type;
    }
    set type(type: PlayerType) {
        this._type = type;
    }

    // Getter and Setter for score
    get score(): number {
        return this._score;
    }
    set score(value: number) {
        this._score = value;
    }
    addScore(value: number) {
        this._score += value;
    }
    
    abstract play(game: GameEngine): void;
}
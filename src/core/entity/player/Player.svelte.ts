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

    // Getter et Setter pour id
    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }
  
    // Getter et Setter pour name
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }
  
    // Getter et Setter pour symbol
    get symbol(): Symbol {
        return this._symbol;
    }
    set symbol(value: Symbol) {
        this._symbol = value;
    }
  
    // Getter et Setter pour color
    get color(): Color | string {
        return this._color;
    }
    set color(value: Color | string) {
        this._color = value;
    }

    // Getter et Setter pour type
    get type(): PlayerType {
        return this._type;
    }
    set type(type: PlayerType) {
        this._type = type;
    }
  
    // Méthode abstraite que les classes dérivées devront implémenter
    abstract play(game: GameEngine): void;
}
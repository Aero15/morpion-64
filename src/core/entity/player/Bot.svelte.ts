import type { Color } from "$core/enums/Color";
import { PlayerType } from "$core/enums/PlayerType";
import type { Symbol } from "$core/enums/Symbol";
import Player from "./Player.svelte";

export default class Bot extends Player {
    private _difficulty: string;
  
    constructor(
        name: string,
        symbol: Symbol,
        color: Color | string,
        difficulty: string
    ) {
        super(
            name, symbol, color,
            PlayerType.Bot
        );

        this._difficulty = difficulty;
    }
  
    // Getter et Setter pour difficulty
    get difficulty(): string {
        return this._difficulty;
    }
  
    set difficulty(value: string) {
        this._difficulty = value;
    }
}
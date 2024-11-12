import type { Color } from "$core/enums/Color";
import { PlayerType } from "$core/enums/PlayerType";
import type { Symbol } from "$core/enums/Symbol";
import Player from "./Player.svelte";

export default class HumanPlayer extends Player {

    constructor(
        name: string,
        symbol: Symbol,
        color: Color | string,
    ) {
        super(
            name, symbol, color,
            PlayerType.Human
        );
    }
}
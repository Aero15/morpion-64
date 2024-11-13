import type { Color } from "$core/enums/Color";
import { PlayerType } from "$core/enums/PlayerType";
import type { Symbol } from "$core/enums/Symbol";
import type GameEngine from "$core/entity/engine/GameEngine.svelte";
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
  
    // Implémentation de la méthode abstraite play
    play(game: GameEngine): void {
        let cells = game.board.getEmptyPositions();
        if (cells.length < 1) {
            throw new Error("Le plateau est plein");
        }

        let index = Math.floor(Math.random() * cells.length);
        let position = cells[index];
        game.placeAt(position);
    }
}
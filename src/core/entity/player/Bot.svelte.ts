import type { Color } from "$core/enums/Color";
import { PlayerType } from "$core/enums/PlayerType";
import type { Symbol } from "$core/enums/Symbol";
import { randomBetween } from "$core/helpers/Math.svelte";
import { getBotSpeedDelay } from "$core/helpers/Players.svelte";
import type GameEngine from "../engine/GameEngine.svelte";
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
  
    // Implémentation de la méthode abstraite play
    play(game: GameEngine): void {
        let cells = game.board.getEmptyPositions();
        if (cells.length < 1) {
            throw new Error("Le plateau est plein");
        }

        let index = Math.floor(Math.random() * cells.length);
        let position = cells[index];

        let delayInterval = getBotSpeedDelay()
        let minDelay = delayInterval.x;
        let maxDelay = delayInterval.y;
        let delay = randomBetween(minDelay, maxDelay);

        setTimeout(() => {
            game.placeAt(position);
        }, delay);
    }
}
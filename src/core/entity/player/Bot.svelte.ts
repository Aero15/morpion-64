import type { Color } from "$core/enums/Color";
import { PlayerType } from "$core/enums/PlayerType";
import type { Symbol } from "$core/enums/Symbol";
import { getRandomFrom } from "$core/helpers/Array.svelte";
import { randomBetween } from "$core/helpers/Math.svelte";
import { getBotSpeedDelay } from "$core/helpers/Players.svelte";
import type Point from "../board/Point.svelte";
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
        // Chosir une position strategique
        let strategicPositions = game.board.findStrategicPositions(
            this.symbol, this.color
        );
        let { oneSymbolPositions, twoSymbolsPositions } = strategicPositions;

        // S'il y a une position strategique pour compléter un alignement de 2 symboles
        if (twoSymbolsPositions.length > 0) {
            let position = getRandomFrom<Point>(twoSymbolsPositions);
            this.playMoveAfter(position, game);
            return;
        }

        // S'il y a une position strategique pour compléter un alignement de 1 symbole
        if (oneSymbolPositions.length > 0) {
            let position = getRandomFrom<Point>(oneSymbolPositions);
            this.playMoveAfter(position, game);
            return;
        }

        // Choisir une position aleatoire
        let position = this.getRandomPosition(game);
        if (position === null) {
            throw new Error("Le plateau est plein");
        }

        this.playMoveAfter(position, game);
    }

    playMoveAfter(
        position: Point,
        game: GameEngine
    ): void {
        // Calcul du delai
        let delayInterval = getBotSpeedDelay()
        let minDelay = delayInterval.x;
        let maxDelay = delayInterval.y;
        let delay = randomBetween(minDelay, maxDelay);

        // Placer le symbole apres le delai
        setTimeout(() => {
            game.placeAt(position);
        }, delay);
    }

    getRandomPosition(game: GameEngine): Point | null {
        let cells = game.board.getEmptyPositions();
        if (cells.length < 1) {
            return null
        }

        return getRandomFrom<Point>(cells);
    }
}
import type { Color } from "$core/enums/Color";
import type { Difficulty } from "$core/enums/Difficulty";
import { PlayerType } from "$core/enums/PlayerType";
import type { Symbol } from "$core/enums/Symbol";
import { getRandomFrom } from "$core/helpers/Array.svelte";
import { randomBetween } from "$core/helpers/Math.svelte";
import { getBotSpeedDelay } from "$core/helpers/Players.svelte";
import type Point from "$core/entity/board/Point.svelte";
import type GameEngine from "$core/entity/engine/GameEngine.svelte";
import StrategyFactory from "$core/entity/strategy/StrategyFactory";
import Player from "./Player.svelte";
import type StrategySettings from "../strategy/StrategySettings";
import { StrategyTask } from "$core/enums/StrategyTask";

export default class Bot extends Player {
    private _difficulty: Difficulty;
    private _strategySettings: StrategySettings;
  
    constructor(
        name: string,
        symbol: Symbol,
        color: Color | string,
        difficulty: Difficulty
    ) {
        super(
            name, symbol, color,
            PlayerType.Bot
        );

        this._difficulty = difficulty;
        this._strategySettings = StrategyFactory.getStrategy(difficulty);
    }
  
    // Getter et Setter pour difficulty
    get difficulty(): Difficulty {
        return this._difficulty;
    }
  
    set difficulty(value: Difficulty) {
        this._difficulty = value;
    }

    // Getter et Setter pour strategySettings
    get strategySettings(): StrategySettings {
        return this._strategySettings;
    }
  
    set strategySettings(value: StrategySettings) {
        this._strategySettings = value;
    }

    play(game: GameEngine): void {
        // Get random position (and check if the board is full)
        let position = this.getRandomPosition(game);
        if (position === null) {
            throw new Error("Le plateau est plein");
        }

        // Find strategic positions
        let strategicPositions = game.board.findStrategicPositions(
            this.symbol, this.color
        );
        let { oneSymbolPositions, twoSymbolsPositions } = strategicPositions;
        console.log(this.symbol, strategicPositions)

        // Get random strategy
        const strategy = this.strategySettings.getRandomStrategy();
        switch (strategy) {
            case StrategyTask.SelectRandomCell:
                // Do nothing
                break;
            case StrategyTask.ExtendAlignment:
                if (oneSymbolPositions.length > 0)
                    position = getRandomFrom<Point>(oneSymbolPositions);
                break;
            case StrategyTask.CompleteAlignment:
                if (twoSymbolsPositions.length > 0)
                    position = getRandomFrom<Point>(twoSymbolsPositions);
                else if (oneSymbolPositions.length > 0)
                    position = getRandomFrom<Point>(oneSymbolPositions);
                break;
        }
        this.playMoveAfter(position!, game);
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
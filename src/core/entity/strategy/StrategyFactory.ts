import { Difficulty } from "$core/enums/Difficulty";
import { StrategyTask } from "$core/enums/StrategyTask";
import StrategyRange from "./StrategyRange";
import StrategySettings from "./StrategySettings";

const difficultyStrategies = [
    new StrategySettings(Difficulty.Peaceful, [
        new StrategyRange(  0, 100, StrategyTask.SelectRandomCell),
        /*new StrategyRange(100, 100, StrategyTask.ExtendAlignment),
        new StrategyRange(100, 100, StrategyTask.CompleteAlignment),*/
    ]),
    new StrategySettings(Difficulty.Easy, [
        new StrategyRange(  0,  80, StrategyTask.SelectRandomCell),
        new StrategyRange( 80,  90, StrategyTask.ExtendAlignment),
        new StrategyRange( 90, 100, StrategyTask.CompleteAlignment),
    ]),
    new StrategySettings(Difficulty.Medium, [
        new StrategyRange(  0,  20, StrategyTask.SelectRandomCell),
        new StrategyRange( 20,  60, StrategyTask.ExtendAlignment),
        new StrategyRange( 60, 100, StrategyTask.CompleteAlignment),
    ]),
    new StrategySettings(Difficulty.Hard, [
        new StrategyRange(  0,  10, StrategyTask.SelectRandomCell),
        new StrategyRange( 10,  20, StrategyTask.ExtendAlignment),
        new StrategyRange( 20, 100, StrategyTask.CompleteAlignment),
    ]),
    new StrategySettings(Difficulty.Impossible, [
        new StrategyRange(  0,   5, StrategyTask.SelectRandomCell),
        new StrategyRange(  5,  15, StrategyTask.ExtendAlignment),
        new StrategyRange( 15, 100, StrategyTask.CompleteAlignment),
    ]),
];

// Factory to create move strategies
export default class StrategyFactory {
    static getStrategy(
        difficulty: Difficulty
    ): StrategySettings {
        return difficultyStrategies
            .find((strategy) => strategy.difficulty === difficulty)!;
    }
}
import { Difficulty } from "$core/enums/Difficulty";
import { StrategyTask } from "$core/enums/StrategyTask";
import StrategyRange from "./StrategyRange";

export default class StrategySettings {
    private _difficulty: Difficulty;
    private _strategyRanges: StrategyRange[];

    constructor(difficulty: Difficulty, strategyRanges: StrategyRange[]) {
        this._difficulty = difficulty;
        this._strategyRanges = strategyRanges;
        this.validateStrategyRanges();
    }

    // Getters
    get difficulty(): Difficulty {
        return this._difficulty;
    }

    get strategyRanges(): StrategyRange[] {
        return [...this._strategyRanges];
    }

    // Setters
    set difficulty(value: Difficulty) {
        this._difficulty = value;
    }

    set strategyRanges(value: StrategyRange[]) {
        this.validateStrategyRanges();
        this._strategyRanges = [...value];
    }

    // Validation
    private validateStrategyRanges(): void {
        // Validation of individual values
        for (const range of this._strategyRanges) {
            if (range.minimum < 0) {
                throw new Error('[StrategySettings] The minimum value cannot be negative');
            }
            if (range.maximum < range.minimum) {
                throw new Error('[StrategySettings] The maximum value must be greater than or equal to the minimum');
            }
            if (range.maximum > 100) {
                throw new Error('[StrategySettings] The maximum value cannot exceed 100');
            }
        }

        // Validation of overlaps between ranges
        const sortedRanges = [...this._strategyRanges].sort((a, b) => a.minimum - b.minimum);
        
        for (let i = 0; i < sortedRanges.length - 1; i++) {
            const currentRange = sortedRanges[i];
            const nextRange = sortedRanges[i + 1];
            
            if (currentRange.maximum > nextRange.minimum) {
                let current = `(${currentRange.minimum}-${currentRange.maximum})`;
                let next = `(${nextRange.minimum}-${nextRange.maximum})`;
                throw new Error(
                    `[StrategySettings] Overlap detected between strategies (${this.difficulty}) : ` +
                    `${StrategyTask[currentRange.task]} ${current} and ` +
                    `${StrategyTask[nextRange.task]} ${next}`
                );
            }
        }

        // Optional validation: check that the ranges cover exactly 0-100
        const hasGaps = sortedRanges.length > 0 && (
            sortedRanges[0].minimum > 0 ||
            sortedRanges[sortedRanges.length - 1].maximum < 100 ||
            sortedRanges.some((range, index) => 
                index > 0 && range.minimum > sortedRanges[index - 1].maximum
            )
        );

        if (hasGaps) {
            throw new Error('Strategy ranges should cover the entire range from 0 to 100 without gaps');
        }
    }

    // Add a new strategy range
    public addStrategyRange(range: StrategyRange): void {
        const newRanges = [...this._strategyRanges, range];
        this._strategyRanges = newRanges;
        this.validateStrategyRanges();
    }

    // Remove a strategy range
    public removeStrategyRange(task: StrategyTask): void {
        this._strategyRanges = this._strategyRanges.filter(range => range.task !== task);
    }

    // Returns a random strategy
    public getRandomStrategy(): StrategyTask {
        const random = Math.random() * 100;
        const rangeStrategy = this.strategyRanges
            .find(range => range.isInRange(random)) || this.strategyRanges[0];
        return rangeStrategy.task;
    }
}
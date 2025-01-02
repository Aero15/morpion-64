import type { StrategyTask } from "$core/enums/StrategyTask";

export default class StrategyRange {
    // Propriétés privées pour chaque instance
    private _minimum: number;
    private _maximum: number;
    private _task: StrategyTask;

    // Constructeur pour initialiser les valeurs
    constructor(
        minimum: number,
        maximum: number,
        task: StrategyTask
    ) {
        this._minimum = minimum;
        this._maximum = maximum;
        this._task = task;
    }

    // Getter for the minimum value
    get minimum(): number {
        return this._minimum;
    }

    set minimum(minimum: number) {
        this._minimum = minimum;
    }

    // Getter for the maximum value
    get maximum(): number {
        return this._maximum;
    }

    set maximum(maximum: number) {
        this._maximum = maximum;
    }

    // Getter for the task (StrategyTask)
    get task(): StrategyTask {
        return this._task;
    }

    set task(task: StrategyTask) {
        this._task = task;
    }

    // Returns the range as an array [minimum, maximum]
    public getRange(): [number, number] {
        return [this.minimum, this.maximum];
    }

    // Indicates whether the transmitted number is part of the range
    public isInRange(number: number): boolean {
        return number >= this.minimum && number <= this.maximum;
    }
}
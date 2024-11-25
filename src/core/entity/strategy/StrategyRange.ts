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

    // Getter pour la valeur minimum
    get minimum(): number {
        return this._minimum;
    }

    // Setter pour la valeur minimum
    set minimum(minimum: number) {
        this._minimum = minimum;
    }

    // Getter pour la valeur maximum
    get maximum(): number {
        return this._maximum;
    }

    // Setter pour la valeur maximum
    set maximum(maximum: number) {
        this._maximum = maximum;
    }

    // Getter pour la tâche (StrategyTask)
    get task(): StrategyTask {
        return this._task;
    }

    // Setter pour la tâche
    set task(task: StrategyTask) {
        this._task = task;
    }

    // Retourne le range sous forme de tableau [minimum, maximum]
    public getRange(): [number, number] {
        return [this.minimum, this.maximum];
    }

    // Indique si le nombre fait partie du range
    public isInRange(number: number): boolean {
        return number >= this.minimum && number <= this.maximum;
    }
}
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

    // Méthode privée de validation
    private validateStrategyRanges(): void {
        // Validation des valeurs individuelles
        for (const range of this._strategyRanges) {
            if (range.minimum < 0) {
                throw new Error('Le minimum() ne peut pas être négatif');
            }
            if (range.maximum < range.minimum) {
                throw new Error('Le maximum() doit être supérieur ou égal au minimum()');
            }
            if (range.maximum > 100) {
                throw new Error('Le maximum() ne peut pas dépasser 100');
            }
        }

        // Validation des chevauchements
        const sortedRanges = [...this._strategyRanges].sort((a, b) => a.minimum - b.minimum);
        
        for (let i = 0; i < sortedRanges.length - 1; i++) {
            const currentRange = sortedRanges[i];
            const nextRange = sortedRanges[i + 1];
            
            if (currentRange.maximum > nextRange.minimum) {
                throw new Error(
                    `Chevauchement détecté entre les stratégies (${this.difficulty}) : ` +
                    `${StrategyTask[currentRange.task]} (${currentRange.minimum}-${currentRange.maximum}) et ` +
                    `${StrategyTask[nextRange.task]} (${nextRange.minimum}-${nextRange.maximum})`
                );
            }
        }

        // Validation optionnelle : vérifier que les plages couvrent exactement 0-100
        const hasGaps = sortedRanges.length > 0 && (
            sortedRanges[0].minimum > 0 ||
            sortedRanges[sortedRanges.length - 1].maximum < 100 ||
            sortedRanges.some((range, index) => 
                index > 0 && range.minimum > sortedRanges[index - 1].maximum
            )
        );

        if (hasGaps) {
            throw new Error('Les plages de stratégies doivent couvrir l\'ensemble des valeurs de 0 à 100 sans gaps');
        }
    }

    // Méthode pour ajouter une nouvelle stratégie
    public addStrategyRange(range: StrategyRange): void {
        const newRanges = [...this._strategyRanges, range];
        this._strategyRanges = newRanges;
        this.validateStrategyRanges();
    }

    // Méthode pour supprimer une stratégie
    public removeStrategyRange(task: StrategyTask): void {
        this._strategyRanges = this._strategyRanges.filter(range => range.task !== task);
    }

    // Retourne une stratégie aleatoire
    public getRandomStrategy(): StrategyTask {
        const random = Math.random() * 100;
        const rangeStrategy = this.strategyRanges
            .find(range => range.isInRange(random)) || this.strategyRanges[0];
        return rangeStrategy.task;
    }
}
import type Point from "$core/entity/board/Point.svelte";

// Calcul du nombre de cases à partir de la taille de la grille
export function countCellsFor(
    gridSize: Point
): number {
    return gridSize.x * gridSize.y
}

// Calcul du nombre max de participants (pouvant jouer 3 symboles) à partir du nombre de cases
export function calcMaxNbParticipantsFrom(
    numberOfCells: number
): number {
    return Math.floor(numberOfCells / 3)
}
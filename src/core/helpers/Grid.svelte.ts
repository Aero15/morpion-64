import type Point from "$core/entity/board/Point.svelte";

// Count the number of cells from the grid size
export function countCellsFor(
    gridSize: Point
): number {
    return gridSize.x * gridSize.y
}

// Calculation of the maximum number of participants (able to play 3 symbols) from the number of boxes
export function calcMaxNbParticipantsFrom(
    numberOfCells: number
): number {
    return Math.floor(numberOfCells / 3)
}
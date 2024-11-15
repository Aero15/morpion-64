import type Point from "$core/entity/board/Point.svelte";

export default interface IStrategicPositions {
    twoSymbolsPositions: Point[],
    oneSymbolPositions: Point[]
}
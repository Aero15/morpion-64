import type Point from "$core/entity/board/Point.svelte";

export default interface IWinnerInfo {
    symbol: string;
    color: string;
    positions: { x: number; y: number }[];
}
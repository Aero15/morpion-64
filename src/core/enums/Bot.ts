import Point from "$core/entity/board/Point.svelte"

// Delai de réponse des bots
export enum BotDelay {
    Slow = 0,
    Default = 1,
    Fast = 2,
}

// Configuration du temps de réponse des bots
export let slowBotSpeedDelay: Point = new Point(1800, 4000)
export let defaultBotSpeedDelay: Point = new Point(1500, 3000)
export let fastBotSpeedDelay: Point = new Point(500, 1500)
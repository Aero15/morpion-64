import Point from "$core/entity/board/Point.svelte"

// Bot response delay
export enum BotDelay {
    Slow = 0,
    Default = 1,
    Fast = 2,
}

// Settings for bots response delay (min, max) ms
export let slowBotSpeedDelay: Point = new Point(1800, 4000)
export let defaultBotSpeedDelay: Point = new Point(1500, 3000)
export let fastBotSpeedDelay: Point = new Point(300, 1500)
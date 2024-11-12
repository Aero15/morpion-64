import type Point from "$core/entity/game/Point.svelte"
import { BotDelay, slowBotSpeedDelay, defaultBotSpeedDelay, fastBotSpeedDelay } from "$core/enums/Bot"
import { botSpeedDelay } from "$core/store/settings.svelte"
import { get } from "svelte/store"

export function getBotSpeedDelay(): Point {
    const delay = get(botSpeedDelay)
    switch (delay) {
        case BotDelay.Slow:
            return slowBotSpeedDelay
        case BotDelay.Fast:
            return fastBotSpeedDelay
    }
    return defaultBotSpeedDelay
}
import type Point from "$core/entity/board/Point.svelte"
import { BotDelay, slowBotSpeedDelay, defaultBotSpeedDelay, fastBotSpeedDelay } from "$core/enums/Bot"
import { listPlayers } from "$core/store/players.svelte"
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

export function filterPlayerWith(
    search: string
) {
    return listPlayers.filter((p) => {
        const query = search.toLowerCase();
        return p.name.toLowerCase().includes(query) ||
            p.symbol.toLowerCase().includes(query)
    })
}
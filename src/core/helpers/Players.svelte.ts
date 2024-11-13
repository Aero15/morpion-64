import type Point from "$core/entity/board/Point.svelte"
import { BotDelay, slowBotSpeedDelay, defaultBotSpeedDelay, fastBotSpeedDelay } from "$core/enums/Bot"
import { listPlayers, selectedPlayers } from "$core/store/players.svelte"
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

// Effacer la liste des joueurs selectionnées
export function clearSelectedPlayers() {
    selectedPlayers.splice(0, selectedPlayers.length)
}

export function selectPlayerById(id: number) {
    const player = listPlayers.find(player => player.id === id)
    if (!player) return
    selectedPlayers.push(player)
}

export function removeSelectedPlayerById(id: number) {
    const index = selectedPlayers.findIndex(player => player.id === id)
    if (index < 0) return
    selectedPlayers.splice(index, 1)
}
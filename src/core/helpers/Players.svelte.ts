import { botSpeedDelay } from "$core/store/settings.svelte"
import type Player from "$core/entity/player/Player.svelte"
import type { Difficulty } from "$core/enums/Difficulty"
import type Point from "$core/entity/board/Point.svelte"
import Human from "$core/entity/player/Human.svelte"
import { PlayerType } from "$core/enums/PlayerType"
import Bot from "$core/entity/player/Bot.svelte"
import type { Symbol } from "$core/enums/Symbol"
import { get } from "svelte/store"
import {
    BotDelay, slowBotSpeedDelay,
    defaultBotSpeedDelay, fastBotSpeedDelay
} from "$core/enums/Bot"
import {
    listBots, listPlayers, selectedPlayers
} from "$core/store/players.svelte"



// Create a new human player
export function createHumanPlayer(
    name: string,
    symbol: Symbol,
    color: string,
) {
    // Check if the player already exists
    if (playerExists(name))
        return false

    // Create the player
    listPlayers.push(new Human(name, symbol, color))
    return true
}

// Create a new bot player
export function createBotPlayer(
    name: string,
    symbol: Symbol,
    color: string,
    difficulty: Difficulty
) {
    // Check if the player already exists
    if (playerExists(name))
        return false

    // Check if the name is valid
    if (name.length < 1)
        return false

    // Create the player
    listBots.push(new Bot(name, symbol, color, difficulty))
    return true
}

// Check if player exists
export function playerExists(name: string): boolean {
    const results = filterPlayerWith(name)
    return results.length > 0
}

// Delete a player by id
export function deletePlayerById(id: number) {
    // Find the player
    const player = findPlayerById(id)
    if (!player) return

    // Delete the player
    const type = player.type
    if (type === PlayerType.Human)
        listPlayers.splice(listPlayers.indexOf(player), 1)
    if (type === PlayerType.Bot)
        listBots.splice(listBots.indexOf(player), 1)
}

// Find a player by id
export function findPlayerById(
    id: number
): Player | Human | Bot | undefined {
    const players = [...listPlayers, ...listBots]
    const player = players.find(player => player.id == id)
    return player
}

// Update a player by id
export function updatePlayer(p: Player | Bot) {
    const player = findPlayerById(p.id)
    if (!player)
        return

    const { type, name, symbol, color, score } = p
    let index = -1
    if (type === PlayerType.Human) {
        index = listPlayers.indexOf(player)
        listPlayers[index].name = name
        listPlayers[index].symbol = symbol
        listPlayers[index].color = color
        listPlayers[index].score = score
    }
    if (type === PlayerType.Bot) {
        index = listBots.indexOf(player)
        listBots[index].name = name
        listBots[index].symbol = symbol
        listBots[index].color = color
        listBots[index].score = score;
        (listBots[index] as Bot).difficulty = (p as Bot).difficulty
    }
}

// Return current bot speed delay
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

// Return filtered list of players by username
export function filterPlayerWith(
    search: string
) {
    return filterListPlayersWith(search, [...listPlayers, ...listBots])
}

export function filterListPlayersWith(
    search: string,
    players: Player[],
) {
    return players.filter((p) => {
        const query = search.toLowerCase();
        return p.name.toLowerCase().includes(query) ||
            p.symbol.toLowerCase().includes(query)
    })
}

// Clear selected players
export function clearSelectedPlayers() {
    selectedPlayers.splice(0, selectedPlayers.length)
}

// Select a player by id
export function selectPlayerById(id: number) {
    // Try to find the player among humans
    let player = listPlayers.find(player => player.id === id)

    if (!player) {
        // Try to find the player among bots
        player = listBots.find(player => player.id === id)
    }

    // Abort if player not found
    if (!player) return

    // Select the player
    selectedPlayers.push(player)
}

// Remove a selected player by id
export function removeSelectedPlayerById(id: number) {
    const index = selectedPlayers.findIndex(player => player.id === id)
    if (index < 0) return
    selectedPlayers.splice(index, 1)
}
import type Player from "$core/entity/player/Player.svelte"
import Bot from "$core/entity/player/Bot.svelte"
import Human from "$core/entity/player/Human.svelte"
import { Color } from "$core/enums/Color"
import { Difficulty } from "$core/enums/Difficulty"
import { Symbol } from "$core/enums/Symbol"

// Selected players for a new game
export let selectedPlayers: Player[] = $state([])

// List of bots
export let listBots: Player[] = $state([
    new Bot("Cortana", Symbol.Hash, Color.Pink, Difficulty.Peaceful),
    new Bot("Alexa", Symbol.Square, Color.Blue, Difficulty.Easy),
    new Bot("Siri", Symbol.Circle, Color.Orange, Difficulty.Medium),
    new Bot("Bixbi", Symbol.Cloud, '#00ff00', Difficulty.Hard),
    new Bot("Jarvis", Symbol.Bot, Color.Red, Difficulty.Impossible)
])

// List of players
export let listPlayers: Player[] = $state([
    new Human("Zétoile ✨", Symbol.Asterisk, Color.Coral),
    new Human("Denise", Symbol.Tennis, Color.Lavender),
    new Human("Amogus", Symbol.Emoji, Color.Cyan),
    new Human("Dia Bête", Symbol.Heart, Color.Fuchsia),
    new Human("Squid", Symbol.Compass, Color.Teal),
])

// Fake scores
listPlayers[0].score = 483
listPlayers[1].score = 116
listPlayers[2].score = 590
listPlayers[3].score = 638
listPlayers[4].score = 1105

listBots[2].score = 32
listBots[4].score = 64
listBots[0].score = 128
listBots[3].score = 256
listBots[1].score = 512
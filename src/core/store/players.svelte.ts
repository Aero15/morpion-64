import Bot from "$core/entity/player/Bot.svelte"
import Human from "$core/entity/player/Human.svelte"
import type Player from "$core/entity/player/Player.svelte"
import { Color } from "$core/enums/Color"
import { Difficulty } from "$core/enums/Difficulty"
import { Symbol } from "$core/enums/Symbol"

// Liste des participants du jeu
export let selectedPlayers: Player[] = $state([])

// Liste des bots
export let listBots: Player[] = $state([
    new Bot("Cortana", Symbol.Percent, Color.Pink, Difficulty.Peaceful),
    new Bot("Alexa", Symbol.Square, Color.Blue, Difficulty.Easy),
    new Bot("Siri", Symbol.Circle, Color.Orange, Difficulty.Medium),
    new Bot("Bixbi", Symbol.Triangle, Color.Green, Difficulty.Hard),
    new Bot("Jarvis", Symbol.Bot, Color.Red, Difficulty.Impossible)
])

// Liste des joueurs
export let listPlayers: Player[] = $state([
    new Human("Zétoile ✨", Symbol.Asterisk, Color.Coral),
    new Human("Denise", Symbol.Tennis, Color.Lavender),
    new Human("Amogus", Symbol.Emoji, Color.Cyan),
    new Human("Dia Bête", Symbol.Heart, Color.Fuchsia),
    new Human("Squid", Symbol.Compass, Color.Teal),
])
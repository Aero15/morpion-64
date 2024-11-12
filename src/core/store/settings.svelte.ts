import Point from "$core/entity/game/Point.svelte"
import { BotDelay } from "$core/enums/Bot"
import { writable } from "svelte/store"

// Taille de la grille
export let gridSize: Point = new Point(5, 7)
export let minGridSize: Point = new Point(3, 3)
export let maxGridSize: Point = new Point(8, 8)

// Temps de réponse des bots (min et max)
export let botSpeedDelay = writable(BotDelay.Default)

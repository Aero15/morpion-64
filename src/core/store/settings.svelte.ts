import Point from "$core/entity/board/Point.svelte"
import { BotDelay } from "$core/enums/Bot"
import { writable } from "svelte/store"

// Grid size
export let gridSize: Point = new Point(5, 7)
export let minGridSize: Point = new Point(3, 3)
export let maxGridSize: Point = new Point(8, 8)

// Bot response delay
export let botSpeedDelay = writable(BotDelay.Fast)

// Language
export let language = $state({current: 'auto'})
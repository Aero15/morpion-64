import GameEngine from "$core/entity/engine/GameEngine.svelte";
import { selectedPlayers } from "$core/store/players.svelte";
import { gridSize } from "$core/store/settings.svelte";
import { push } from "svelte-spa-router";


// Create a new game
export function newGameWithSelectedPlayers(): GameEngine | null {
    // Abort if less than 2 players
    if (selectedPlayers.length < 2) {
        push('/')
        return null
    }
    
    // Create game with selected players
    return new GameEngine([
        ...selectedPlayers
    ], gridSize.x, gridSize.y);
}
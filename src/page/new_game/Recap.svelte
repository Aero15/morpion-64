<script lang="ts">
    import { listBots, selectedPlayers } from "$core/store/players.svelte";
    import { push } from "svelte-spa-router";
    import { onMount } from "svelte";
    import { countCellsFor, calcMaxNbParticipantsFrom } from "$core/helpers/Grid.svelte";
    import { gridSize, maxGridSize, minGridSize } from "$core/store/settings.svelte";

    let remainingBots = $derived(listBots.filter(bot => !selectedPlayers.includes(bot)))

    let strGridSize: string = $derived(gridSize.x + 'x' + gridSize.y);
    let countCells: number = $derived(countCellsFor(gridSize));
    let maxPlayers: number = $derived(calcMaxNbParticipantsFrom(countCells));

    onMount(() => {
        // GRID SIZE
        // Check if the grid size is valid
        if (
            gridSize.x < minGridSize.x || gridSize.y < minGridSize.y
         || gridSize.x > maxGridSize.x || gridSize.y > maxGridSize.y
        ) {
            return push('/new-game/grid')
        }

        // PLAYERS
        // Add a bot if only one player is selected
        if (selectedPlayers.length == 1 && remainingBots.length > 0) {
            selectedPlayers.push(remainingBots[0])
        }

        // Abort if less than 2 players, or more than max allowed
        let lessThan2Players = selectedPlayers.length < 2
        let moreThanMaxPlayers = selectedPlayers.length > maxPlayers
        if (lessThan2Players || moreThanMaxPlayers) {
            return push('/new-game/participants')
        }

        // Go to game
        push('/game')
    })
</script>
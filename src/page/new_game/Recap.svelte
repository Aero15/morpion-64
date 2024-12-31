<script lang="ts">
    import { listBots, selectedPlayers } from "$core/store/players.svelte";
    import { push } from "svelte-spa-router";
    import { onMount } from "svelte";

    let remainingBots = $derived(listBots.filter(bot => !selectedPlayers.includes(bot)))

    onMount(() => {
        // Add a bot if only one player is selected
        if (selectedPlayers.length == 1 && remainingBots.length > 0) {
            selectedPlayers.push(remainingBots[0])
        }

        // Abort if less than 2 players
        if (selectedPlayers.length < 2)
            return push('/new-game/participants')

        // Go to game
        push('/game')
    })
</script>
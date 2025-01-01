<script lang="ts">
    import { countCellsFor, calcMaxNbParticipantsFrom } from "$core/helpers/Grid.svelte";
    import { selectedPlayers } from "$core/store/players.svelte";
    import { gridSize } from "$core/store/settings.svelte";
    import Icon from "$lib/shared/Icon.svelte";

    let countCells: number = $derived(countCellsFor(gridSize));
    let maxPlayers: number = $derived(calcMaxNbParticipantsFrom(countCells));
    let iconStatus: string = $derived.by(() => {
        if (selectedPlayers.length > maxPlayers)
            return 'disable'
        if (selectedPlayers.length == 0)
            return 'warning'
        return 'check'
    });
</script>

<main class="bx-progressNbPlayers">
    <Icon icon={iconStatus} size={34} />

    <p class="text">
        <strong>{selectedPlayers.length}</strong>
        <span>/ {maxPlayers}</span>
    </p>
</main>

<style>
    .bx-progressNbPlayers {
        display: flex;
        align-items: center;
        gap: .75rem;

        p {
            margin: -.75em 0 0;

            strong {
                font-size: 2em;
                position: relative;
                top: .1em;
            }
        }
    }
</style>
<script lang="ts">
    import type Player from "$core/entity/player/Player.svelte";
    import ItemPlayer from "./ItemPlayer.svelte";

    interface Props {
        players: Player[],
        onPlayerClick?: (id: number) => void
    }

    let {
        players = $bindable<Player[]>([]),
        onPlayerClick = (id: number) => {},
    }: Props = $props();
</script>

<div class="grid">
    {#each players as { id, name, color, symbol, type } }
        <ItemPlayer
            { id } { name } { color } { symbol } { type }
            onclick={ onPlayerClick }
        />
    {/each}
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(120px, 1fr) );
        gap: 1rem;
        place-items: center start;
    }
</style>
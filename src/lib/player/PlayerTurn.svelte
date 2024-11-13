<script lang="ts">
    import type Player from "$core/entity/player/Player.svelte";
    import ItemPlayer from "./ItemPlayer.svelte";

    interface Props {
        players: Player[],
        currentTurn: number
    }

    let {
        players = $bindable<Player[]>([]),
        currentTurn = $bindable(-1)
    }: Props = $props();
</script>

<div class="grid">
    {#each players as { id, name, color, symbol, type }, index}
        {@const isCurrentPlayer = index === currentTurn}
        <div class="indicator" class:current={ isCurrentPlayer }>
            <ItemPlayer { id } { name } { color } { symbol } { type } />
        </div>
    {/each}
</div>

<style>
    .grid {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: wrap;
        gap: 1rem;
        padding: 1rem;
    }

    .indicator {
        transition: transform .2s;
        &.current {
            transform: scale(1.2);
        }

        &:not(.current) {
            opacity: .5;
        }
    }
</style>
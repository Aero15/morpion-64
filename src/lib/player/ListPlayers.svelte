<script lang="ts">
    import type Player from "$core/entity/player/Player.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import Responsive from "$lib/shared/Responsive.svelte";
    import ItemPlayer from "./ItemPlayer.svelte";

    interface Props {
        players: Player[],
        onPlayerClick?: (id: number) => void
    }

    let {
        players = $bindable<Player[]>([]),
        onPlayerClick = (id: number) => {},
    }: Props = $props();

    let size: BreakpointSize = $state('sm');
</script>

<Responsive bind:size />

<div class="grid"
    class:small={['sm', 'md'].includes(size)}
    class:large={!['sm', 'md'].includes(size)}
>
    {#each players as { id, name, color, symbol, type } }
        <ItemPlayer
            { id } { name } { color } { symbol } { type }
            onclick={ onPlayerClick }
            compact={['sm', 'md'].includes(size)}
        />
    {/each}
</div>

<style>
    .grid {
        display: grid;
        place-items: start stretch;

        &.small {
            grid-template-columns: repeat( auto-fill, minmax(70px, 1fr) );
        }

        &.large {
            grid-template-columns: repeat( auto-fill, minmax(130px, 1fr) );
        }
    }
</style>
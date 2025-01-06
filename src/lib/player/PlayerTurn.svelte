<script lang="ts">
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import type Player from "$core/entity/player/Player.svelte";
    import { improveContrast } from "$core/helpers/Colors.svelte";
    import ListBubbles from "./ListBubbles.svelte";

    interface Props {
        game: GameEngine,
        compact?: boolean,
        limit?: number
    }

    let {
        game = $bindable(new GameEngine([], 0, 0)),
        limit = $bindable(3),
        compact = $bindable(false)
    }: Props = $props();

    let players: Player[] = $derived(sort(game.players.players, game.players.currentTurn))
    let current: Player = $derived(players[0])

    let contrastColor = $derived.by(() => {
        return improveContrast(current.color);
    })

    let symbolColor = $derived.by(() => {
        let { light, dark } = contrastColor;
        return `light-dark(${light}, ${dark})`;
    })

    function sort(
        arr: Player[],
        index: number
    ): Player[] {
        // Split the elements before and after the index
        const beforeIndex = arr.slice(0, index);
        const afterIndex = arr.slice(index);
        return [...afterIndex, ...beforeIndex];
    }
</script>

<div class="bx-player_turn">
    <ListBubbles players={players} {compact} {limit} />

    <p style:--tint={symbolColor}>
        <strong>{ current.name }</strong>
    </p>
</div>

<style>
    .bx-player_turn {
        display: flex;
        flex-direction: column;
        align-items: start;

        p {
            background: var(--tint);
            padding: .25rem .5rem;
            border-radius: .5rem;
            color: light-dark(#fff, #000);
            margin: -.5rem 0 0;
            position: relative;
            z-index: 5;
            box-shadow: 0 3px 5px #00000033;
        }
    }
</style>
<script lang="ts">
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import type Player from "$core/entity/player/Player.svelte";
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

<div class="bx-player_turn" style:display="grid">
    <ListBubbles players={players} {compact} {limit} />
</div>
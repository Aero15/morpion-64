<script lang="ts">
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import type Player from "$core/entity/player/Player.svelte";
    import AvatarPlayer from "./AvatarPlayer.svelte";

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

<div class="bx-player_turn">
    <div class="bubbles">
        {#each players.slice(0, limit) as { name, color, symbol, type }, index}
            <div class="indicator" class:compact
                class:current={ index === 0 }
                style:z-index={ players.length - index }>
                <AvatarPlayer {compact} { name } { color } { symbol } { type }
                    tinted={ index === 0 } shape="circular" />
            </div>
        {/each}

        {#if players.length > limit}
            <div class="indicator remains" class:compact>
                <p><strong>+{ players.length - limit }</strong></p>
            </div>
        {/if}
    </div>
</div>

<style>
    .bx-player_turn {
        display: grid;
        gap: .25rem;

        .bubbles {
            display: flex;
            justify-content: start;
            align-items: stretch;

            .indicator {
                position: relative;
                transition: transform .2s;

                &:not(.current) {
                    &.compact {
                        margin-inline-start: -.5rem;
                    }
                    &:not(.compact) {
                        margin-inline-start: -1rem;
                    }
                }

                &.remains {
                    border: 1px solid light-dark(#aaa, #777);
                    background: light-dark(#e7e7e7, #3f3f3f);
                    aspect-ratio: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 100%;

                    p {
                        margin: 0;
                        font-size: 1.75em;
                    }

                    &.compact p {
                        font-size: 1.25em;
                    }
                }
            }
        }
    }
</style>
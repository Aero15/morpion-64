<script lang="ts">
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import type Player from "$core/entity/player/Player.svelte";
    import AvatarPlayer from "./AvatarPlayer.svelte";

    interface Props {
        game: GameEngine,
        compact?: boolean
    }

    let {
        game = $bindable(new GameEngine([], 0, 0)),
        compact = $bindable(false)
    }: Props = $props();

    let players: Player[] = $derived(sort(game.players.players, game.players.currentTurn))
    let names: string = $derived(listNames(players))

    function sort(
        arr: Player[],
        index: number
    ): Player[] {
        // Split the elements before and after the index
        const beforeIndex = arr.slice(0, index);
        const afterIndex = arr.slice(index);
        return [...afterIndex, ...beforeIndex];
    }

    function listNames(players: Player[]): string {
        if (players.length === 2) {
            return `${players[0].name} puis ${players[1].name}.`
        }

        if (players.length === 3) {
            return `${players[0].name}, suivis de ${players[1].name} et de ${players[2].name}.`
        }

        if (players.length > 3) {
            return `${players[0].name}, puis ${players[1].name}, suivis de ${players.length - 2} autres joueurs.`
        }

        return 'Error: configuration error'
    }
</script>

<div class="bx-player_turn">
    <div class="bubbles">
        {#each players.slice(0,3) as { name, color, symbol, type }, index}
            <div class="indicator" class:compact
                class:current={ index === 0 }
                style:z-index={ players.length - index }>
                <AvatarPlayer {compact} { name } { color } { symbol } { type } shape="circular" />
            </div>
        {/each}

        {#if players.length > 3}
            <div class="indicator remains" class:compact>
                <p><strong>+{ players.length - 3 }</strong></p>
            </div>
        {/if}
    </div>

    <p class="legend">{ names }</p>
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

        .legend {
            margin: 0;
            font-size: .78em;
        }
    }
</style>
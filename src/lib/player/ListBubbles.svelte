<script lang="ts">
    import type Player from "$core/entity/player/Player.svelte";
    import AvatarPlayer from "./AvatarPlayer.svelte";
    import { scale } from "svelte/transition";

    interface Props {
        players: Player[],
        compact?: boolean,
        limit?: number
    }

    let {
        players = [],
        compact = false,
        limit = 3
    }: Props = $props();
</script>
<main class="bx-avatar_bubbles">
    {#each players.slice(0, limit) as { id, name, color, symbol, type }, index}
        {#key id}
            <div class="indicator" class:compact
                class:current={ index === 0 }
                style:z-index={ players.length - index }
                in:scale|global={{delay: 50 * index}}>
                <AvatarPlayer {compact} { name } { color } { symbol } { type }
                    tinted shape="circular" />
            </div>
        {/key}
    {/each}

    {#if players.length > limit}
        {#key players[0].id}
            <div class="indicator remains" class:compact
                in:scale|global={{delay: 50 * (limit+1)}}>
                <p><strong>+{ players.length - limit }</strong></p>
            </div>
        {/key}
    {/if}
</main>

<style>
    .bx-avatar_bubbles {
        display: flex;
        justify-content: start;
        align-items: stretch;

        .indicator {
            position: relative;
            transition: transform .2s;

            &:not(.current) {
                &.compact {
                    margin-inline-start: -.5rem;
                    width: 3.5rem;
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
</style>
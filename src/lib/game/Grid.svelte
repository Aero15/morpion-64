<script lang="ts">
    import type Cell from "$core/entity/board/Cell.svelte";
    import Point from "$core/entity/board/Point.svelte";
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import Bot from "$core/entity/player/Bot.svelte";
    import CellView from "./Cell.svelte";

    interface Props {
        game: GameEngine
    }

    let {
        game = $bindable(new GameEngine([], 0, 0)),
    }: Props = $props();

    let botIsPlaying = $derived(game?.players.getCurrentPlayer() instanceof Bot)
    let lock = $derived(botIsPlaying || game.winnerInfo !== undefined || game.endTime !== undefined)
    let blur = $derived(!game.timer.isRunning && game.timer.seconds > 0 && game.endTime === undefined)
    let halo = $derived(game.endTime === undefined && botIsPlaying)

    function onCellClick(position: Point) {
        game.playMoveAt(position)
    }
</script>

<div
    class="grid"
    class:lock
    class:blur
    class:halo
>
    {#each game.board.grid as row, index}
        <div class="row" class:lock
            style:--index={index}
            style="grid-template-columns: repeat({ row.length }, 1fr);">
            {#each row as { position, symbol, color, highlighted }}
                <CellView
                    { position } { symbol }
                    { color } { lock }
                    { highlighted }
                    bind:eraserEnabled={game.eraserEnabled}
                    onClick={ onCellClick }
                />
            {/each}
        </div>
    {/each}
</div>

<style>
    @property --angle{
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
    }

    @keyframes spin{
        from{
            --angle: 0deg;
        }
        to{
            --angle: 360deg;
        }
    }

    div {
        display: grid;
        transition: all .3s;
        gap: .25rem;
    }

    .grid {
        --border-width: .5rem;
        --radius : 2rem;

        padding: 2rem;
        position: relative;
        border-radius: var(--radius);
        box-shadow: 0 5px 30px rgba(0,0,0,.3);

        &.lock {
            background: light-dark(#ffffffcc, #323232cc);
        }
        &:not(.lock) {
            background: light-dark(#fff, #323232);
        }

        &::after, &::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 100%;
            background-image: conic-gradient(
                from var(--angle),
                #ff4545, #00ff99,#006aff,
                #ff0095, #ff4545
            );
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            z-index: -1;
            opacity: 0;
            padding: 0;
            border-radius: calc(var(--radius) + var(--border-width));
            animation: 3s spin linear infinite;
            transition: opacity .2s, padding .2s;
        }

        &.halo {
            &::before, &::after {
                padding: var(--border-width);
            }
            &::before {
                opacity: 1;
            }
            &::after {
                opacity: .9;
                filter: blur(2.5rem);
            }
        }

        &.blur .row {
            filter: blur(2rem);
        }

        .row {
            position: relative;
            z-index: 1;
            transition: filter .3s;
            transition-delay: calc(var(--index, 0) * .025s);
        }
    }

    @media (prefers-color-scheme: dark) {
        .grid {
            box-shadow: 0 0 0 1px rgba(255,255,255,.3), 0 5px 30px rgba(0,0,0,.3);
        }
    }
</style>
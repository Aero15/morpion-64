<script lang="ts">
    import type Cell from "$core/entity/board/Cell.svelte";
    import Point from "$core/entity/board/Point.svelte";
    import CellView from "./Cell.svelte";

    interface Props {
        grid: Cell[][],
        lock?: boolean,
        eraserEnabled?: boolean,
        displayHalo?: boolean
        onCellClick?: (position: Point) => void
    }

    let {
        grid = $bindable<Cell[][]>(),
        lock = $bindable(false),
        displayHalo = $bindable(false),
        eraserEnabled = $bindable(false),
        onCellClick = () => {},
    }: Props = $props();
</script>

<div
    class="grid"
    class:lock
    class:halo={displayHalo}
>
    {#each grid as row}
        <div class="row" class:lock style="grid-template-columns: repeat({ row.length }, 1fr);">
            {#each row as { position, symbol, color, highlighted }}
                <CellView
                    { position } { symbol }
                    { color } { lock }
                    highlight={ highlighted }
                    bind:eraserEnabled
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
        gap: 0;

        &:not(.lock) {
            gap: 6px;
        }
    }

    .grid {
        --border-width: .5rem;
        --radius : 2rem;

        padding: 2rem;
        position: relative;
        background: #fff;
        border-radius: var(--radius);
        box-shadow: 0 5px 30px rgba(0,0,0,.3);

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

        .row {
            position: relative;
            z-index: 1;
        }
    }

    @media (prefers-color-scheme: dark) {
        .grid {
            background: #323232;
            box-shadow: 0 0 0 1px rgba(255,255,255,.3), 0 5px 30px rgba(0,0,0,.3);
        }
    }
</style>
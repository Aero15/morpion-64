<script lang="ts">
    import { calcMaxNbParticipantsFrom, countCellsFor } from "$core/helpers/Grid.svelte";
    import { gridSize } from "$core/store/settings.svelte";
    import Icon from "$lib/shared/Icon.svelte";

    let strGridSize: string = $derived(gridSize.x + 'x' + gridSize.y);
    let countCells: number = $derived(countCellsFor(gridSize));
    let maxPlayers: number = $derived(calcMaxNbParticipantsFrom(countCells));

    interface NumberData {
        value: string | number,
        icon: string,
        name: string
    }

    let gridOrientation: 'horizontal' | 'vertical' | 'squared' = $derived.by(() => {
        if (gridSize.x === gridSize.y)
            return 'squared'
        if (gridSize.x > gridSize.y)
            return 'horizontal'
        return 'vertical'
    });
</script>

<main class="bx-grid_stats"
    class:vertical={gridOrientation === 'horizontal'}
    class:horizontal={gridOrientation === 'vertical'}
    class:squared={gridOrientation === 'squared'}>
    <div class="display">
        <div class="board"
            style:grid-template-rows={`repeat(${gridSize.y}, 1fr)`}
            style:aspect-ratio={`${gridSize.x} / ${gridSize.y}`}
            class:horizontal={gridOrientation === 'horizontal'}
            class:vertical={gridOrientation === 'vertical'}
            class:squared={gridOrientation === 'squared'}
        >
            {#each { length: gridSize.y }, rank}
                <div class="row" style:grid-template-columns={`repeat(${gridSize.x}, 1fr)`}>
                    {#each { length: gridSize.x }, file}
                        <div class="cell"></div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>

    <ul class="numbers"
        class:vertical={gridOrientation === 'vertical'}
        class:horizontal={gridOrientation === 'horizontal' || gridOrientation === 'squared'}
    >
        {#snippet number_block(data: NumberData)}
            <li>
                <Icon icon={data.icon} size={22} />
                <div class="text">
                    <p class="value">{data.value}</p>
                    <p class="name"><strong>{data.name}</strong></p>
                </div>
            </li>
        {/snippet}

        {@render number_block({value: strGridSize, icon: "expand_diagonal", name: "Taille"})}
        {@render number_block({value: countCells, icon: "squares", name: "Cellules"})}
        {@render number_block({value: maxPlayers, icon: "user", name: "Joueurs max"})}
    </ul>
</main>

<style>
    .bx-grid_stats {
        display: flex;
        gap: 2rem;

        &.horizontal {
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        &.squared,
        &.vertical {
            flex-direction: column;
            align-items: stretch;
        }

        --max_size: 250px;

        .display {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .board {
            max-width: var(--max_size);
            max-height: var(--max_size);
            height: 100%;

            &.vertical,
            &.squared {
                height: var(--max_size);
            }

            &.horizontal {
                width: var(--max_size);
            }

            &, .row {
                display: grid;
                font-size: 0;
                gap: .25rem;
                margin: 0;
            }

            .row {
                flex: 1;
            }

            .cell {
                aspect-ratio: 1;
                border-radius: 25%;
                background: light-dark(#00000033, #ffffff33);
                border: 1px solid light-dark(#00000077, #ffffff77);
                backdrop-filter: blur(10px);
            }
        }

        .numbers {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;

            &.horizontal {
                margin: auto;
                max-width: 400px;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 1rem;
            }

            &.vertical {
                grid-template-rows: 1fr 1fr 1fr;
                gap: 2rem;
            }

            li {
                display: grid;
                gap: .25rem;
                text-align: center;
                place-items: center;

                --tint: red;

                &:nth-child(1) { --tint: light-dark(#ff9ee2, #cf0091); }
                &:nth-child(2) { --tint: light-dark(#b7e4ff, #288cff); }
                &:nth-child(3) { --tint: light-dark(#8affa2, #00a576); }
            }

            :global(.icon) {
                width: 2.5rem;
                aspect-ratio: 1;
                border-radius: 25%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--tint, light-dark(#00000033, #ffffff33));
                border: 1px solid light-dark(#00000077, #ffffff77);
                backdrop-filter: blur(10px);
            }

            p {
                margin: 0;

                &.name {
                    font-size: .8em;
                }

                &.value {
                    font-size: 1.5em;
                    margin-bottom: -.15em;
                }
            }
        }
    }
</style>
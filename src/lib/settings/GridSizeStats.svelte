<script lang="ts">
    import { calcMaxNbParticipantsFrom, countCellsFor } from "$core/helpers/Grid.svelte";
    import { gridSize } from "$core/store/settings.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import { _ } from "svelte-i18n";
    import { fade } from "svelte/transition";

    interface Props {
        large?: boolean
    }

    let {
        large = false
    }: Props = $props();

    let strGridSize: string = $derived(gridSize.x + 'x' + gridSize.y);
    let countCells: number = $derived(countCellsFor(gridSize));
    let maxPlayers: number = $derived(calcMaxNbParticipantsFrom(countCells));

    interface NumberData {
        value: string | number,
        icon: string,
        name: string
    }

    let nbAlignments = 3;
    let symbols = [
        'cross', 'circle', 'star', 'heart',
        'headset', 'arobase', 'square', 'cloud',
        'emoji', 'tennis_ball', 'planet', 'asterisk',
        'bot2', 'hash_straight', 'compass', 'moon',
        'circles', 'numbers', 'house', 'pin',
        'photo', 'send', 'search', 'position',
    ]

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
    class:squared={gridOrientation === 'squared'}
    style:--max_size={large ? '350px' : '250px'}
>
    <div class="display">
        <div class="board"
            style:grid-template-rows={`repeat(${gridSize.y}, 1fr)`}
            style:aspect-ratio={`${gridSize.x} / ${gridSize.y}`}
            class:horizontal={gridOrientation === 'horizontal'}
            class:vertical={gridOrientation === 'vertical'}
            class:squared={gridOrientation === 'squared'}
            class:large-text={gridSize.x < 6 && gridSize.y < 6}
        >
            {#each { length: gridSize.y }, rank}
                <div class="row" style:grid-template-columns={`repeat(${gridSize.x}, 1fr)`}>
                    {#each { length: gridSize.x }, file}
                        {@const counter = rank * gridSize.x + file + 1}
                        {@const symbol = Math.floor((rank * gridSize.x + file) / nbAlignments)}
                        <div class="cell">
                            <p class="position">
                                {#if rank == 0}
                                    {file + 1}
                                {:else if file == 0}
                                    {rank + 1}
                                {/if}
                            </p>
                            <p class="count">
                                {counter}
                            </p>
                            <p class="symbol">
                                {#if symbol < maxPlayers}
                                    <Icon icon={symbols[symbol]} size={20} />
                                {/if}
                            </p>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>

    <ul class="numbers"
        class:vertical={gridOrientation === 'vertical'}
        class:horizontal={gridOrientation === 'horizontal' || gridOrientation === 'squared'}
    >
        {#snippet number_block(data: NumberData, key: number, clazz: string = '')}
            <li in:fade|global={{delay: 50 * key + 350}} class={clazz}>
                <Icon icon={data.icon} size={22} />
                <div class="text">
                    <p class="value">{data.value}</p>
                    <p class="name"><strong>{data.name}</strong></p>
                </div>
            </li>
        {/snippet}

        {@render number_block({value: strGridSize, icon: "expand_diagonal", name: $_('settings.game_board.size')}, 0, 'size')}
        {@render number_block({value: countCells, icon: "squares", name: $_('settings.game_board.cells')}, 1, 'cells')}
        {@render number_block({value: maxPlayers, icon: "user", name: $_('settings.game_board.max_players')}, 2, 'players')}
    </ul>
</main>

<style>
    @keyframes gridRotate {
        0% { transform: rotateY(90deg); }
        100% { transform: rotateY(0deg); }
    }
    @keyframes bgBlur {
        0% { backdrop-filter: blur(0rem); }
        100% { backdrop-filter: blur(1rem); }
    }

    .bx-grid_stats {
        display: flex;

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
            perspective: 40rem;
        }

        .board {
            max-width: var(--max_size);
            max-height: var(--max_size);
            height: 100%;
            transform: rotateY(90deg);
            animation: .5s ease-out .25s 1 gridRotate forwards;
            animation-timing-function: cubic-bezier(.5,.9,.2,1.2);

            &.vertical,
            &.squared {
                height: var(--max_size);
            }

            &.horizontal {
                width: var(--max_size);
            }

            &, .row {
                display: grid;
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
                color: transparent;
                position: relative;
                animation: 5s ease-out 1.5s 1 bgBlur forwards;

                p {
                    position: absolute;
                    inset: 0;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: color .2s;
                }
            }

            &.large-text {
                .cell, :global(.icon::before) {
                    font-size: 2em;
                }
            }
            &:not(.large-text) .cell {
                font-size: 1em;
            }
        }

        .numbers {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;

            li {
                cursor: help;
            }

            &.horizontal {
                margin: auto;
                max-width: 400px;
                grid-template-columns: 1fr 1fr 1fr;
                gap: .5rem;
                margin-top: -1rem;

                li {
                    display: grid;
                    gap: .25rem;
                    text-align: center;
                    place-items: center;
                }
            }

            &.vertical {
                grid-template-rows: 1fr 1fr 1fr;
                gap: 1rem;
                margin-left: -1rem;

                li {
                    display: flex;
                    gap: 1rem;
                    text-align: start;
                    align-items: center;
                    justify-content: start;

                    p.value {
                        margin-top: -.25rem;
                    }
                }
            }

            li {
                --tint: red;
                &:nth-child(1) { --tint: light-dark(#ff9ee2, #cf0091); }
                &:nth-child(2) { --tint: light-dark(#b7e4ff, #288cff); }
                &:nth-child(3) { --tint: light-dark(#8affa2, #00a576); }
                &:nth-child(1):hover { --tint: light-dark(#ff5ecf, #ff33c2); }
                &:nth-child(2):hover { --tint: light-dark(#6fb2ff, #6fb2ff); }
                &:nth-child(3):hover { --tint: light-dark(#04d197, #04d197); }
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
                box-shadow: 0 2px 5px #00000044;
                transition: background .15s;
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

        &:has(li.size:hover) .cell p.position { color: light-dark(#000, #fff); }
        &:has(li.cells:hover) .cell p.count { color: light-dark(#000, #fff); }
        &:has(li.players:hover) .cell p.symbol { color: light-dark(#000, #fff); }
    }
</style>
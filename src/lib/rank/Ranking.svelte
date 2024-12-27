<script lang="ts">
    import type Player from "$core/entity/player/Player.svelte";
    import { PlayerType } from "$core/enums/PlayerType";
    import { improveContrast } from "$core/helpers/Colors.svelte";
    import Icon from "$lib/shared/Icon.svelte";

    interface Props {
        players: Player[],
        displayType?: boolean,
        tilesMode?: boolean
    }

    let {
        players = $bindable([]),
        displayType = $bindable(false),
        tilesMode = $bindable(false)
    }: Props = $props();

    let ranking = $derived(players.toSorted((a, b) => b.score - a.score))

    function improveColor(color: string) {
        let { light, dark } = improveContrast(color);
        return `light-dark(${light}, ${dark})`;
    }

    function formatScore(score: number) {
        return score.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }
</script>

<ul class="bx-ranking" class:tiles={tilesMode}>
    {#each ranking as { id, color, name, symbol, score, type }, index}
        <li>
            <a href="#/players/{id}"
                class:gold={index === 0}
                class:silver={index === 1}
                class:bronze={index === 2}>
                <p class="rank">
                    <strong>{index + 1}</strong>
                </p>

                <div class="identity">
                    <p style:color={index > 2 ? improveColor(color) : 'inherit'} class="symbol">
                        <Icon icon={symbol} size={ tilesMode ? 64 : 24} />
                    </p>
                    <p class="name">{name}</p>
                </div>

                <p class="score">
                    <strong>{formatScore(score)}</strong>
                    <span>pts</span>
                </p>
                
                {#if displayType}
                    <div class="type">
                        {#if type == PlayerType.Bot}
                            <Icon icon="bot" size={16} />
                            <p>Bot</p>
                        {/if}
                        {#if type == PlayerType.Human}
                            <Icon icon="user" size={16} />
                            <p>Humain</p>
                        {/if}
                    </div>
                {/if}
            </a>
        </li>
    {/each}
</ul>

<style>
    .bx-ranking {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: .25rem;

        &.tiles {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        }

        &:not(.tiles) {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }

        a {
            border: 1px solid transparent;
            border-radius: .5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: .25rem .75rem;
            text-decoration: none;
            color: inherit;
            transition: border-color .2s, background .2s;

            &.gold {
                background: linear-gradient(
                    to bottom,
                    light-dark(#ebce5a, #a48100),
                    light-dark(#f1eacf, #b89e34),
                    light-dark(#a89b67, #675719)
                );
            }
            &.silver {
                background: linear-gradient(
                    to bottom,
                    light-dark(#bcb79d, #625e4b),
                    light-dark(#f3f3f3, #808080),
                    light-dark(#a2a2a2, #3a3a3a)
                );
            }
            &.bronze {
                background: linear-gradient(
                    to bottom,
                    light-dark(#ed8852, #b3451d),
                    light-dark(#e8c4b0, #ba6232),
                    light-dark(#ae6548, #6b371e)
                );
            }

            &.gold, &.silver, &.bronze {
                border-color: light-dark(#00000055, #ffffff55);
                background-size: 105% 105%;
                background-position: center;
            }

            &:hover {
                &:not(.gold, .silver, .bronze) {
                    background: light-dark(#bf00ff55, #5ee7ff55);
                    border-color: light-dark(#00000099, #ffffff99);
                }

                &.gold, &.silver, &.bronze {
                    border-color: light-dark(#000000ff, #ffffffff);
                }
            }

            p {
                font-size: .8em;
                text-align: start;
                margin: 0;
            }

            .rank {
                min-width: 1.25rem;
                font-size: 1em;
            }

            .identity {
                display: flex;
                align-items: center;
                gap: .25rem;
                padding: .25rem 0;
                flex: 1;

                .symbol { font-size: 0; }
            }

            .type {
                display: flex;
                align-items: center;
                gap: .25rem;

                p {display: none;}
            }

            .score {
                text-align: end;
                strong {
                    font-size: 1.2em;
                }
            }

            &:not(.gold, .silver, .bronze) .score strong {
                background: linear-gradient(
                    to right,
                    light-dark(rgb(255, 0, 200), rgb(255, 145, 243)),
                    light-dark(rgb(0, 153, 255), cyan)
                );
                background-clip: text;
                color: transparent;
            }
        }

        &.tiles a {
            flex-direction: column;
            position: relative;
            aspect-ratio: 1;
            padding: .25rem;

            .rank, .score, .type, .identity .name {
                position: absolute;
                padding: .25rem .5rem;
            }

            .rank {
                inset: 0 auto auto 0;
            }

            .score {
                inset: 0 0 auto auto;
            }

            .type {
                inset: auto 0 0 auto;
                padding: .5rem;
            }

            .name {
                inset: auto auto 0 0;
            }

            .identity {
                flex-direction: column;
                justify-content: center;
            }

            &:not(.gold, .silver, .bronze):not(:hover) {
                background: light-dark(#ddd, #494949);
                border-color: light-dark(#00000055, #ffffff55);
            }
        }
    }
</style>
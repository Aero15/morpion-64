<script lang="ts">
    import Button from '$lib/form/Button.svelte';
    import Halo from '$lib/shared/Halo.svelte';
    import Icon from '$lib/shared/Icon.svelte';
    import { push } from 'svelte-spa-router';
    import { fade, scale } from 'svelte/transition';
    import favicon from '/favicon.svg';
    import Responsive from '$lib/shared/Responsive.svelte';
    import type { BreakpointSize } from '$core/enums/BreakpointSize';
    import PageWrap from '$lib/global/PageWrap.svelte';
    import { listBots, listPlayers, selectedPlayers } from '$core/store/players.svelte';
    import { gridSize } from '$core/store/settings.svelte';
    import ListBubbles from '$lib/player/ListBubbles.svelte';
    import Jumbo from '$lib/shared/Jumbo.svelte';
    import { _ } from 'svelte-i18n';

    interface Link {
        icon: string,
        label: string,
        path: string,
        variant?: string,
        iconSize?: number
    }
    let links: Link[] = $state([
        {icon: 'user', label: $_('home.manage_players'), path: '/players'},
        {icon: 'podium', label: $_('ranking.title'), path: '/ranking'},
        {icon: 'config', label: $_('settings.title'), path: '/settings'},
        {icon: 'info', label: $_('about.title'), path: '/about'},
    ])

    let size: BreakpointSize = $state('sm');
</script>

<Responsive bind:size />

{#if !['sm', 'md', 'lg'].includes(size)}
    <div id="homeJumbo">
        <Jumbo><div style:height="8rem"></div></Jumbo>
    </div>
{/if}

{#snippet link(
    icon: string, label: string,
    path: string, variant: string = "default",
    iconSize: number = 18
)}
    <Button onclick={() => push(path)} {variant}>
        <Icon {icon} size={iconSize} />
        <p>{label}</p>
    </Button>
{/snippet}

<PageWrap>
    <div in:fade id="pg-home" class:cols-2={['xl', '2xl'].includes(size)}>
        <div class="ident"
            class:align-center={['sm', 'md', 'lg'].includes(size)}
            class:align-right={['xl', '2xl'].includes(size)}
            in:scale={{delay: 150, duration: 500}}
        >
            <img src={favicon} alt={ $_('about.app_logo', { values: { name: 'Morpion 64' } }) } />
            {#if ['xl', '2xl'].includes(size)}
                <h1>Morpion <span>64</span></h1>
            {/if}
            <p class="catchphrase">
                <strong>{ $_('home.catchphrase') }</strong>
            </p>
            <p>{ $_('home.introduction') }</p>
        </div>

        <div class="tiles grid grid-cols-3" in:fade>
            {#snippet small_link(
                icon: string,
                iconSize: number,
                path: string,
                title: string,
                legend?: string,
            )}
                <a href={path} class="link-item">
                    <Icon {icon} size={iconSize} />

                    <div class="text">
                        {#if title.length > 0}
                            <p class="title"><strong>{title}</strong></p>
                        {/if}
                        {#if legend && legend.length > 0}
                            <p class="legend">{legend}</p>
                        {/if}
                    </div>
                </a>
            {/snippet}

            <div class="huge-block">
                <Halo visibleOnHover borderWidth="1rem" cornerRadius="1rem">
                    <div class="bx-tile huge">
                        {#if selectedPlayers.length >= 1}
                            <a href="#/new-game/recap" class="big-link">
                                <div class="head">
                                    <div class="text">
                                        <p class="title"><strong>{ $_('home.replay.title') }</strong></p>
                                        <p class="legend">{ $_('home.replay.legend') }</p>
                                    </div>
    
                                    <Icon icon="replay" size={['xl', '2xl'].includes(size) ? 80 : 46} />
                                </div>
    
                                <div class="foot">
                                    <ListBubbles players={selectedPlayers} compact />

                                    <div class="gridSize">
                                        <Icon icon="expand_diagonal" size={28} />
                                        <p>{gridSize.x}x{gridSize.y}</p>
                                    </div>
                                </div>
                            </a>
                        {:else}
                            <a href="#/new-game/grid" class="big-link">
                                <div class="head">
                                    <div class="text">
                                        <p class="title"><strong>{ $_('home.new_game.title') }</strong></p>
                                        <p class="legend">{ $_('home.new_game.legend') }</p>
                                    </div>
    
                                    <Icon icon="dice" size={['xl', '2xl'].includes(size) ? 80 : 46} />
                                </div>

                                <div class="foot">
                                    <div class="numbers">
                                        <div class="number-item humans">
                                            <div class="bubbles">
                                                <Icon icon="user" size={20} />
                                                <p class="count">{listPlayers.length}</p>
                                            </div>
                                            <p class="label">{ $_('players.sections.humans') }</p>
                                        </div>
                                        <div class="number-item bots">
                                            <div class="bubbles">
                                                <Icon icon="bot2" size={20} />
                                                <p class="count">{listBots.length}</p>
                                            </div>
                                            <p class="label">{ $_('players.sections.bots') }</p>
                                        </div>
                                    </div>

                                    <div class="gridSize">
                                        <Icon icon="expand_diagonal" size={28} />
                                        <p>{gridSize.x}x{gridSize.y}</p>
                                    </div>
                                </div>
                            </a>
                        {/if}
    
                        {#if selectedPlayers.length > 0 /*|| listBots.length > 1*/}
                            <div class="small-links">
                                {#if selectedPlayers.length > 0}
                                    {@render small_link(
                                        'play', 28, '#/new-game/participants',
                                        $_('home.new_game.title'),
                                        $_('home.replay.select_opponents')
                                    )}
                                {/if}
                                {@render small_link(
                                    'settings', 28, '#/new-game/grid',
                                    $_('home.change_settings.title'),
                                    $_('home.change_settings.legend')
                                )}
                            </div>
                        {/if}
                    </div>
                </Halo>
            </div>
            
            {#each links as {icon, label, path, variant, iconSize}}
                {@render link(icon, label, path, variant, iconSize)}
            {/each}
        </div>
    </div>
</PageWrap>

<style>
    #pg-home {
        display: flex;
        justify-content: center;

        display: grid;
        gap: 1rem;

        &.cols-2 {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            margin-top: -10rem;
        }
    }

    #homeJumbo :global(.jumbo) {
        --color_gradient: linear-gradient(
            to right,
            light-dark(#b6fffb, #005457),
            light-dark(#e2e2e2, #474747),
            light-dark(#9ec6ff, #00275e),
            light-dark(#e2e2e2, #474747),
            light-dark(#f8caf3, #5f0054)
        );
    }

    .ident {
        display: grid;
        gap: 0rem;
        place-content: start center;
        overflow: hidden;

        &.align-center {
            place-items: center;
            text-align: center;
        }

        &.align-right { 
            place-items: center;
            text-align: center;
        }

        img {
            max-width: clamp(100px, 16vw, 250px);
        }

        h1 {
            margin: 0;
            background: linear-gradient(to right, #00FFFF, #0099FF, #FF00FF);
            background-clip: text;
            color: transparent;
            font-size: clamp(1.5rem, 6vw, 5rem);
            margin-top: 2rem;

            span {
                font-family: Marianne-Light, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
            }
        }

        p {
            max-width: 400px;
            margin: 0;

            &.catchphrase {
                margin: 1rem 0 .25rem;
                font-size: clamp(.9rem, 2vw, 1rem);
            }

            &:not(.catchphrase) {
                font-size: clamp(.8rem, 2vw, .9rem);
            }
        }
    }

    .tiles {
        place-content: center;
        display: grid;
        gap: clamp(.5rem, 2vw, 1rem);
        grid-template-columns: 1fr 1fr 1fr;
        max-width: 500px;
        flex: 1 1 0;
        position: relative;
        z-index: 1;

        .huge-block {
            grid-column: 1/4;
            display: grid;
        }

        .bx-tile {
            border-radius: 1rem;
            overflow: clip;

            a {
                color: inherit;
                text-decoration: none;

                &:hover, &:focus-visible {
                    background: light-dark(#00000033, #ffffff33);
                }

                &:active {
                    background: light-dark(#00000055, #ffffff55);
                }
            }

            &.huge {
                background: light-dark(#93d4ff, #0078c8);
                background: linear-gradient(
                    to left,
                    light-dark(#b39eff, #6f00b9),
                    light-dark(#50b9ff, #005f9e),
                    light-dark(#93d4ff, #0078c8)
                );
                /*background: light-dark(#0078c8, #0078c8);
                background: linear-gradient(
                    to right bottom,
                    #caffde,
                    #fff,
                    #d2e5ff,
                    #fff,
                    #f3cfef
                );*/
                background-repeat: no-repeat;
                box-shadow: 0 3px 15px #00000033;

                .big-link {
                    display: flex;
                    flex-flow: column;
                    justify-content: space-between;
                    gap: 3rem;
                    padding: clamp(1rem, 2vw, 2rem);
                    min-height: clamp(8rem, 16vw, 12rem);

                    .head, .foot {
                        display: flex;
                        justify-content: space-between;
                    }

                    .head {
                        align-items: start;

                        p {
                            margin: 0;

                            &.title {
                                font-size: clamp(1.2em, 3vw, 2.5em);
                                margin-top: -.35em;
                            }

                            &.legend {
                                font-size: clamp(.8em, 3vw, .9em);
                            }
                        }
                    }

                    .foot {
                        align-items: end;

                        .gridSize {
                            display: flex;
                            flex-flow: column;
                            align-items: center;
                            gap: .5rem;
                            font-size: .9em;

                            p {
                                margin: -.5em 0 0;
                            }
                        }

                        .numbers {
                            display: flex;
                            align-items: center;
                            gap: 1.5rem;

                            .number-item {
                                display: flex;
                                flex-flow: column;
                                align-items: center;
                                text-align: center;
                                --tint: lime;

                                &.humans {
                                    --tint: light-dark(#ffa229, #d87a00);
                                }
                                &.bots {
                                    --tint: light-dark(#ff76f8, #d800cd);
                                }

                                .bubbles {
                                    display: flex;
                                    align-items: center;
                                    gap: .5rem;

                                    :global(.icon) {
                                        width: 2rem;
                                        aspect-ratio: 1;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        background: var(--tint);
                                        border-radius: 100%;
                                        border: 1px solid light-dark(#00000077, #ffffff77);
                                    }

                                    .count {
                                        font-size: 1.5rem;
                                    }
                                }

                                p {
                                    margin: 0;

                                    &.label {
                                        font-size: clamp(.8rem, 3vw, .9rem);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .small-links {
                display: grid;

                .link-item {
                    display: flex;
                    align-items: center;
                    padding: .75rem 1rem;
                    gap: .75rem;
                    border-top: 1px solid light-dark(#00000055, #ffffff55);
                    transition: background .2s;

                    .text {
                        p {
                            margin: 0;

                            &.title {font-size: .9em;}
                            &.legend {font-size: .8em;}
                        }
                    }
                }
            }
        }

        :global {
            /*.halo {
                grid-column: 1/4;
                aspect-ratio: 16/9;
                display: grid;
            }*/

            button {
                &:first-child {
                    grid-column: 1/4;
                    aspect-ratio: 16/9;

                    .icon,
                    .icon::before {
                        font-size: clamp(4rem, 10vw, 8rem);
                    }

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5rem;

                    .text {
                        text-align: end;
                    }

                    strong {
                        font-size: clamp(1.5rem, 6vw, 3rem);
                    }

                    p {
                        margin: .5rem 0;
                        font-size: .9rem;
                        max-width: 200px;
                    }
                }

                &:not(:first-child) {
                    aspect-ratio: 1;
                    display: grid;
                    gap: .25rem;
                    place-content: center;

                    .icon,
                    .icon::before {
                        font-size: clamp(2rem, 6vw, 3rem);
                    }
                }

                &:nth-child(2) {
                    grid-column: 1/3;
                    aspect-ratio: inherit;
                }

                p {
                    margin: 0;
                    font-size: .9rem;
                }
            }
        }
    }

    @media (prefers-color-scheme: light) {
        .ident h1 {
            background: linear-gradient(to right, #04d3d3, #0098ff, #f0f);
            background-clip: text;
        }
    }
</style>
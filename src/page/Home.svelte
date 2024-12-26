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

    interface Link {
        icon: string,
        label: string,
        path: string,
        variant?: string,
        iconSize?: number
    }
    let links: Link[] = [
        {icon: 'user', label: 'Gérer les joueurs', path: '/players'},
        {icon: 'podium', label: 'Classement', path: '/ranking'},
        {icon: 'config', label: 'Réglages', path: '/settings'},
        {icon: 'info', label: 'Infos', path: '/about'},
    ]

    let size: BreakpointSize = $state('sm');
</script>

<Responsive bind:size />

{#snippet link(
    icon: string, label: string,
    path: string, variant: string = "",
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
            <img src={favicon} alt="Logo de Morpion 64" />
            {#if ['xl', '2xl'].includes(size)}
                <h1>Morpion <span>64</span></h1>
            {/if}
            <p>
                <strong>Plus grand, plus fun, plus stratégique !</strong>
                Choisis ta couleur, ton symbole et défie tes amis,
                ou joue contre des bots sur des grilles de 3x3 à 8x8.
            </p>
        </div>

        <div class="tiles grid grid-cols-3" in:fade>
            <Halo>
                <Button variant="primary" onclick={ () => push('/opponents') }>
                    <div class="text">
                        <strong>Jouer !</strong>
                        {#if ['xl', '2xl'].includes(size)}
                            <p>Lancer une nouvelle partie entre amis ou des bots</p>
                        {/if}
                    </div>
                    <Icon icon="play" />
                </Button>
            </Halo>
            
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
            padding-top: 5rem;
        }
    }

    .ident {
        display: grid;
        gap: 0rem;
        place-content: center;
        overflow: hidden;

        &.align-center {
            place-items: center;
            text-align: center;
        }

        &.align-right { 
            place-items: end;
            text-align: end;
        }

        img {
            max-width: clamp(100px, 16vw, 200px);
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
            font-size: clamp(.9rem, 2vw, 1rem);
        }
    }

    .tiles {
        place-content: center;
        display: grid;
        gap: clamp(.5rem, 2vw, 1rem);
        grid-template-columns: 1fr 1fr 1fr;
        max-width: 500px;
        flex: 1 1 0;

        :global {
            .halo {
                grid-column: 1/4;
                aspect-ratio: 16/9;
                display: grid;
            }

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
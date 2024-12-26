<script lang="ts">
    import favicon from '/favicon.svg';
    import Icon from "$lib/shared/Icon.svelte";
    import { fade, slide } from 'svelte/transition';
    import { location, pop } from "svelte-spa-router";
    import { app_version } from '$core/store/application';
    import Responsive from '$lib/shared/Responsive.svelte';
    import type { BreakpointSize } from '$core/enums/BreakpointSize';
    
    let size: BreakpointSize = $state('sm');

    interface Page {
        name: string,
        path: string,
        icon: string,
    }

    const pages: Page[] = [
        //{name: 'Accueil', path: '/', icon: 'home'},
        {name: 'Jouer', path: '/opponents', icon: 'play'},
        //{name: 'Podium', path: '/podium', icon: 'podium'},
        {name: 'Joueurs', path: '/players', icon: 'user'},
        {name: 'Réglages', path: '/settings', icon: 'config'},
        {name: 'A propos', path: '/about', icon: 'info'},
    ]
</script>

<Responsive bind:size />

<header
    class:center={size == 'sm'}
    class:floating={['xl', '2xl'].includes(size)}>
    <div class="start">
        {#if $location != '/'}
            <button class="goBack" onclick={pop} transition:slide={{axis: 'x', duration: 200}}>
                <Icon icon="arrow_left" size={22} />
            </button>
        {/if}
        
        <a class="identity" href="#/">
            <h1>Morpion <span>64</span></h1>
            <img src={favicon} alt="Logo de Morpion 64" />
        </a>
    </div>

    {#if ['xl', '2xl'].includes(size)}
        <nav in:fade>
            <ul>
                {#each pages.slice(0, 3) as {name, path, icon}}
                    <li>
                        <a href={'#' + path} class:current={$location == path || $location.includes(path)}>
                            <Icon {icon} size={18} />
                            <p>{name}</p>
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    {/if}

    {#if size != 'sm'}
        <div class="version" in:fade>
            <p><a href="#/about">Version : <strong>{$app_version}</strong></a></p>
        </div>
    {/if}
</header>

<style>
    header {
        --padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        overflow: clip;
        margin: 0 auto;
        padding: 0 var(--padding);
        max-width: calc(1280px - var(--padding) * 2);
        border-bottom: 1px solid light-dark(#cfcfcf, #444);

        &.center {
            justify-content: center;
        }

        &:not(.center) {
            justify-content: space-between;
        }

        &.floating {
            --padding: 2rem;
            background: light-dark(#e9e9e9, #252525);
            border: 1px solid light-dark(#a3a3a3, #666);
            max-width: calc(1280px - var(--padding) * 2);
            padding: 0 var(--padding);
            border-radius: 10rem;
            position: absolute;
            inset: 1rem 0 auto 0;
        }

        .start {
            display: flex;
            align-items: stretch;
            justify-content: start;
            flex: 1;

            button {
                border: none;
                padding: 1rem;
                aspect-ratio: 1;
                cursor: pointer;
                transition: background .2s;

                &:first-child {
                    margin-left: calc(var(--padding) * -1);
                    padding: 1rem 1rem 1rem 1.5rem;
                    aspect-ratio: auto;
                }
            }

            .identity {
                display: flex;
                align-items: center;
                justify-content: start;
                gap: .5rem;
                color: inherit;
                text-underline-offset: 3px;
                transition: transform .2s;
                padding: .75rem 0;

                img {
                    --size: 28px;
                    width: var(--size);
                    height: var(--size);
                }

                h1 {
                    margin: 0;
                    font-size: 1.5rem;
                    background: linear-gradient(to right, rgb(157, 82, 255), rgb(0, 153, 255), cyan);
                    background-clip: text;
                    color: transparent;
                    padding-bottom: 4px;

                    span {
                        font-family: Marianne-Light, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
                    }
                }

                &:hover {
                    text-decoration: underline;
                    text-decoration-thickness: 2px;
                }

                &:active {
                    transform: scale(1);
                }
            }
        }

        &.center .start {
            justify-content: center;
            flex: 1;
        }

        nav {
            flex: 2;
            ul {
                margin: 0;
                padding: 0;
                list-style: none;
                display: flex;
                justify-content: center;

                li {
                    a {
                        display: flex;
                        align-items: center;
                        gap: .5rem;
                        text-decoration: none;
                        color: inherit;
                        padding: 0 1rem;
                        transition: all .2s;

                        &:hover {
                            background: linear-gradient(to top, light-dark(#ccc, #444), transparent);
                            box-shadow: inset 0 -2px 0 light-dark(#777, #777);
                        }

                        &.current {
                            background: light-dark(#d7d7d7, #444);
                            box-shadow: inset 0 -3px 0 light-dark(#000, #fff);
                        }
                    }
                }
            }
        }

        .version {
            margin: 0;
            font-size: .9em;
            flex: 1;
            text-align: right;

            a {
                color: inherit;
                padding: 1rem 0;

                &:hover {
                    text-decoration: underline;
                    text-underline-offset: 4px;
                }
            }
        }
    }
</style>
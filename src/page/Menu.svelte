<script lang="ts">
    import logo from '/favicon.svg';
    import Icon from "$lib/shared/Icon.svelte";
    import Roller from "$lib/shared/Roller.svelte";
    import { app_name } from "$core/store/application";
    import Jumbo from '$lib/shared/Jumbo.svelte';

    interface PageItem {
        name: string
        icon: string
        path: string
    }

    function Page(
        path: string,
        icon: string,
        title: string,
    ) {
        return {
            name: title,
            icon: icon,
            path: path
        }
    }

    let width: number
    let sections: PageItem[] = [
        Page('/opponents', 'play', 'Jouer'),
        Page('/players', 'user', 'Joueurs'),
        Page('/ranking', 'podium', 'Classement'),
    ]
    let other_pages: PageItem[] = [
        //Page('/', 'home', 'Accueil'),
        Page('/settings', 'settings', 'Paramètres'),
        Page('/about', 'info', 'A propos'),
    ]
</script>

<svelte:window bind:innerWidth={width} />

<main id="pg-menu">
    <Jumbo>
        <div class="ident">
            <a href="#/">
                <img src={logo} class="logo"
                    alt={ `Logo de ${$app_name}` }
                    title={ `Logo de ${$app_name}` }
                />
                <h1>{$app_name}</h1>
            </a>
        </div>
    </Jumbo>

    <Roller delay={1}>
        <div
            class="pages-tiles"
            class:grid-cols-3={width > 320 && width < 420}
            class:grid-cols-4={width > 420 && width < 520}
            class:grid-cols-5={width > 520}
        >
            {#each sections as {name, icon, path}}
                <a href={`#${path}`}>
                    <Icon {icon} size={18} />
                    <p>{ name }</p>
                </a>
            {/each}
        </div>
    </Roller>

    <Roller delay={2}>
        <div class="pages-list">
            {#each other_pages as {name, icon, path}}
                <a href={`#${path}`}>
                    <Icon {icon} size={18} />
                    <p>{ name }</p>
                </a>
            {/each}
        </div>
    </Roller>
</main>

<style>
    #pg-menu {
        padding-bottom: 1rem;

        a {
            text-decoration: none;
            color: inherit;
        }

        p {
            margin: 0;
        }

        .ident {
            a {
                display: flex;
                overflow: hidden;
                gap: 1rem;
                justify-content: center;
                align-items: center;
                width: 100%;
                flex-flow: column;
                margin: -3rem -1rem;
                padding: 3rem 1rem;

                img {
                    max-height: 7rem;
                }

                h1 {
                    font-size: 1.25rem;
                    line-height: 1.75rem;
                    margin: 0;
                }
            }
        }

        .pages-tiles,
        .pages-list {
            max-width: 500px;
            margin: auto;
        }

        .pages-tiles {
            display: grid;
            padding: 1.5rem 1.5rem 1rem;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            max-width: 36rem;

            &.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            &.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            &.grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }

            a {
                display: grid;
                padding: 0.5rem 1rem;
                gap: 0.5rem;
                justify-items: center;
                align-items: center;
                text-align: center;

                :global(.icon) {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 56px;
                    aspect-ratio: 1;
                    border-radius: 100%;
                    background: light-dark(#ddd, #474747);
                    transition: background .2s;
                }

                p {
                    overflow: hidden;
                    width: 100%;
                    font-size: 0.75rem;
                    line-height: 1.25rem;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                &:hover, &:active {
                    :global(.icon) {
                        background: light-dark(rgb(173, 20, 173), cyan);
                        color: light-dark(#fff, #000);
                    }
                }
            }
        }

        .pages-list {
            display: grid;
            max-width: 36rem;
            padding-top: 1rem;

            a {
                display: flex;
                padding: 1rem 2.25rem;
                gap: 0.5rem;
                justify-content: flex-start;
                align-items: center;
                text-align: center;
                transition: background .2s;

                &:hover, &:active {
                    background: light-dark(#c4c4c4, #525252);
                }

                p {
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                }
            }
        }
    }
</style>
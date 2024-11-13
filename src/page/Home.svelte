<script lang="ts">
    import Button from '$lib/form/Button.svelte';
    import Icon from '$lib/shared/Icon.svelte';
    import { push } from 'svelte-spa-router';
    import { fade } from 'svelte/transition';

    interface Link {
        icon: string,
        label: string,
        path: string,
        variant?: string,
        iconSize?: number
    }
    let links: Link[] = [
        {icon: 'dice', label: 'Nouvelle partie', path: '/opponents', variant: 'primary', iconSize: 100},
        {icon: 'user', label: 'Gérer les joueurs', path: '/players'},
        {icon: 'podium', label: 'Podium', path: '/podium'},
        {icon: 'config', label: 'Paramètres', path: '/settings'},
        {icon: 'info', label: 'Infos', path: '/about'},
    ]
</script>

{#snippet link(
    icon: string, label: string,
    path: string, variant: string = "",
    iconSize: number = 48
)}
    <Button onclick={() => push(path)} {variant}>
        <Icon {icon} size={iconSize} />
        <p>{label}</p>
    </Button>
{/snippet}

<main in:fade>
    <div class="ident">
        <Icon icon="joystick" size={200} />
        <h1>Morpion <span>64</span></h1>
        <p>
            <strong>Un jeu de morpion sans limites !</strong>
            Choisis ta couleur, ton symbole et défie tes amis,
            ou joue contre des bots sur des grilles de 3x3 à 8x8.
        </p>
    </div>
    <div class="tiles grid grid-cols-3">
        {#each links as {icon, label, path, variant, iconSize}}
            {@render link(icon, label, path, variant, iconSize)}
        {/each}
    </div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        padding: clamp(1rem, 4vw, 3rem);

        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
    }

    .ident {
        display: grid;
        gap: 0rem;
        place-content: center;
        place-items: end;
        text-align: end;

        h1 {
            margin: 0;
            background: linear-gradient(to right, #00FFFF, #0099FF, #FF00FF);
            background-clip: text;
            color: transparent;
            font-size: 5rem;
            margin-top: 2rem;

            span {
                font-family: Marianne-Light, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
            }
        }

        p {
            max-width: 400px;
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
            button {
                &:first-child {
                    grid-column: 1/4;
                    aspect-ratio: 16/9;

                    .icon,
                    .icon::before {
                        font-size: clamp(4rem, 10vw, 7rem);
                    }

                    p {
                        margin: .5rem 0;
                        font-size: clamp(1rem, 4vw, 2rem);
                    }
                }

                &:not(:first-child) {
                    aspect-ratio: 1;
                    display: grid;
                    gap: .25rem;
                    place-content: center;
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
<script lang="ts">
    import { location } from "svelte-spa-router";
    import Icon from "$lib/shared/Icon.svelte";
    import { _ } from "svelte-i18n";
</script>

{#snippet item(
    name: string,
    path: string,
    icon: string,
)}
    <li>
        <a href={'#' + path} class:current={$location == path}>
            <Icon {icon} size={18} />
            <p>{name}</p>
        </a>
    </li>
{/snippet}

<nav>
    <ul>
        {@render item($_('home.title'), '/', 'home')}
        {@render item($_('players.title'), '/players', 'user')}
        {@render item($_('assistant.play'), '/new-game/participants', 'play')}
        {@render item($_('ranking.title'), '/ranking', 'podium')}
        {@render item($_('common.menu'), '/menu', 'menu')}
    </ul>
</nav>

<style>
    nav {
        position: fixed;
        inset: auto 0 0;
        background: light-dark(#e9e9e9, #252525);
        border-top: 1px solid light-dark(#cfcfcf, #353535);
        display: flex;
        justify-content: center;
        z-index: 5;

        ul {
            margin: 0;
            padding: 0;
            max-width: 700px;
            list-style: none;
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            flex: 1;
        }

        a {
            display: grid;
            padding: .75rem .25rem;
            flex: 1;
            gap: .25rem;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: inherit;

            &.current {
                box-shadow: 0 -3px 0 light-dark(#000, #fff) inset;
            }

            &:hover,
            &:focus-visible {
                background: light-dark(#cfcfcf, #444);
            }

            &:focus-visible {
                outline: 3px solid light-dark(blue, cyan);
                outline-offset: 3px;
            }
        }

        p {
            margin: 0;
            width: 100%;
            font-size: 0.75rem;
            line-height: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
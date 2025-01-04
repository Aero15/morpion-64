<script lang="ts">
    import type IPaginationItem
        from "$core/interface/IPaginationItem";
    import Icon from "$lib/shared/Icon.svelte";
    import { rt_newGame } from "$core/routes";
    import { push } from "svelte-spa-router";
    import { _ } from "svelte-i18n";

    interface Props {
        compact?: boolean,
        selectedIndex?: number
    }

    let {
        compact = false,
        selectedIndex = 0
    }: Props = $props();

    let nb = 0
    let pages: IPaginationItem[] = $state([
        //{ variant: 'number', title: 'Règles de jeu', number: ++nb, path: '/rules' },
        { variant: 'number', title: $_('assistant.grid_size.title'), number: ++nb, path: '/grid' },
        { variant: 'number', title: $_('assistant.participants.title'), number: ++nb, path: '/participants' },
        { variant: 'icon', title: $_('assistant.play'), icon: 'play', path: '/recap' },
    ])
</script>

<nav class="bx-pagination" class:compact>
    {#each pages as { variant, title, number, icon, path }, index}
        <button { title }
            class:selected={selectedIndex === index}
            onclick={() => push(rt_newGame + path)}
        >
            {#if variant === 'number' && number}
                <p class:compact>{number}</p>
            {:else if variant === 'icon' && icon}
                <Icon {icon} size={ compact ? 20 : 24 } />
            {/if}
        </button>
    {/each}
</nav>

<style>
    .bx-pagination {
        display: flex;
        align-items: center;
        justify-content: start;

        &.compact {
            gap: .5rem;
            button {
                width: 2.75rem;
            }
        }
        &:not(.compact) {
            gap: 1rem;
            button {
                width: 3.5rem;
            }
        }

        button {
            box-shadow: 0 0 5px #00000011, 0 5px 10px #00000022;
            border: 1px solid light-dark(#00000055, #ffffff55);
            background: light-dark(#ffffff55, #ffffff33);
            backdrop-filter: blur(15px);
            aspect-ratio: 1;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: inherit;
            transition: background .2s, transform .2s;
            cursor: pointer;

            p {
                margin: 0;

                &.compact {
                    font-size: 1.5em;
                    margin-top: -.15rem;
                }
                &:not(.compact) {
                    font-size: 2em;
                    margin-top: -.25rem;
                }
            }

            &:hover {
                background: light-dark(#fff, #ffffff66);
            }

            &:active {
                transform: scale(1.3);
            }

            &.selected {
                background: light-dark(#0051ff, #fff);
                color: light-dark(#fff, #000);
            }
        }
    }
</style>
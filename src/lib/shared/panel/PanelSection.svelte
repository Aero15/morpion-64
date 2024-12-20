<script lang="ts">
    import type { Snippet } from "svelte";
    import Icon from "../Icon.svelte";
    import { slide } from "svelte/transition";
    import Button from "$lib/form/Button.svelte";

    interface Props {
        children: Snippet,
        icon?: string,
        title: string,
        variant?: string, // default - tinted - transparent
        open?: boolean,
    }

    let {
        children,
        icon = '',
        title = '',
        variant = 'default',
        open = $bindable(true)
    }: Props = $props();
</script>

<section class="bx-panel_section"
    class:default={variant === 'default'}
    class:tinted={variant === 'tinted'}
    class:transparent={variant === 'transparent'}
>
    <button class="head" onclick={() => open = !open}>
        <div class="ident">
            {#if icon}
                <Icon {icon} size={18} />
            {/if}
            <p>{title}</p>
        </div>

        <div class="arrow" class:open>
            <Icon icon="dropdown" size={18} />
        </div>
    </button>

    {#if open}
        <div class="bx-content" transition:slide>
            {@render children()}
        </div>
    {/if}
</section>

<style>
    .bx-panel_section {
        display: grid;
        transition: background .2s;

        button.head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: transparent;
            padding: 1rem;
            border: none;
            gap: 1rem;
            cursor: pointer;
            font-family: inherit;
            transition: background .2s;

            .ident {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: .5rem;

                p {
                    margin: 0;
                    position: relative;
                    top: -1px;
                }
            }

            .arrow {
                transition: transform .2s;
            }
            .arrow.open {
                transform: rotate(180deg);
            }
        }

        &.default {
            --start-gradient: light-dark(#e2e2e2, #505050);
            --end-gradient: transparent;
            background: linear-gradient(
                to bottom,
                var(--start-gradient),
                var(--end-gradient)
            ), var(--end-gradient);
            background-size: 100% 40px;
            background-repeat: repeat-x;

            &:hover {
                --end-gradient: light-dark(#f0f0f0, #333);
            }
        }

        &.tinted {
            --start-gradient: light-dark(#9cd6ff, #0B334E);
            --end-gradient: light-dark(#cfebff, #124d75);
            background: linear-gradient(
                to bottom,
                var(--start-gradient),
                var(--end-gradient)
            ), var(--end-gradient);
            background-size: 100% 40px;
            background-repeat: repeat-x;
            border-top: 1px solid light-dark(#75afda, #1b7cbd);

            &:hover {
                --end-gradient: light-dark(#d6f3ff, #0a5481);
            }

            button.head:hover {
                background: light-dark(#aeddff, #2f6386);
            }
        }

        &.transparent:hover {
            background: light-dark(#f8e9fd, #3a2a3d);
        }

        &.default,
        &.transparent {
            button.head:hover {
                background: light-dark(#f3d1ff, #694a6e);
            }
        }

        .bx-content {
            display: grid;
        }
    }
</style>
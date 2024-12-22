<script lang="ts">
    import type { Snippet } from "svelte";
    import { slide } from "svelte/transition";
    import Icon from "./Icon.svelte";

    interface Props {
        children: Snippet,
        icon?: string,
        title: string,
        subtitle?: string,
        variant?: string, // default - transparent
        open?: boolean,
    }

    let {
        children,
        icon = '',
        title = '',
        subtitle = '',
        variant = 'default',
        open = $bindable(true)
    }: Props = $props();
</script>

<section class="bx-collapse"
    class:default={variant === 'default'}
    class:transparent={variant === 'transparent'}
>
    <button class="head" onclick={() => open = !open}>
        <div class="ident">
            {#if icon}
                <Icon {icon} size={28} />
            {/if}

            <div class="text">
                <p class="title"><strong>{title}</strong></p>
                {#if subtitle}
                    <p class="subtitle">{subtitle}</p>
                {/if}
            </div>
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
    .bx-collapse {
        display: grid;
        overflow: clip;
        border-radius: 1rem;
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
            position: relative;
            z-index: 1;

            .ident {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                text-align: start;
                gap: .5rem;

                p {
                    margin: 0;
                    position: relative;
                    top: -1px;

                    &.title {
                        font-size: 1.1em;
                        font-weight: 500;
                    }

                    &.subtitle {
                        font-size: .78em;
                        opacity: .8;
                    }
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
            border: 1px solid light-dark(#aaa, #666);

            .bx-content {
                border-top: 1px solid light-dark(#aaa, #666);
            }

            button.head {
                background: light-dark(#e0e0e0, #373737);
            }

            &:hover {
                --end-gradient: light-dark(#f0f0f0, #333);
            }
        }

        &.transparent {
            &:hover {
                background: light-dark(#f8e9fd, #3a2a3d);
            }

            button.head {
                padding: 5px;
            }
        }

        &.default,
        &.transparent {
            button.head:hover {
                background: light-dark(#d7dfff, #34454d);
            }
        }

        .bx-content {
            display: grid;
        }
    }
</style>
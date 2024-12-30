<script lang="ts">
    import Icon from "./Icon.svelte";
    import type { Snippet } from "svelte";
    import Responsive from "./Responsive.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import { fade } from "svelte/transition";

    interface Props {
        icon?: string
        title?: string
        subtitle?: string
        orientation?: 'vertical' | 'horizontal'
        children?: Snippet
    }

    let { 
        icon = $bindable(''),
        title = $bindable(''),
        subtitle = $bindable(''),
        orientation = $bindable('horizontal'),
        children = undefined
    }: Props = $props();

    let size: BreakpointSize = $state('sm');
</script>

<Responsive bind:size />

<div class="jumbo gradient-grid" class:overlap={['xl', '2xl'].includes(size)}>
    <div class="content">
        {#if icon.length > 0 || title.length > 0 || subtitle.length > 0}
            <div class="identity"
                in:fade|global={{delay: 200, duration: 250}}
                class:horizontal={orientation == 'horizontal'}
                class:vertical={orientation == 'vertical'}
            >
                {#if icon.length > 0}
                    <Icon { icon } size={ 70 } />
                {/if}

                <div class="text" style:--ajust_margin_top={ subtitle.length > 0 ? '-.75rem' : '-.25rem' }>
                    {#if title.length > 0}
                        <h2>{ title }</h2>
                    {/if}
                
                    {#if subtitle.length > 0}
                        <p class="subtitle">{ subtitle }</p>
                    {/if}
                </div>
            </div>
        {/if}
    
        {#if children}
            <div class="children" in:fade|global={{delay: 200, duration: 250}}>
                {@render children()}
            </div>
        {/if}
    </div>
</div>

<style>
    .jumbo {
        background-position: center -1px;

        box-shadow:
            0 -1px 0 light-dark(
                rgba(0,0,0,.3),
                rgba(255,255,255,.3)
            ) inset,
            0 3px 30px light-dark(
                rgba(0,0,0,.3),
                rgba(255,255,255,.15)
            );
        padding: 1rem;
        transition: padding .3s;

        .content {
            max-width: 1280px;
            margin: 0 auto;
            padding: 1.5rem 0;
            display: grid;
            gap: 2rem;
        }

        &.overlap {
            padding-top: 84px;

            .content {
                padding: 2rem 0;
            }
        }

        .identity {

            &.vertical {
                display: grid;
                text-align: center;
            }

            &.horizontal {
                gap: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;

                .text {
                    margin-top: var(--ajust_margin_top, 0);
                }
            }


            h2 {
                margin: 0;
                font-size: clamp(1.5rem, 6vw, 2rem);
            }

            .subtitle {
                font-size: .8rem;
                margin: 0;
            }
        }
    }
</style>
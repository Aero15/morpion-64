<script lang="ts">
    import Icon from "./Icon.svelte";
    import type { Snippet } from "svelte";
    import Responsive from "./Responsive.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";

    interface Props {
        icon?: string
        title?: string
        subtitle?: string
        children?: Snippet
    }

    let { 
        icon = $bindable(''),
        title = $bindable(''),
        subtitle = $bindable(''), 
        children = undefined
    }: Props = $props();

    let size: BreakpointSize = $state('sm');
</script>

<Responsive bind:size />

<div class="jumbo" class:overlap={['xl', '2xl'].includes(size)}>
    <div class="content">
        {#if icon.length > 0 || title.length > 0 || subtitle.length > 0}
            <div class="identity">
                {#if icon.length > 0}
                    <Icon { icon } size={ 70 } />
                {/if}
        
                {#if title.length > 0}
                    <h2>{ title }</h2>
                {/if}
            
                {#if subtitle.length > 0}
                    <p class="subtitle">{ subtitle }</p>
                {/if}
            </div>
        {/if}
    
        {#if children}
            <div class="children">
                {@render children()}
            </div>
        {/if}
    </div>
</div>

<style>
    .jumbo {
        --tint: light-dark(#8dcfea, #183cf1);
        background: linear-gradient(
            to right,
            light-dark(#e1adff, #7202a7),
            light-dark(#79c0ff, #005b97),
            light-dark(#8dead9, #00916c)
        );
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
        /*transition: padding .2s;*/

        .content {
            max-width: 1280px;
            margin: 0 auto;
            padding: 1.5rem 0;
            display: grid;
            gap: 2rem;
        }

        &.overlap {
            padding-top: 88px;

            .content {
                padding: 2rem 0;
            }
        }

        .identity {
            text-align: center;

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
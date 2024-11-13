<script lang="ts">
    import type { Snippet } from "svelte";
    import Icon from "./Icon.svelte";
    import { scale } from "svelte/transition";

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

        children,
    }: Props = $props();
</script>

<main class="hero" in:scale={{duration: 250}}>
    <div class="head">
        {#if icon.length > 0}
            <Icon { icon } size={ 80 } />
        {/if}

        {#if title.length > 0}
            <h2>{ title }</h2>
        {/if}
    
        {#if subtitle.length > 0}
            <p class="subtitle">{ subtitle }</p>
        {/if}
    </div>

    {#if children}
        {@render children()}
    {/if}
</main>

<style>
    .hero {
        --tint: #b9d4e7;
        background: linear-gradient(to bottom, var(--tint), transparent);
        background-size: 100% 200px;
        background-repeat: repeat-x;
        border: 1px solid var(--tint);
        border-radius: 2rem;
        padding: 2rem;

        display: grid;
        gap: 2rem;

        h2 {
            font-size: 2.5rem;
            margin: 0;
            margin-top: -.8rem;
        }

        .subtitle {
            font-size: 1rem;
            margin: 0;
        }
    }

    @media (prefers-color-scheme: dark) {
        .hero {
            --tint: #2F76A6;
        }
    }
</style>
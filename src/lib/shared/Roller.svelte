<script lang="ts">
    import { createRawSnippet, type Snippet } from "svelte";

    interface Props {
        delay?: number,
        children: Snippet
    }

    let {
        delay = 0,
        children
    }: Props = $props();
</script>

<main class="bx-roller" style:--delay={delay * 70 + 'ms'}>
    {@render children()}
</main>

<style>
    .bx-roller {
        --delay: 0s;
        animation: reveal .5s forwards;
        animation-iteration-count: 1;
        animation-delay: var(--delay);
        padding-top: 100px;
        opacity: 0;
    }

    @keyframes reveal {
        0% {
            padding-top: 100px;
            opacity: 0;
        }
        100% {
            padding-top: 0;
            opacity: 1;
        }
    }
</style>
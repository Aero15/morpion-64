<script lang="ts">
    import type { Snippet } from 'svelte';
    interface Props { children: Snippet }
    let { children }: Props = $props();
</script>

<main class="page-wrap">
    {@render children()}
</main>

<style>
    .page-wrap {
        max-width: 1280px;
        margin-inline: auto;
        padding: 1rem;
    }
</style>
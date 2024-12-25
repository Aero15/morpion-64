<script lang="ts">
    import type { Snippet } from "svelte";
    interface Props { children: Snippet }
    let { children }: Props = $props();
</script>

<div class="bx-radio_group">
    {@render children()}
</div>

<style>
    .bx-radio_group {
        display: grid;
        gap: .5rem;
    }
</style>
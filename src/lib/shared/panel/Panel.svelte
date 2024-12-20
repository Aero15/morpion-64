<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet
    }

    let { children }: Props = $props();
</script>

<div class="bx-panel">
    {@render children()}
</div>

<style>
    .bx-panel {
        display: grid;
        border-radius: 20px;
        overflow: clip;
        border: 1px solid light-dark(#00000033 ,#ffffff33);
        background: light-dark(#fff, #323232);
        box-shadow: 0 15px 30px rgba(0,0,0,.25),
            0 0 10px rgba(0,0,0,.15);
    }
</style>
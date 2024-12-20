<script lang="ts">
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import SearchInput from "$lib/form/SearchInput.svelte";
    import Responsive from "./Responsive.svelte";

    interface Props {
        value?: string,
        placeholder?: string
    }

    let {
        value = $bindable(''),
        placeholder = ''
    }: Props = $props();

    let size: BreakpointSize = $state('sm');
</script>

<Responsive bind:size />

<div class="bx-search-bar"
    class:thick={!['sm'].includes(size)}>
    <SearchInput bind:value {placeholder} />
</div>

<style>
    .bx-search-bar {
        display: grid;
        max-width: 600px;
        margin: auto;
        margin-top: -1.5rem;
        padding: 0 1rem;

        &.thick {
            margin-top: -2rem;
        }
    }
</style>
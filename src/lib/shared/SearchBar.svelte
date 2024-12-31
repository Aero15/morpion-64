<script lang="ts">
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import SearchInput from "$lib/form/SearchInput.svelte";
    import Responsive from "./Responsive.svelte";

    interface Props {
        value?: string,
        placeholder?: string,
        overlap?: boolean,
        thick?: boolean
    }

    let {
        value = $bindable(''),
        placeholder = '',
        overlap = false,
        thick = false
    }: Props = $props();

    let size: BreakpointSize = $state('sm');
</script>

<Responsive bind:size />

<div class="bx-search-bar"
    class:overlap
    class:thick={!['sm'].includes(size) && thick}>
    <SearchInput bind:value {placeholder} {thick} />
</div>

<style>
    .bx-search-bar {
        display: grid;
        max-width: 600px;
        padding: 0 1rem;

        &.overlap {
            margin: auto;
            margin-top: -1.5rem;

            &.thick {
                margin-top: -2rem;
            }
        }
    }
</style>
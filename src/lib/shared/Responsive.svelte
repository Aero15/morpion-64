<script lang="ts">
    import { type BreakpointSize, breakpoints } from "$core/enums/BreakpointSize";

    interface Props {
        size: BreakpointSize
    }
    let { size = $bindable('sm') } : Props = $props();

    let windowWidth = $state(0);

    function getCurrentBreakpoint(width: number): BreakpointSize {
        if (width < breakpoints.sm) return 'sm';
        if (width < breakpoints.md) return 'md';
        if (width < breakpoints.lg) return 'lg';
        if (width < breakpoints.xl) return 'xl';
        return '2xl';
    }

    $effect(() => {
        size = getCurrentBreakpoint(windowWidth);
    })
</script>

<svelte:window bind:innerWidth={windowWidth} />
<script lang="ts">
    import { routes } from "$core/routes";
    import Header from "$lib/global/Header.svelte";
    import NavBar from "$lib/global/NavBar.svelte";
    import Router, { location } from "svelte-spa-router";
    import Responsive from "$lib/shared/Responsive.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";

    let size: BreakpointSize = $state('sm');
</script>

<main class="bx-app"
    class:small-width={['sm', 'md'].includes(size) && $location != '/game'}>
    <Responsive bind:size />

    {#if $location != '/game'}
        <Header />
    {/if}

    <Router { routes } />

    {#if ['sm', 'md', 'lg'].includes(size) && $location != '/game'}
        <NavBar />
    {/if}
</main>

<style>
    .bx-app {
        &.small-width {
            padding-top: 51px;
            padding-bottom: 64px;
        }
    }
</style>

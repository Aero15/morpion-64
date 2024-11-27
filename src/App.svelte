<script lang="ts">
    import { routes } from "$core/routes";
    import Router from "svelte-spa-router";
    import Header from "$lib/global/Header.svelte";
    import NavBar from "$lib/global/NavBar.svelte";
    import Responsive from "$lib/shared/Responsive.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";

    let size: BreakpointSize = $state('sm');
</script>

<main>
    <Responsive bind:size />

    <Header />

    <Router { routes } />

    {#if ['sm', 'md', 'lg'].includes(size)}
        <NavBar />
    {/if}
</main>

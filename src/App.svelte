<script lang="ts">
    import { routes } from "$core/routes";
    import { isLoading } from 'svelte-i18n';
    import Header from "$lib/global/Header.svelte";
    import NavBar from "$lib/global/NavBar.svelte";
    import Router, { location } from "svelte-spa-router";
    import Responsive from "$lib/shared/Responsive.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import LoadingI18n from "$lib/global/LoadingI18n.svelte";
    import I18n from "$lib/global/I18n.svelte";

    let size: BreakpointSize = $state('sm');

    let paths = ['/game', '/new-game']
    let inGame = $derived.by(() => paths.find(path => $location.startsWith(path)) !== undefined);
</script>

<I18n />

{#if $isLoading}
    <LoadingI18n />
{:else}
    <main class="bx-app"
        class:small-width={['sm', 'md'].includes(size) && !inGame}>
        <Responsive bind:size />

        {#if !inGame}
            <Header />
        {/if}

        <Router { routes } />

        {#if ['sm', 'md', 'lg'].includes(size) && !inGame}
            <NavBar />
        {/if}
    </main>
{/if}

<style>
    .bx-app {
        &.small-width {
            padding-top: 51px;
            padding-bottom: 64px;
        }
    }
</style>

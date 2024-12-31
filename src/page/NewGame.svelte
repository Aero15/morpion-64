<script lang="ts">
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import NavigButtons from "$lib/new-game/NavigButtons.svelte";
    import { routes_newGame, rt_newGame } from "$core/routes";
    import Responsive from "$lib/shared/Responsive.svelte";
    import Router, { push } from "svelte-spa-router";
    import { slide } from "svelte/transition";

    interface Props {
        params: {section?: string}
    }

    let { params }: Props = $props();

    let size: BreakpointSize = $state('sm');
    let showFixedNavigButtons = $derived(['sm', 'md'].includes(size));
    let pageIndex = $state(0);

    $effect(() => {
        // Redirect to the grid page if no section is selected
        if (!params || !params.section) {
            push('/new-game/grid')
            return
        }

        // Select pagination
        switch (params.section) {
            case 'grid': pageIndex = 0; break;
            case 'participants': pageIndex = 1; break;
            case 'recap': pageIndex = 2; break;
        }
    })
</script>

<Responsive bind:size />

<main id="pg-newGame"
    class:showFixedNavigButtons>
    {#if !['sm', 'md'].includes(size)}
        <div class="side-pane gradient-grid"
            in:slide|global={{axis: 'x'}}></div>
    {/if}

    <Router
        routes={ routes_newGame }
        prefix={ rt_newGame } />

    {#if showFixedNavigButtons}
        <NavigButtons fixed noLabels index={pageIndex} />
    {/if}
</main>

<style>
    #pg-newGame {
        .side-pane {
            width: 50vw;
            position: fixed;
            inset: 0 auto 0 0;
            z-index: -1;
            background-position: center center;
            box-shadow: -1px 0 0 light-dark(#00000055, #ffffff55) inset,
                0 5px 30px rgba(0,0,0,.3);
        }

        & > :global(main) {
            flex: 1;
        }

        &.showFixedNavigButtons {
            padding-bottom: 65px;
        }
    }

    @media (width >= 768px) {
        #pg-newGame {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;

            :global(.page-wrap) {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4rem;
                align-items: center;
                padding: 1rem 4rem;
            }
        }
    }
</style>
<script lang="ts">
    import { slide } from "svelte/transition";
    import TabBar from "$lib/shared/TabBar.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import Responsive from "$lib/shared/Responsive.svelte";
    import Pagination from "$lib/new-game/Pagination.svelte";
    import GridSizeStats from "$lib/settings/GridSizeStats.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import GridPresetSelector from "$lib/settings/GridPresetSelector.svelte";

    let size: BreakpointSize = $state('sm');

    let Tabs = {
        Preview: 0,
        Settings: 1
    }
    let tabs = [
        { name: 'Aperçu', icon: 'search', id: Tabs.Preview },
        { name: 'Réglages', icon: 'settings', id: Tabs.Settings },
    ]
    let selectedId = $state(Tabs.Preview);
</script>

<Responsive bind:size />

<main id="pg-gridSize">
    {#if ['sm', 'md'].includes(size)}
        <div class="ng-head outside gradient-grid">
            <Pagination compact />
            <h1>Grille de jeu</h1>

            <div class="tabs">
                <TabBar tabs={tabs} bind:selectedId />
            </div>
        </div>
    {/if}

    <PageWrap>
        {#if selectedId == Tabs.Preview || !['sm', 'md'].includes(size)}
            <div class="preview" in:slide={{duration: 200}}>
                {#if !['sm', 'md'].includes(size)}
                    <div class="head inside">
                        <Pagination />
                        <h1>Grille de jeu</h1>
                    </div>
                {/if}

                <GridSizeStats />
            </div>
        {/if}

        {#if selectedId == Tabs.Settings || !['sm', 'md'].includes(size)}
            <div class="settings" in:slide={{duration: 200}}>
                <GridPresetSelector large />
                <!-- TODO: [checkbox] Ne plus jamais demander -->
            </div>
        {/if}
    </PageWrap>
</main>
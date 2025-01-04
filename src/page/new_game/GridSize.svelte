<script lang="ts">
    import { _ } from "svelte-i18n";
    import { fade } from "svelte/transition";
    import TabBar from "$lib/shared/TabBar.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import Responsive from "$lib/shared/Responsive.svelte";
    import Pagination from "$lib/new-game/Pagination.svelte";
    import NavigButtons from "$lib/new-game/NavigButtons.svelte";
    import GridSizeStats from "$lib/settings/GridSizeStats.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import GridPresetSelector from "$lib/settings/GridPresetSelector.svelte";

    let size: BreakpointSize = $state('sm');

    let Tabs = {
        Preview: 0,
        Settings: 1
    }
    let tabs = $state([
        { name: $_('settings.title'), icon: 'settings', id: Tabs.Settings },
        { name: $_('common.preview'), icon: 'search', id: Tabs.Preview },
    ])
    let selectedId = $state(Tabs.Settings);
</script>

<Responsive bind:size />

<main id="pg-gridSize">
    {#snippet head(outside: boolean = false)}
        <div class="ng-head"
            class:outside class:inside={!outside}
            class:gradient-grid={outside}
        >
            <Pagination compact />
            <h1>{ $_('assistant.grid_size.title') }</h1>

            {#if outside}
                <div class="tabs">
                    <TabBar tabs={tabs} bind:selectedId />
                </div>
            {/if}
        </div>
    {/snippet}

    {#if ['sm', 'md'].includes(size)}
        {@render head(true)}
    {/if}

    <PageWrap>
        {#if selectedId == Tabs.Preview || !['sm', 'md'].includes(size)}
            <div class="preview ng-paneContent" in:fade={{duration: 250}}>
                {#if !['sm', 'md'].includes(size)}
                    {@render head(false)}
                {/if}

                <GridSizeStats large={!['sm', 'md'].includes(size)} />

                {#if !['sm', 'md'].includes(size)}
                    <NavigButtons />
                {/if}
            </div>
        {/if}

        {#if selectedId == Tabs.Settings || !['sm', 'md'].includes(size)}
            <div class="settings" in:fade={{duration: 250}}>
                <GridPresetSelector large />
                <!-- TODO: [checkbox] Ne plus jamais demander -->
            </div>
        {/if}
    </PageWrap>
</main>
<script lang="ts">
    import { _ } from "svelte-i18n";
    import Jumbo from "$lib/shared/Jumbo.svelte";
    import TabBar from "$lib/shared/TabBar.svelte";
    import Section from "$lib/shared/Section.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import Responsive from "$lib/shared/Responsive.svelte";
    import type Point from "$core/entity/board/Point.svelte";
    import GridSizeStats from "$lib/settings/GridSizeStats.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import LanguageSelector from "$lib/settings/LanguageSelector.svelte";
    import GridPresetSelector from "$lib/settings/GridPresetSelector.svelte";
    import BotResponseDelaySelector from "$lib/settings/BotResponseDelaySelector.svelte";

    let size: BreakpointSize = $state('sm');
    let Tabs = {
        GridSize: 0,
        ResponseTime: 1,
        Language: 2,
    }
    let selectedId = $state(Tabs.GridSize);
</script>

<Responsive bind:size />

<Jumbo icon="config" title={ $_('settings.title') }>
    <span></span>
</Jumbo>

<div class="tabs">
    <TabBar variant="rounded" bind:selectedId tabs={[
        { name: $_('settings.game_board.title'), icon: 'layout', id: Tabs.GridSize },
        { name: $_('settings.bot_response_time.title'), icon: 'clock', id: Tabs.ResponseTime },
        { name: $_('settings.language.title'), icon: 'i18n', id: Tabs.Language },
    ]} />
</div>

<PageWrap>
    <div id="pg-settings">
        {#if selectedId == Tabs.GridSize}
            <Section title={ $_('settings.game_board.title') }>
                <div class="grid grid-size">
                    <GridSizeStats large={['xl', '2xl'].includes(size)} />
                    <GridPresetSelector large />
                </div>
            </Section>
        {/if}

        {#if selectedId == Tabs.ResponseTime}
            <div class="response-time">
                <div>
                    <Section title={ $_('settings.bot_response_time.title') }>
                        <BotResponseDelaySelector />
                    </Section>
                </div>
            </div>
        {/if}

        {#if selectedId == Tabs.Language}
            <div class="language"><div>
                <Section title={ $_('settings.language.title') }>
                    <LanguageSelector />
                </Section>
            </div></div>
        {/if}
    </div>
</PageWrap>

<style>
    #pg-settings {
        display: flex;
        flex-direction: column;
    }
    .grid { display: grid; }

    .grid-size {
        gap: 1rem;
    }

    .tabs {
        margin: -2rem 0;
    }

    .response-time,
    .language {
        display: flex;
        justify-content: center;
        div { max-width: 600px; flex: 1; }
    }

    @media (width >= 400px) {
        .grid-size {
            grid-template-columns: repeat( auto-fit, minmax(400px, 1fr) );
            align-items: center;
        }
    }

    @media (width >= 850px) {
        .grid-size :global(.bx-grid_stats) {
            order: 2;
        }
    }
</style>
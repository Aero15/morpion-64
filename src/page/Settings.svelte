<script lang="ts">
    import {
        BotDelay,
        defaultBotSpeedDelay,
        fastBotSpeedDelay,
        slowBotSpeedDelay
    } from "$core/enums/Bot";
    import {
        botSpeedDelay
    } from "$core/store/settings.svelte";
    import Radio from "$lib/form/Radio.svelte";
    import Jumbo from "$lib/shared/Jumbo.svelte";
    import Section from "$lib/shared/Section.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import RadioGroup from "$lib/form/RadioGroup.svelte";
    import type Point from "$core/entity/board/Point.svelte";
    import GridSizeStats from "$lib/settings/GridSizeStats.svelte";
    import GridPresetSelector from "$lib/settings/GridPresetSelector.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import Responsive from "$lib/shared/Responsive.svelte";
    import TabBar from "$lib/shared/TabBar.svelte";
  import LanguageSelector from "$lib/settings/LanguageSelector.svelte";

    let size: BreakpointSize = $state('sm');
    let Tabs = {
        GridSize: 0,
        ResponseTime: 1,
        Language: 2,
    }
    let tabs = [
        { name: 'Plateau de jeu', icon: 'layout', id: Tabs.GridSize },
        { name: 'Temps de réponse', icon: 'clock', id: Tabs.ResponseTime },
        { name: 'Langue', icon: 'i18n', id: Tabs.Language },
    ]
    let selectedId = $state(Tabs.GridSize);

    function speedToText(speed: Point): string {
        return `Entre ${speed.x / 1000} et ${speed.y / 1000} secondes`;
    }
</script>

<Responsive bind:size />

<Jumbo icon="config" title="Réglages">
    <span></span>
</Jumbo>

<div class="tabs">
    <TabBar tabs={tabs} bind:selectedId variant="rounded" />
</div>

<PageWrap>
    <div id="pg-settings">
        {#if selectedId == Tabs.GridSize}
            <Section title="Dimension du plateau">
                <div class="grid grid-size">
                    <GridSizeStats large={['xl', '2xl'].includes(size)} />
                    <GridPresetSelector large />
                </div>
            </Section>
        {/if}

        {#if selectedId == Tabs.ResponseTime}
            <div class="response-time">
                <div>
                    <Section title="Comportement des bots">
                        <p style:margin="0 0 .5rem"><strong>Delai de réponse</strong></p>
                        
                        <RadioGroup>
                            <Radio bind:group={$botSpeedDelay}
                                label="Lent" value={BotDelay.Slow}
                                description={ speedToText(slowBotSpeedDelay) } />
        
                            <Radio bind:group={$botSpeedDelay}
                                label="Normal" value={BotDelay.Default}
                                description={ speedToText(defaultBotSpeedDelay) } />
        
                            <Radio bind:group={$botSpeedDelay}
                                label="Rapide" value={BotDelay.Fast}
                                description={ speedToText(fastBotSpeedDelay) } />
                        </RadioGroup>
                    </Section>
                </div>
            </div>
        {/if}

        {#if selectedId == Tabs.Language}
            <Section title="Langue">
                <LanguageSelector />
            </Section>
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

    .response-time {
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
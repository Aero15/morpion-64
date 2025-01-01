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

    function speedToText(speed: Point): string {
        return `Entre ${speed.x / 1000} et ${speed.y / 1000} secondes`;
    }
</script>

<Jumbo icon="config" title="Réglages" />

<PageWrap>
    <div class="grid page">
        <Section title="Dimension du plateau">
            <div style="display: grid; gap: 1rem">
                <GridSizeStats />
                <GridPresetSelector large />
            </div>
        </Section>

        <Section title="Comportement des bots" delay={1}>
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
</PageWrap>

<style>
    .grid { display: grid; }
    .page { gap: clamp(.5rem, 8vw, 4rem); }

    @media (width >= 400px) {
        .page {
            grid-template-columns: repeat( auto-fit, minmax(400px, 1fr) );
        }
    }
</style>
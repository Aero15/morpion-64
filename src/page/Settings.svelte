<script lang="ts">
    import {
        BotDelay,
        defaultBotSpeedDelay,
        fastBotSpeedDelay,
        slowBotSpeedDelay
    } from "$core/enums/Bot";
    import {
        calcMaxNbParticipantsFrom, countCellsFor
    } from "$core/helpers/Grid.svelte";
    import {
        botSpeedDelay, gridSize, maxGridSize, minGridSize
    } from "$core/store/settings.svelte";

    import Slider from "$lib/form/Slider.svelte";
    import Section from "$lib/shared/Section.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import { calcAvg } from "$core/helpers/Math.svelte";
    import RadioGroup from "$lib/form/RadioGroup.svelte";
    import type Point from "$core/entity/board/Point.svelte";
    import Jumbo from "$lib/shared/Jumbo.svelte";
    import Radio from "$lib/form/Radio.svelte";



    let numberOfCells = $derived(countCellsFor(gridSize));
    let maxNbParticipants = $derived(calcMaxNbParticipantsFrom(numberOfCells));
    let botDelay = $derived.by(getBotSpeedDelay)
    let avgResponseTimeMs: number = $derived(parseInt(calcAvg(botDelay.toArray()).toFixed(0)));
    let avgResponseTimeScd = $derived((avgResponseTimeMs / 1000).toFixed(1));



    function getBotSpeedDelay(): Point {
        const delay = $botSpeedDelay
        switch (delay) {
            case BotDelay.Slow:
                return slowBotSpeedDelay
            case BotDelay.Fast:
                return fastBotSpeedDelay
        }
        return defaultBotSpeedDelay
    }

    function speedToText(speed: Point): string {
        return `Entre ${speed.x / 1000} et ${speed.y / 1000} secondes`;
    }
</script>

<Jumbo icon="config" title="Réglages" />

<PageWrap>
    <div class="grid page">
        <Section icon="dice" title="Dimension du plateau">
            <div class="infographics">
                <strong>{gridSize.x} x {gridSize.y}</strong>
                <p>Soit <strong>{numberOfCells} cases</strong></p>
                <p>Pour <strong>{maxNbParticipants} participants</strong> max</p>
            </div>

            <div class="grid forms">
                <Slider
                    label="Largeur"
                    min={minGridSize.x}
                    max={maxGridSize.x}
                    suffix="colonnes"
                    bind:value={gridSize.x} />
        
                <Slider
                    label="Hauteur"
                    min={minGridSize.y}
                    max={maxGridSize.y}
                    suffix="lignes"
                    bind:value={gridSize.y} />
            </div>
        </Section>

        <Section icon="bot" title="Comportement des bots" delay={1}>
            <div class="infographics">
                <strong>{avgResponseTimeMs >= 1000 ? avgResponseTimeScd + 's' : avgResponseTimeMs + 'ms'}</strong>
                <p>Temps de réponse moyen</p>
                <p>Soit <strong>{avgResponseTimeMs >= 1000 ? avgResponseTimeMs + 'ms' : avgResponseTimeScd + 's'}</strong></p>
            </div>

            <strong>Delai de réponse</strong>
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

    .forms {
        grid-template-columns: repeat( auto-fit, minmax(270px, 1fr) );
        gap: clamp(.5rem, 8vw, 1.5rem);
    }

    .infographics {
        text-align: center;

        strong { color: cyan; }

        & > strong {
            font-size: clamp(34px, 6vw, 5rem);
        }

        p {
            margin: 0;

            &:last-child {
                opacity: .8;
                font-size: .9em;
                padding-bottom: 1.5rem;
            }
        }
    }

    @media (prefers-color-scheme: light) {
        .infographics strong {
            color: blue;
        }
    }

    @media (width >= 400px) {
        .page {
            grid-template-columns: repeat( auto-fit, minmax(400px, 1fr) );
        }
    }
</style>
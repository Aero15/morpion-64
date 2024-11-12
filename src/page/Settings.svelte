<script lang="ts">
    // Imports
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
    import { calcAvg } from "$core/helpers/Math.svelte";
    import type Point from "$core/entity/game/Point.svelte";



    // Variables réactives
    let numberOfCells = $derived(countCellsFor(gridSize));
    let maxNbParticipants = $derived(calcMaxNbParticipantsFrom(numberOfCells));
    let botDelay = $derived.by(getBotSpeedDelay)
    let avgResponseTimeMs: number = $derived(parseInt(calcAvg(botDelay.toArray()).toFixed(0)));
    let avgResponseTimeScd = $derived((avgResponseTimeMs / 1000).toFixed(1));



    // Fonctions
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
</script>
<main>
    <h1>Paramètres</h1>

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
            <div class="form-group">
                {#snippet radio_botSpeed(label: string, value: number, speed: Point)}
                    <label class="botSpeed">
                        <input type="radio" {value}
                            bind:group={$botSpeedDelay} />
                        <strong class="name">{label}</strong>
                        <p class="value">Entre {speed.x} et {speed.y}ms</p>
                    </label>
                {/snippet}

                {@render radio_botSpeed('Lent', BotDelay.Slow, slowBotSpeedDelay)}
                {@render radio_botSpeed('Normal', BotDelay.Default, defaultBotSpeedDelay)}
                {@render radio_botSpeed('Rapide', BotDelay.Fast, fastBotSpeedDelay)}
            </div>
        </Section>
    </div>
</main>

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
                padding-bottom: 3.5rem;
            }
        }
    }

    .form-group {
        --tint: rgba(255,255,255,.3);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: .5rem;
        border: 1px solid var(--tint);
        border-radius: 1.25rem;
        padding: .25rem;

        label {
            padding: 1rem;
            border-radius: 1rem;
            cursor: crosshair;

            input { display: none; }

            &:has(input:checked) {
                background: var(--tint);
            }

            .name {
                text-transform: uppercase;
            }

            .value {
                margin: 0;
                font-size: .9em;
            }
        }
    }

    @media (prefers-color-scheme: light) {
        .infographics strong {
            color: blue;
        }

        .form-group {
            --tint: rgba(0,0,0,.2);
        }
    }

    @media (width >= 400px) {
        .page {
            grid-template-columns: repeat( auto-fit, minmax(400px, 1fr) );
        }
    }
</style>
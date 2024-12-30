<script lang="ts">
    import { gridSize, maxGridSize, minGridSize } from "$core/store/settings.svelte";
    import NumberInput from "$lib/form/NumberInput.svelte";
    import Radio from "$lib/form/Radio.svelte";
    import RadioGroup from "$lib/form/RadioGroup.svelte";

    interface Props {
        large?: boolean
    }

    let {
        large = false
    }: Props = $props();

    let dimension = $state('3x3');
    let presets = ['3x3', '5x8', '8x8'];

    // Apply and save the selected preset
    function onchange(e: Event) {
        let value = (e.target as HTMLInputElement).value;
        if (value !== 'custom') {
            let size = value.split('x');
            gridSize.x = parseInt(size[0]);
            gridSize.y = parseInt(size[1]);
        }
    }

    // Select the correct preset
    $effect(() => {
        let value = '' + gridSize.x + 'x' + gridSize.y;

        if (!presets.includes(value)) {
            dimension = 'custom';
        } else {
            dimension = value;
        }
    })
</script>

<RadioGroup>
    {#if large}
        <p><strong>Par défaut</strong></p>
    {/if}
    <Radio {onchange} bind:group={dimension}
        label="Minimale" value={presets[0]}
        description="Une grille en {presets[0]}, un très bon classique" />
    <Radio {onchange} bind:group={dimension}
        label="Smartphone" value={presets[1]}
        description="Une grille en {presets[1]}, adapté aux smartphones" />
    <Radio {onchange} bind:group={dimension}
        label="Maximale" value={presets[2]}
        description="Une grille en {presets[2]}, pour la folie des grandeurs" />

    {#if large}
        <p style="margin-top: 1rem;"><strong>Options</strong></p>
    {/if}
    <Radio {onchange} bind:group={dimension}
        label="Personnalisée" value="custom">
        <div class="forms">
            <NumberInput centerLegend
                label="Largeur" legend="colonnes"
                min={minGridSize.x} max={maxGridSize.x}
                bind:value={gridSize.x} />
            <NumberInput centerLegend
                label="Hauteur" legend="lignes"
                min={minGridSize.y} max={maxGridSize.y}
                bind:value={gridSize.y} />
        </div>
    </Radio>
</RadioGroup>

<style>
    .forms {
        display: flex;
        flex-flow: wrap;
        gap: 1rem;
        margin-top: .5rem;
    }

    p {
        margin: 0;
    }
</style>
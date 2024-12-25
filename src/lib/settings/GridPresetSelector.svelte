<script lang="ts">
    import { gridSize, maxGridSize, minGridSize } from "$core/store/settings.svelte";
    import NumberInput from "$lib/form/NumberInput.svelte";
    import Radio from "$lib/form/Radio.svelte";
    import RadioGroup from "$lib/form/RadioGroup.svelte";

    let dimension = $state('3x3');
    let presets = ['3x3', '3x8', '8x8'];

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
    <Radio {onchange} bind:group={dimension}
        label="Minimale" value={presets[0]}
        description="Une grille en 3x3, un très bon classique" />
    <Radio {onchange} bind:group={dimension}
        label="Smartphone" value={presets[1]}
        description="Une grille en 3x8, adapté aux smartphones" />
    <Radio {onchange} bind:group={dimension}
        label="Maximale" value={presets[2]}
        description="Une grille en 8x8, pour la folie des grandeurs" />

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
</style>
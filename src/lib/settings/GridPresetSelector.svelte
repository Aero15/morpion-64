<script lang="ts">
    import {
        gridSize, maxGridSize, minGridSize
    } from "$core/store/settings.svelte";
    import NumberInput from "$lib/form/NumberInput.svelte";
    import RadioGroup from "$lib/form/RadioGroup.svelte";
    import Radio from "$lib/form/Radio.svelte";
    import { _ } from "svelte-i18n";

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
        <p><strong>{ $_('settings.default') }</strong></p>
    {/if}
    <Radio {onchange} bind:group={dimension}
        label={ $_('settings.game_board.minimum.name') } value={presets[0]}
        description={ $_('settings.game_board.minimum.legend', { values: { size: presets[0] } }) } />
    <Radio {onchange} bind:group={dimension}
        label={ $_('settings.game_board.vertical.name') } value={presets[1]}
        description={ $_('settings.game_board.vertical.legend', { values: { size: presets[1] } }) } />
    <Radio {onchange} bind:group={dimension}
        label={ $_('settings.game_board.maximum.name') } value={presets[2]}
        description={ $_('settings.game_board.maximum.legend', { values: { size: presets[2] } }) } />

    {#if large}
        <p style="margin-top: 1rem;"><strong>{ $_('settings.options') }</strong></p>
    {/if}
    <Radio {onchange} bind:group={dimension}
        label={ $_('settings.game_board.custom') } value="custom">
        <div class="forms">
            <NumberInput centerLegend
                label={ $_('settings.game_board.width') }
                legend={ $_('settings.game_board.columns') }
                min={minGridSize.x} max={maxGridSize.x}
                bind:value={gridSize.x} />
            <NumberInput centerLegend
                label={ $_('settings.game_board.height') }
                legend={ $_('settings.game_board.rows') }
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
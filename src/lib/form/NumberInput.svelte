<script lang="ts">
    import Icon from "$lib/shared/Icon.svelte";

    interface Props {
        id?: string,
        value: number,
        min?: number,
        max?: number,
        step?: number,
        label?: string,
        legend?: string,
        centerLabel?: boolean,
        centerLegend?: boolean,
    }

    let {
        id = crypto.randomUUID(),
        value = $bindable(0),
        min = 0,
        max = 100,
        step = 1,
        label = '',
        legend = '',
        centerLabel = false,
        centerLegend = false,
    }: Props = $props();

    let canIncrement = $derived((value + step) <= max);
    let canDecrement = $derived((value - step) >= min);

    function increment() {
        if (canIncrement) {
            value += step;
        }
    }

    function decrement() {
        if (canDecrement) {
            value -= step;
        }
    }
</script>

<main class="bx-number_input">
    {#if label.length > 0}
        <label for={id} class:center={centerLabel}>
            <strong>{label}</strong>
        </label>
    {/if}

    <div class="form">
        <button class="decrement"
            disabled={!canDecrement}
            onclick={decrement}
            title="Décrémenter">
            <Icon icon="minus" size={16} />
        </button>
    
        <input type="number" {id} bind:value {min} {max} {step} />
    
        <button class="increment"
            disabled={!canIncrement}
            onclick={increment}
            title="Incrémenter">
            <Icon icon="plus" size={16} />
        </button>
    </div>

    {#if legend.length > 0}
        <legend class:center={centerLegend}>{legend}</legend>
    {/if}
</main>

<style>
    .bx-number_input {
        display: grid;

        label {margin-bottom: .25rem;}

        label, legend {
            font-size: .78em;

            &.center {
                text-align: center;
            }
        }
    }

    .form {
        --radius: .5rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        input, button {
            aspect-ratio: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            border: 1px solid light-dark(#00000055, #ffffff55);
            transition: border-color .2s, background .2s, box-shadow .2s;

            &:not(:disabled) {
                &:hover {
                    border-color: light-dark(#00000077, #ffffff77);
                    background: light-dark(#d650ff75, #00ccff75);
                }

                &:active {
                    box-shadow: 0 0 15px 10px light-dark(#d650ff75, #00ccff75);
                }
            }
        }

        input {
            margin: 0 -1px;
            -moz-appearance: textfield;
            appearance: textfield;
            border-inline-color: transparent;
            background: light-dark(#fff, #222);
            font-size: 20px;
            font-family: inherit;
            min-width: 2.5rem;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            appearance: none;
            margin: 0;
        }

        button {
            background: light-dark(#00000025, #ffffff25);
            position: relative;
            z-index: 1;
            &:not(:disabled) {
                cursor: crosshair;
            }
        }

        .decrement {
            border-radius: var(--radius) 0 0 var(--radius);
        }
        .increment {
            border-radius: 0 var(--radius) var(--radius) 0;
        }
    }
</style>
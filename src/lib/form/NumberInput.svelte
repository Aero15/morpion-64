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
        <input type="number" {id}
            bind:value {min} {max} {step} />

        <button class="decrement"
            disabled={!canDecrement}
            onclick={decrement}
            title="Décrémenter">
            <Icon icon="line" size={16} />
        </button>
    
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
        --radius: .75rem;
        display: grid;
        grid-template-columns: 1fr 1fr;

        input, button {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            border: 1px solid light-dark(#00000077, #ffffff77);
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
            margin: 0;
            -moz-appearance: textfield;
            appearance: textfield;
            background: light-dark(#fff, #222);
            font-size: 20px;
            font-family: inherit;
            min-width: 2.5rem;
            grid-column: 1 / 3;
            aspect-ratio: 2/1;
            border-bottom: none;
            border-radius: var(--radius) var(--radius) 0 0;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            appearance: none;
            margin: 0;
        }

        button {
            background: light-dark(#fff, #222);
            position: relative;
            z-index: 1;
            aspect-ratio: 1;
            padding: .75rem;

            &:not(:disabled) {
                cursor: crosshair;
                background: light-dark(#f4ceff, #005368);
            }

            &:disabled {
                cursor: not-allowed;
            }
        }

        .decrement {
            border-radius: 0 0 0 var(--radius);
        }
        .increment {
            border-radius: 0 0 var(--radius) 0;
            border-left: none;
        }
    }
</style>
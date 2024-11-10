<script lang="ts">
    // Source : https://codepen.io/forestlet/pen/OJqjzxx

    // Interface pour les propriétés
    interface Props {
        label?: string,
        min?: number,
        max?: number,
        value?: number,
        suffix?: string
    }

    // Propriétés du composant
    let {
        label = 'Lorem ipsum',
        min = 0,
        max = 100,
        value = $bindable(0),
        suffix = ''
    }: Props = $props();

    let percent = $derived((value - min) / (max - min) * 100);
</script>

<div class="wrapper">
    <div class="text">
        <strong class="label">
            {label}
        </strong>
        <div class="value">
            {value} {suffix}
        </div>
    </div>

    <input
        type="range"
        {min} {max}
        bind:value
    />

    <div
        class="progression"
        style:--percent={percent}
    ></div>
</div>

<style>
    .wrapper {
        --tint: #ffffff33;
        display: grid;
        position: relative;
        gap: .25rem;
    }
    .text {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    input[type="range"] {
        background: var(--tint);
        border: 1px solid var(--tint);
        top: 50%;
        left: 50%;
        margin: 0;
        padding: 0;
        min-width: 18rem;
        height: 3rem;
        border-radius: 1rem;
        overflow: hidden;
        cursor: col-resize;

        &::-webkit-slider-thumb,
        &::-moz-range-thumb {
            -webkit-appearance: none;
            border: none;
            width: 0;
        }
    }

    .progression {
        --margin: 5px;
        --percent: 50;
        background: linear-gradient(to bottom, rgb(0, 153, 255), cyan);
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 5px;
        padding: 0;
        min-width: 1.3rem;
        width: calc((18rem + 2px) * (var(--percent) / 100) - (var(--margin) * 2));
        height: calc((3rem + 2px) - (var(--margin) * 2));
        border-radius: calc(1rem - (var(--margin) + 1px));
        box-shadow: 0 0 0 2px var(--tint) inset;
        overflow: hidden;
        pointer-events: none;
        transition: width .1s;
        opacity: .5;
    }

    @media (prefers-color-scheme: light) {
        .wrapper {
            --tint: #00000022;
        }
    }
</style>
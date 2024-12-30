<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        group: any,
        label: string,
        value: string | number,
        description?: string,
        children?: Snippet,
        onchange?: (e: Event) => void
    }

    let {
        group = $bindable(''),
        label,
        value,
        description = $bindable(''),
        children,
        onchange = e => {}
    }: Props = $props();
</script>

<label class="bx-radio"
    class:center_x={description.length === 0 && children === undefined}
    class:checked={group === value}
>
    <input type="radio" {value} bind:group {onchange} />

    <div class="text">
        <p class="name"><strong>{label}</strong></p>
    
        {#if description.length > 0}
            <p class="description">{ description }</p>
        {/if}
    
        {#if children}
            <div class="child">
                {@render children()}
            </div>
        {/if}
    </div>
</label>

<style>
    .bx-radio {
        border: 1px solid light-dark(#00000055, #ffffff55);
        background: light-dark(#00000017, #ffffff17);
        border-radius: .75rem;
        cursor: crosshair;
        padding: .5rem;
        display: flex;
        gap: .5rem;
        transition: border-color .2s, background .2s;

        &.center_x { align-items: center; }
        &:not(.center_x) { align-items: start; }

        &.checked {
            border-color: light-dark(#00000077, #ffffff77);
            background: light-dark(#d650ff75, #00ccff75);
        }

        &:hover {
            border-color: light-dark(#00000077, #ffffff77);
            background: light-dark(#00000037, #ffffff37);

            &.checked {
                border-color: light-dark(#00000077, #ffffff77);
                background: light-dark(#c300ff75, #7de5ff75);
            }
        }

        input[type="radio"] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            --size: 20px;
            width: var(--size);
            height: var(--size);
            aspect-ratio: 1;
            border: 2px solid light-dark(#000, #fff);
            border-radius: 50%;
            background: transparent;
            position: relative;
            cursor: crosshair;
            transition: all .2s;
        }

        &.center_x input[type="radio"] { margin-top: -1px; }
        &:not(.center_x) input[type="radio"] { margin-top: 2px; }

        input[type="radio"]:checked {
            --tint: light-dark(#8400ac, cyan);
            background-color: var(--tint);
            border-color: var(--tint);
        }

        input[type="radio"]:checked::after {
            content: ""; 
            position: absolute;
            top: 4px;
            left: 4px;
            width: 8px;
            height: 8px;
            aspect-ratio: 1;
            border-radius: 50%;
            background-color: light-dark(#fff, #000);
        }

        p {
            margin: 0;

            &.name {
                font-size: .9em;
            }

            &.description {
                font-size: .78rem;
            }
        }
    }
</style>
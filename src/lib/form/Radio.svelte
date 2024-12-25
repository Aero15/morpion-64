<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        group: any,
        label: string,
        value: string | number,
        description?: string,
        children?: Snippet
    }

    let {
        group = $bindable(''),
        label,
        value,
        description = $bindable(''),
        children
    }: Props = $props();
</script>

<label class="bx-radio"
    class:center_x={description.length === 0 && children === undefined}
    class:checked={group === value}
>
    <input type="radio" {value} bind:group />

    <div class="text">
        <p><strong class="name">{label}</strong></p>
    
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

        p {
            margin: 0;

            &.description {
                font-size: .78rem;
            }
        }
    }
</style>
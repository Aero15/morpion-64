<script lang="ts">
    import { improveContrast } from "$core/helpers/Colors.svelte";
    import Point from "$core/entity/board/Point.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import { scale } from "svelte/transition";

    interface Props {
        eraserEnabled?: boolean
        position: Point,
        symbol?: string,
        color?: string,
        lock: boolean,
        compact?: boolean,
        highlighted: boolean,
        onClick?: (position: Point) => void
    }

    let {
        eraserEnabled = $bindable(false),
        position = $bindable(new Point(0, 0)),
        symbol = $bindable(undefined),
        highlighted = $bindable(false),
        compact = false,
        color = $bindable(undefined),
        lock = $bindable(false),
        onClick = () => {},
    }: Props = $props();

    let isEmpty = $derived(symbol === undefined);
    let disabled = $derived( // Disable cell while:
        (eraserEnabled && isEmpty) || // eraser mode is activated and the cell is empty
        (!eraserEnabled && !isEmpty) || // eraser mode is not activated and the cell is not empty
        lock // is locked
    );
    let symbolColor = $derived.by(() => {
        let { light, dark } = improveContrast(color);
        return `light-dark(${light}, ${dark})`;
    })
</script>

<button
    class="cell"
    class:compact
    class:highlighted
    onclick={() => onClick(position)}
    {disabled}
>
    {#if symbol}
        <div transition:scale style:color={symbolColor}>
            <Icon icon={symbol} size={compact ? 44 : 64} />
        </div>
    {/if}
</button>

<style>
    .cell {
        aspect-ratio: 1;
        padding: 0;
        margin: 0;
        border: 1px solid transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background .2s, color .2s, transform .2s;

        &.compact {
            width: 50px;
            border-radius: .75rem;
        }

        &:not(.compact) {
            width: 80px;
            border-radius: 1rem;
        }

        &:disabled {
            background: transparent;
            color: inherit;
        }

        &:not(:disabled) {
            cursor: pointer;
            background: light-dark(#00000033, #ffffff33);

            &:hover {
                background: light-dark(#00000077, #ffffff77);
                border-color: light-dark(#000, #fff);
            }

            &:active {
                transform: scale(1.2);
            }
        }

        &.highlighted {
            background: radial-gradient(transparent, light-dark(#00000055, #ffffff55));
            border-color: light-dark(#00000088, #ffffff88);
        }
    }
</style>
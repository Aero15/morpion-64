<script lang="ts">
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
    let disabled = $derived( // Désactiver la cellule lorsque :
        (eraserEnabled && isEmpty) || // le mode effaceur est activé et la cellule est vide
        (!eraserEnabled && !isEmpty) || // le mode effaceur n'est pas activé et la cellule n'est pas vide
        lock // la cellule est bloquée
    );
</script>

<button
    class="cell"
    class:compact
    class:highlighted
    onclick={() => onClick(position)}
    {disabled}
>
    {#if symbol}
        <div transition:scale style:color={color}>
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
            background: light-dark(#d1d1d1, #525252);

            &:hover {
                background: light-dark(#9c9c9c, #888);
                border-color: light-dark(#000, #fff);
            }

            &:active {
                transform: scale(1.2);
            }
        }

        &.highlighted {
            background: light-dark(#000, #fff);
        }
    }
</style>
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
        highlighted: boolean,
        onClick?: (position: Point) => void
    }

    let {
        eraserEnabled = $bindable(false),
        position = $bindable(new Point(0, 0)),
        symbol = $bindable(undefined),
        highlighted = $bindable(false),
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
    class="cell" class:highlighted
    onclick={() => onClick(position)}
    {disabled}
>
    {#if symbol}
        <div transition:scale style:color={color}>
            <Icon icon={symbol} size={64} />
        </div>
    {/if}
</button>

<style>
    .cell {
        aspect-ratio: 1;
        padding: 0;
        margin: 0;
        width: 80px;
        border: 1px solid rgba(127,127,127,1);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        transition: background .2s, border-color .2s, color .2s;

        &:disabled {
            border-color: transparent;
            background: transparent;
            color: inherit;
        }

        &:not(:disabled) {
            cursor: pointer;
            background: transparent;

            &:hover {
                background: var(--main_color);
            }
        }

        &.highlighted {
            background: #fff;
        }
    }

    @media (prefers-color-scheme: light) {
        .cell.highlighted {
            background: rgba(0,0,0,1);
        }
    }
</style>
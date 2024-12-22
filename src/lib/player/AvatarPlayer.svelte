<script lang="ts">
    import { PlayerType } from "$core/enums/PlayerType";
    import { improveContrast } from "$core/helpers/Colors.svelte";
    import Icon from "$lib/shared/Icon.svelte";

    interface Props {
        name: string,
        symbol: string,
        color: string,
        type: PlayerType,
        compact?: boolean
    }

    let {
        name = $bindable(''),
        symbol = $bindable(''),
        color = $bindable(''),
        type = PlayerType.Human,
        compact = $bindable(false)
    }: Props = $props();

    let symbolColor = $derived.by(() => {
        let { light, dark } = improveContrast(color);
        return `light-dark(${light}, ${dark})`;
    })
</script>

<div class="avatar" title={name}
    class:compact
    style:color={symbolColor}
    style:--tint={color}>
    <Icon icon={symbol} size={ compact ? 32 : 50 } />

    {#if type === PlayerType.Bot}
        <div class="bubble">
            <Icon icon="bot" size={ compact ? 16 : 18 } />
        </div>
    {/if}
</div>

<style>
    .avatar {
        --size: 5rem;
        width: var(--size);
        height: var(--size);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 25%;
        font-size: 1.5rem;
        color: var(--tint);
        aspect-ratio: 1;
        position: relative;
        border: 1px solid light-dark(#aaa, #777);
        background: light-dark(#e7e7e7, #3f3f3f);
        transition: width .2s, height .2s;

        .bubble {
            --size: 28px;
            width: var(--size);
            height: var(--size);
            border-radius: 100px;
            position: absolute;
            right: -10px;
            top: -10px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid light-dark(#aaa, #777);
            background: light-dark(#fff, #000);
        }

        &.compact {
            --size: 3.5rem;
            .bubble { --size: 22px; }
        }
    }
</style>
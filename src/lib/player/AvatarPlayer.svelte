<script lang="ts">
    import { PlayerType } from "$core/enums/PlayerType";
    import { getForegroundColorFor, improveContrast } from "$core/helpers/Colors.svelte";
    import Icon from "$lib/shared/Icon.svelte";

    interface Props {
        name: string,
        symbol: string,
        color: string,
        type: PlayerType,
        compact?: boolean,
        tinted?: boolean,
        shape?: 'rounded' | 'circular'
    }

    let {
        name = $bindable(''),
        symbol = $bindable(''),
        color = $bindable(''),
        type = PlayerType.Human,
        tinted = $bindable(false),
        compact = $bindable(false),
        shape = $bindable('rounded'),
    }: Props = $props();

    let contrastColor = $derived.by(() => {
        return improveContrast(color);
    })

    let symbolColor = $derived.by(() => {
        let { light, dark } = contrastColor;
        return `light-dark(${light}, ${dark})`;
    })
</script>

<div class="avatar" title={name}
    class:compact class:tinted
    class:rounded={shape === 'rounded'}
    class:circular={shape === 'circular'}
    style:--tint={symbolColor}>
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
        font-size: 1.5rem;
        aspect-ratio: 1;
        position: relative;
        transition: width .2s, height .2s;

        &.rounded { border-radius: 25%; }
        &.circular { border-radius: 100%; }

        .bubble {
            --size: 28px;
            --position: -10px;
            width: var(--size);
            height: var(--size);
            border-radius: 100px;
            position: absolute;
            right: var(--position);
            top: var(--position);
            display: flex;
            justify-content: center;
            align-items: center;
            background: light-dark(#fff, #000);
        }

        &.tinted {
            background: var(--tint);
            color: light-dark(#fff, #000);
            .bubble {
                color: light-dark(#000, #fff);
            }

            &, .bubble {
                border: 1px solid light-dark(#000000aa, #ffffffaa);
            }
        }
        &:not(.tinted) {
            color: var(--tint);
            background: light-dark(#e7e7e7, #3f3f3f);

            &, .bubble {
                border: 1px solid light-dark(#aaa, #777);
            }
        }

        &.circular .bubble {
            --position: -5px;
        }

        &.compact {
            --size: 3.5rem;
            .bubble { --size: 22px; }
        }
    }
</style>
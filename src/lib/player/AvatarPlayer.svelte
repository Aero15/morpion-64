<script lang="ts">
    import { PlayerType } from "$core/enums/PlayerType";
    import { getContrastColor } from "$core/helpers/Colors.svelte";
    import Icon from "$lib/shared/Icon.svelte";

    interface Props {
        name: string,
        symbol: string,
        color: string
        type: PlayerType
    }

    let {
        name = $bindable(''),
        symbol = $bindable(''),
        color = $bindable(''),
        type = PlayerType.Human
    }: Props = $props();

    let textColor = $derived(getContrastColor(color));
</script>

<div class="avatar" title={name}
    style:--tint={color}
    style:--text-color={textColor}>
    <Icon icon={symbol} size={50} />

    {#if type === PlayerType.Bot}
        <div class="bubble">
            <Icon icon="bot" size={14} />
        </div>
    {/if}
</div>

<style>
    .avatar {
        --text-color: #fff;
        background: var(--tint);
        width: clamp(2rem, 8vw, 5rem);
        height: clamp(2rem, 8vw, 5rem);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100px;
        font-size: 1.5rem;
        color: var(--text-color);
        aspect-ratio: 1;
        position: relative;

        .bubble {
            --size: 24px;
            width: var(--size);
            height: var(--size);
            border-radius: 100px;
            background: #fff;
            color: #000;
            border: 3px solid var(--tint);
            position: absolute;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    @media (prefers-color-scheme: dark) {
        .avatar {
            --text-color: #000;

            .bubble {
                background: #242424;
                color: #fff;
            }
        }
    }
</style>
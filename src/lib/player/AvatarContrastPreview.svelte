<script lang="ts">
    import { improveContrast } from "$core/helpers/Colors.svelte";
    import Icon from "$lib/shared/Icon.svelte";

    interface Props {
        symbol: string,
        color: string
    }

    let {
        symbol = $bindable(''),
        color = $bindable(''),
    }: Props = $props();
    
    let colors = $derived(improveContrast(color))
    let iconSize = 64
</script>

<main class="bx-avatar_contrast_preview">
    <div class="bx-symbol light"
        style:color={colors.light ? colors.light : color}>
        <Icon icon={symbol} size={ iconSize } />
    </div>
    <div class="bx-color light"
        style:background={colors.light ? colors.light : color}>
        <Icon icon={symbol} size={ iconSize } />
    </div>

    <div class="bx-symbol dark"
        style:color={colors.dark ? colors.dark : color}>
        <Icon icon={symbol} size={ iconSize } />
    </div>
    <div class="bx-color dark"
        style:background={colors.dark ? colors.dark : color}>
        <Icon icon={symbol} size={ iconSize } />
    </div>
</main>

<style>
    .bx-avatar_contrast_preview {
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
        border-radius: 1rem;
        overflow: clip;
        border: 1px solid #777;
        
        .bx-symbol,
        .bx-color {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem;
            transition: color .2s, background .2s;
        }

        .bx-symbol {
            &.light { background: #fff;}
            &.dark { background: #000;}
        }

        .bx-color {
            &.light { color: #fff;}
            &.dark { color: #000;}
        }
    }
</style>
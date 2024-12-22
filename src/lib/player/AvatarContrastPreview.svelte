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
    <div class="bx-symbol dark"
        style:color={colors.dark ? colors.dark : color}>
        <Icon icon={symbol} size={ iconSize } />
    </div>
</main>

<style>
    .bx-avatar_contrast_preview {
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
        border-radius: .5rem;
        overflow: clip;
        
        .bx-symbol {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem;

            &.light { background: #e2e2e2;}
            &.dark { background: #000;}
        }
    }
</style>
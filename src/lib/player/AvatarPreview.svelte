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
    
    let symbolColor = $derived.by(() => {
        let { light, dark } = improveContrast(color);
        return `light-dark(${light}, ${dark})`;
    })
</script>

<main class="bx-avatar_preview">
    <div class="bx-icon" style:color={symbolColor}>
        <Icon icon={symbol} size={180} />
    </div>
</main>

<style>
    @property --cell_size {
        syntax: "<length>";
        inherits: false;
        initial-value: 20px;
    }

    @keyframes gridZoomIn {
        0% {
            --cell_size: 20px;
        }
        100% {
            --cell_size: 200px;
        }
    }
    @keyframes symbolZoomIn {
        0% {
            scale: 0;
            rotate: 180deg;
        }
        100% {
            rotate: 0deg;
            scale: 1;
        }
    }

    .bx-avatar_preview {
        background: light-dark(#fff, #333);
        background: transparent;
        --size: 300px;
        height: var(--size);
        
        --cell_size: 20px;
        --cell_border_width: 1px;
        --cell_border_color: light-dark(#00000066, #ffffff66);
        background-size: var(--cell_size) var(--cell_size);
        background-image:
            linear-gradient(
                to right,
                var(--cell_border_color) var(--cell_border_width),
                transparent 1px
            ),
            linear-gradient(
                to bottom,
                var(--cell_border_color) var(--cell_border_width),
                transparent 1px
            );
        background-position: center;
        --animation-delay: 0s;
        animation: .75s ease-out var(--animation-delay) 1 gridZoomIn forwards;
        animation-timing-function: cubic-bezier(.5,.9,.2,1.2);
        
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: clip;

        mask-image: linear-gradient(#fff 85%, transparent 100%); 
        
        .bx-icon {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            scale: 0;
            rotate: 180deg;
            animation: .7s cubic-bezier(0.22, 1, 0.36, 1) var(--animation-delay) 1 symbolZoomIn forwards;
        }
    }
</style>
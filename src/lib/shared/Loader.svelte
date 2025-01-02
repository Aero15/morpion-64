<script lang="ts">
    import Halo from "./Halo.svelte";

    interface Props {
        variant?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    }

    let {
        variant = 'sm'
    }: Props = $props();

    let innerWidth = $derived.by(() => {
        switch (variant) {
            case 'sm': return '1rem';
            case 'md': return '1.5rem';
            case 'lg': return '2rem';
            case 'xl': return '3rem';
            default: return '4rem';
        }
    })

    let borderWidth = $derived.by(() => {
        switch (variant) {
            case 'sm': return '.2rem';
            case 'md': return '.25rem';
            case 'lg': return '.3rem';
            case 'xl': return '.5rem';
            default: return '.75rem';
        }
    })

    let outerWidth = $derived.by(() => {
        // Base to convert rem to px
        const remToPx = 16; // 1rem = 16px
        
        // Convert padding and width to pixels
        const paddingPx = parseFloat(borderWidth) * remToPx;
        const widthPx = parseFloat(innerWidth) * remToPx;

        // Calculate external width
        const externalWidth = widthPx + (2 * paddingPx);
        
        // Convert to rem
        return externalWidth / remToPx + 'rem';
    })
</script>

<main class="bx-loader"
    style:--size={outerWidth}
>
    <Halo visible
        borderWidth={borderWidth}
        cornerRadius={outerWidth}
    >
        <div style:--size={innerWidth}></div>
    </Halo>
</main>

<style>
    .bx-loader {
        display: flex;
        justify-content: center;
        align-items: center;

        --size: 2rem;
        aspect-ratio: 1;
        width: var(--size);
        height: var(--size);

        div {
            background: light-dark(#fff, #242424);
            border-radius: 100%;
            width: var(--size);
            height: var(--size);
            aspect-ratio: 1;
        }
    }
</style>
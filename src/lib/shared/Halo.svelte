<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet,
        borderWidth?: string,
        cornerRadius?: string,
        visible?: boolean,
        visibleOnHover?: boolean
    }

    let {
        children,
        borderWidth = $bindable("1rem"),
        cornerRadius = $bindable("10px"),
        visible = false,
        visibleOnHover = false
    }: Props = $props();
</script>

<div
    class="halo" class:visible
    class:visibleOnHover
    style:--border-width={borderWidth}
    style:--radius={cornerRadius}
>
    {@render children()}
</div>

<style>
    @property --angle{
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
    }

    @keyframes spin {
        from {
            --angle: 0deg;
        }
        to {
            --angle: 360deg;
        }
    }

    .halo {
        position: relative;
        --border-width: 1rem;
        --radius : 10px;

        &::after, &::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 100%;
            background-image: conic-gradient(
                from var(--angle),
                cyan, blue,
                cyan, blue, cyan
            );
            background-image: conic-gradient(
                from var(--angle),
                magenta, cyan,
                magenta, cyan, magenta
            );
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            z-index: -1;
            opacity: 0;
            padding: 0;
            border-radius: calc(var(--radius) + var(--border-width));
            animation: 3s spin linear infinite;
            transition: opacity .2s, padding .2s;
        }

        &.visibleOnHover:hover,
        &.visible {
            &::before, &::after {
                padding: var(--border-width);
            }
            &::before {
                opacity: 1;
            }
            &::after {
                opacity: .5;
                filter: blur(1.5rem);
            }
        }
    }
</style>
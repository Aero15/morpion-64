<script lang="ts">
    import { Color } from "$core/enums/Color";
    import { scale } from "svelte/transition";

    let {
        value = $bindable('')
    }: {
        value: Color | string
    } = $props();

    const colors: string[] = Object.values(Color);

    let isCustomColor = $derived(!colors.includes(value));
</script>

<main>
    {#each colors as color}
        <label>
            <input type="radio" bind:group={value} value={color}>
            <span style:background={color}></span>
        </label>
    {/each}

    <div>
        <span class="custom" class:selected={isCustomColor}>
            {#if isCustomColor}
                <div
                    class="checkmark"
                    style:background={value}
                    transition:scale
                ></div>
            {/if}

            <input type="color" bind:value>
        </span>
    </div>
</main>

<style>
    main {
        --input-border-color: rgba(0,0,0,.3);
        --item-border-color: #fff;

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        grid-template-columns: repeat(4, 1fr);
        gap: 0rem;
        border: 1px solid var(--input-border-color);
        border-radius: 20px;
        padding: 10px;
        font-size: 0;
    }
    input[type="radio"] {
        display: none;
    }
    input[type="color"] {
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    span {
        --size: 50px;
        display: inline-block;
        width: var(--size);
        height: var(--size);
        border-radius: var(--size);
        cursor: crosshair;
        margin: 5px;
        border: 6px solid var(--item-border-color);
        box-shadow: 0 0 0 2px rgba(0,0,0,.5) inset;

        &.custom {
            position: relative;
            background: conic-gradient(
                #ffdd45, #00ff99,#006aff,
                #ff0095, #ff4545 , #ffdd45
            );

            .checkmark {
                position: absolute;
                top: 50%;
                left: 50%;
                translate: -50% -50%;
                width: 75%;
                height: 75%;
                border-radius: 100%;
                background: #f00;
                border: 3px solid var(--item-border-color);
            }
        }

        input:checked + &,
        &.selected {
            box-shadow: 0 0 0 2px rgba(0,0,0,.5) inset,
                0 0 0 3px var(--input-border-color);
        }
    }

    @media (prefers-color-scheme: dark) {
        main {
            --input-border-color: rgba(255,255,255,.3);
            --item-border-color: #242424;
        }
    }
</style>
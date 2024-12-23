<script lang="ts">
    import { Color } from "$core/enums/Color";

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
        <span class="custom" class:selected={isCustomColor} style:--tint={value}>
            <input type="color" bind:value>
        </span>
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        grid-template-columns: repeat(4, 1fr);
        font-size: 0;
        gap: 10px;
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
        position: relative;
        display: inline-block;
        width: var(--size);
        height: var(--size);
        border-radius: var(--size);
        cursor: crosshair;
        border: 3px solid light-dark(#00000055, #ffffff55);
        transition: border-color .3s, transform .2s;

        &.custom {
            position: relative;
            background: conic-gradient(
                #ffdd45, #00ff99,#006aff,
                #ff0095, #ff4545 , #ffdd45
            );
            background-repeat: no-repeat;
            background-size: calc(100% + 6px) calc(100% + 6px);
            background-position: -3px -3px;
        }

        input { cursor: crosshair; }

        &::after {
            content: '';
            position: absolute;
            inset: 2rem;
            font-size: 0;
            opacity: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: none;
            background: var(--tint, #fff);
            border-radius: 100%;
            border: 1px solid #00000077;
            transition: opacity .1s, inset .1s;
            box-shadow: 0 0 0 3px #ffffff99 inset;
        }

        &:hover {
            transform: scale(1.3);
            position: relative;
            z-index: 10;
            border-color: light-dark(#000, #fff);
        }

        input:checked + &,
        &.selected {
            &::after {
                opacity: 1;
                inset: .5rem;
            }
        }
    }
</style>
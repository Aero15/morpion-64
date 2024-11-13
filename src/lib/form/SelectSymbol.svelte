<script lang="ts">
    import { Symbol } from "$core/enums/Symbol";
    import Icon from "$lib/shared/Icon.svelte";

    let { value = $bindable('') } = $props();

    const symbols = Object.values(Symbol);
</script>

<main>
    {#each symbols as symbol}
        <label>
            <input type="radio" bind:group={value} value={symbol}>
            <span><Icon icon={symbol} size={42} /></span>
        </label>
    {/each}
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
    span {
        --size: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--size);
        height: var(--size);
        border-radius: var(--size);
        cursor: crosshair;
        margin: 5px;
        border: 6px solid var(--item-border-color);
        font-size: .8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        input:checked + & {
            box-shadow: 0 0 0 3px var(--input-border-color);
        }
    }

    @media (prefers-color-scheme: dark) {
        main {
            --input-border-color: rgba(255,255,255,.3);
            --item-border-color: #242424;
        }
    }
</style>
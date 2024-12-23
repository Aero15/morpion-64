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
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        grid-template-columns: repeat(4, 1fr);
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
        padding: .5rem;
        font-size: .8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: background .2s, color .2s, transform .2s;

        &:hover {
            background: light-dark(rgb(173, 20, 173), cyan);
            color: light-dark(#fff, #000);
            transform: scale(1.2);
            position: relative;
            z-index: 10;
        }

        input:checked + & {
            background: light-dark(#000, #fff);
            color: light-dark(#fff, #000);
        }
    }
</style>
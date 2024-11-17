<script lang="ts">
    import { Difficulty } from "$core/enums/Difficulty";
    import Icon from "$lib/shared/Icon.svelte";

    let { value = $bindable('') } = $props();

    const difficulties = Object.values(Difficulty);

    function getIconFor(item: Difficulty): string {
        switch (item) {
            case Difficulty.Peaceful:
                return 'emoji';
            case Difficulty.Easy:
                return 'check';
            case Difficulty.Medium:
                return 'user';
            case Difficulty.Hard:
                return 'bot';
            case Difficulty.Impossible:
                return 'disable';
            default:
                return 'question';
        }
    }

    function getTextFor(item: Difficulty): string {
        switch (item) {
            case Difficulty.Peaceful:
                return 'Paisible';
            case Difficulty.Easy:
                return 'Facile';
            case Difficulty.Medium:
                return 'Normale';
            case Difficulty.Hard:
                return 'Difficile';
            case Difficulty.Impossible:
                return 'Impossible';
            default:
                return '(Inconnue)';
        }
    }
</script>

<main>
    {#each difficulties as item}
        <label>
            <input type="radio" bind:group={value} value={item}>
            <div class="tile">
                <Icon icon={getIconFor(item)} size={42} />
                <span>{getTextFor(item)}</span>
            </div>
        </label>
    {/each}
</main>

<style>
    main {
        --input-border-color: rgba(0,0,0,.3);
        --item-border-color: #fff;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0rem;
        border: 1px solid var(--input-border-color);
        border-radius: 20px;
        padding: 10px;
        font-size: 0;
    }
    input[type="radio"] {
        display: none;
    }
    .tile {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        border-radius: .5rem;

        cursor: crosshair;
        margin: 5px;
        border: 6px solid var(--item-border-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 3px;

        input:checked + & {
            box-shadow: 0 0 0 3px var(--input-border-color);
        }

        span {
            display: block;
            margin-top: .5rem;
            font-size: .8rem;
            text-align: center;
        }
    }

    @media (prefers-color-scheme: dark) {
        main {
            --input-border-color: rgba(255,255,255,.3);
            --item-border-color: #242424;
        }
    }
</style>
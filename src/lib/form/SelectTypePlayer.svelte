<script lang="ts">
    import { PlayerType } from "$core/enums/PlayerType";
    import Icon from "$lib/shared/Icon.svelte";

    let { value = $bindable('') } = $props();

    const types = Object.values(PlayerType);

    function getIconFor(item: PlayerType): string {
        switch (item) {
            case PlayerType.Human:
                return 'user';
            case PlayerType.Bot:
                return 'bot';
            default:
                return 'question';
        }
    }

    function getTextFor(item: PlayerType): string {
        switch (item) {
            case PlayerType.Human:
                return 'Humain';
            case PlayerType.Bot:
                return 'Bot';
            default:
                return '(Inconnu)';
        }
    }
</script>

<main>
    {#each types as item}
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
        grid-template-columns: repeat(2, 1fr);
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
        aspect-ratio: 16/9.5;
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
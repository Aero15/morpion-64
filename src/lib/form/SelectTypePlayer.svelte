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
                return 'bot2';
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
                <Icon icon={getIconFor(item)} size={18} />
                <span>{getTextFor(item)}</span>
            </div>
        </label>
    {/each}
</main>

<style>
    main {
        display: grid;
        font-size: 0;
        gap: .25rem;
    }
    input[type="radio"] {
        display: none;
    }
    .tile {
        display: flex;
        justify-content: start;
        align-items: center;
        border-radius: 1rem;
        cursor: crosshair;
        padding: 1rem;
        gap: .5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 200px;
        transition: background .2s, color .2s;

        input:checked + & {
            background: light-dark(#000, #fff);
            color: light-dark(#fff, #000);
        }

        &:hover {
            background: light-dark(rgb(173, 20, 173), cyan);
            color: light-dark(#fff, #000);
        }

        span {
            display: block;
            font-size: .8rem;
            text-align: start;
        }
    }
</style>
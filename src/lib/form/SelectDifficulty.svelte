<script lang="ts">
    import { Difficulty } from "$core/enums/Difficulty";
    import Icon from "$lib/shared/Icon.svelte";
  import { _ } from "svelte-i18n";

    let { value = $bindable('') } = $props();

    const difficulties = Object.values(Difficulty);

    function getIconFor(item: Difficulty): string {
        switch (item) {
            case Difficulty.Peaceful:
                return 'cloud';
            case Difficulty.Easy:
                return 'emoji';
            case Difficulty.Medium:
                return 'user';
            case Difficulty.Hard:
                return 'bot2';
            case Difficulty.Impossible:
                return 'disable';
            default:
                return 'question';
        }
    }

    function getNameFor(difficulty: Difficulty): string {
        switch (difficulty) {
            case Difficulty.Peaceful:
                return $_('profile.difficulties.peaceful.name')
            case Difficulty.Easy:
                return $_('profile.difficulties.easy.name')
            case Difficulty.Medium:
                return $_('profile.difficulties.medium.name')
            case Difficulty.Hard:
                return $_('profile.difficulties.hard.name')
            case Difficulty.Impossible:
                return $_('profile.difficulties.impossible.name')
            default:
                return $_('common.unknown')
        }
    }

    function getTextFor(item: Difficulty): string {
        switch (item) {
            case Difficulty.Peaceful:
                return "Le bot place se positionnera de manière aléatoire";
            case Difficulty.Easy:
                return "Le bot utilisera très peu de stratégie";
            case Difficulty.Medium:
                return 'Le bot essaiera de gagner mais vous pourrez le battre';
            case Difficulty.Hard:
                return 'Le bot utilisera plusieurs techniques pour remporter la partie';
            case Difficulty.Impossible:
                return 'Le bot ne vous laissera aucune chance de gagner';
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
                <Icon icon={getIconFor(item)} size={32} />
                <div class="text">
                    <p class="name"><strong>{getNameFor(item)}</strong></p>
                    <p class="legend">{getTextFor(item)}</p>
                </div>
            </div>
        </label>
    {/each}
</main>

<style>
    main {
        display: grid;
        gap: .25rem;
        font-size: 0;
        overflow: clip;
    }
    input[type="radio"] {
        display: none;
    }
    .tile {
        display: flex;
        justify-content: start;
        align-items: start;
        cursor: crosshair;
        padding: 1rem;
        gap: .5rem;
        border-radius: 1rem;
        transition: background .2s, color .2s;

        input:checked + & {
            background: light-dark(#000, #fff);
            color: light-dark(#fff, #000);
        }

        &:hover {
            background: light-dark(rgb(173, 20, 173), cyan);
            color: light-dark(#fff, #000);
        }

        p {
            margin: 0;
            font-size: .8rem;
        }
    }
</style>
<script lang="ts">
    import Button from "$lib/form/Button.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import { slide } from "svelte/transition";
    import ToolBox from "./ToolBox.svelte";
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import Bot from "$core/entity/player/Bot.svelte";
  import { GameView } from "$core/enums/GameView";

    interface Props {
        game: GameEngine,
        currentView?: GameView
    }

    let {
        game = $bindable(new GameEngine([], 0, 0)),
        currentView = $bindable(GameView.Game)
    }: Props = $props();

    let botIsPlaying = $derived(game?.players.getCurrentPlayer() instanceof Bot)
</script>

<main class="bottom-bar">
    <div class="start">
        {#if game.endTime === undefined}
            {#if !botIsPlaying}
                <ToolBox bind:game compact />
            {:else}
                <div class="info" transition:slide>
                    <Icon icon="bot" size={34} />
                    <p><strong>{game.players.getCurrentPlayer()?.name}</strong> est en train de jouer...</p>
                </div>
            {/if}
        {:else}
            <p>TODO: Afficher gagnant/match nul</p>
        {/if}
    </div>

    <div class="end">
        {#if currentView == GameView.Leaderboard}
            <Button center variant="flat" shape="squared"
                title="Afficher la grille de jeu"
                onclick={() => currentView = GameView.Game}>
                <Icon icon="podium" size={32} />
            </Button>
        {/if}

        {#if currentView == GameView.Game}
            <Button center variant="flat" shape="squared"
                title="Afficher le classement"
                onclick={() => currentView = GameView.Leaderboard}>
                <Icon icon="dice" size={32} />
            </Button>
        {/if}
    </div>
</main>

<style>
    .bottom-bar {
        position: fixed;
        inset: auto .5rem .5em;
        padding: .5rem;
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        gap: .5rem;
        background: light-dark(#ffffff17, #00000017);
        border: 1px solid light-dark(#00000055, #ffffff55);
        border-radius: 1rem;
        backdrop-filter: blur(10px);
        z-index: 10;

        .end {
            display: flex;
            justify-content: end;
        }

        .start :global(button) {
            box-shadow: 0 0 0 1px light-dark(#00000055, #ffffff44) inset,
                0 3px 7px #00000022;
        }
    }
</style>
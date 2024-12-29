<script lang="ts">
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import AvatarPlayer from "$lib/player/AvatarPlayer.svelte";
    import Bot from "$core/entity/player/Bot.svelte";
    import { GameView } from "$core/enums/GameView";
    import Button from "$lib/form/Button.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import Halo from "$lib/shared/Halo.svelte";
    import { slide } from "svelte/transition";
    import ToolBox from "./ToolBox.svelte";

    interface Props {
        game: GameEngine,
        currentView?: GameView
    }

    let {
        game = $bindable(new GameEngine([], 0, 0)),
        currentView = $bindable(GameView.Game)
    }: Props = $props();

    let player = $derived(game?.players.getCurrentPlayer())
    let botIsPlaying = $derived(player instanceof Bot)
    let halo = $derived(game.endTime === undefined && botIsPlaying)
</script>

<main class="bx-bottom_bar">
    <Halo borderWidth=".25rem" cornerRadius="1rem" visible={halo}>
        <div class="bar-content" class:with-halo={halo}>
            <div class="start">
                {#if game.endTime === undefined}
                    {#if !botIsPlaying}
                        <ToolBox bind:game compact />
                    {:else}
                        <div class="info botPlaying" transition:slide>
                            <AvatarPlayer
                                name={ player!.name }
                                color={ player!.color }
                                symbol={ player!.symbol }
                                type={ player!.type }
                                shape="circular"
                                compact tinted
                            />
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
        </div>
    </Halo>
</main>

<style>
    .bx-bottom_bar {
        position: fixed;
        inset: auto .5rem .5em;
        z-index: 10;
        
        .bar-content {
            padding: .5rem;
            display: flex;
            align-items: stretch;
            justify-content: space-between;
            gap: .5rem;
            border-radius: 1rem;
            backdrop-filter: blur(10px);

            &.with-halo {
                background: light-dark(#ffffff99, #00000099);
                border: 1px solid light-dark(#000000aa, #ffffffaa);
            }
            &:not(.with-halo) {
                background: light-dark(#ffffff17, #00000017);
                border: 1px solid light-dark(#00000055, #ffffff55);
            }
        }

        .end {
            display: flex;
            justify-content: end;
        }

        .start :global(button) {
            border-color: light-dark(#00000055, #ffffff44);
            box-shadow: 0 3px 7px #00000022;
        }

        .info {
            display: flex;
            align-items: center;
            justify-content: start;
            gap: 1rem;

            p {
                margin: 0;
                font-size: .8em;
            }
        }
    }
</style>
<script lang="ts">
    import Bot from "$core/entity/player/Bot.svelte";
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import type Point from "$core/entity/board/Point.svelte";
    import Grid from "$lib/game/Grid.svelte";
    import { push } from "svelte-spa-router";
    import Icon from "$lib/shared/Icon.svelte";
    import Button from "$lib/form/Button.svelte";
    import PlayerTurn from "$lib/player/PlayerTurn.svelte";
    import { fade, scale, slide } from "svelte/transition";
    import Hero from "$lib/shared/Hero.svelte";
    import AvatarPlayer from "$lib/player/AvatarPlayer.svelte";
    import { onMount } from "svelte";
    import { newGameWithSelectedPlayers } from "$core/helpers/Game.svelte";
    import GameStatus from "$lib/game/GameStatus.svelte";
    import Jumbo from "$lib/shared/Jumbo.svelte";
    import Leaderboard from "$lib/game/Leaderboard.svelte";
    import ToolBox from "$lib/game/ToolBox.svelte";

    let game: GameEngine = $state(undefined);

    let g = newGameWithSelectedPlayers()
    if (g != null) {
        game = g
    }

    let botIsPlaying = $derived(game?.players.getCurrentPlayer() instanceof Bot)

    onMount(() => {
        return () => {
            game.stop()
            game.players.clearTemporaryScore()
        };
    })
</script>

<Jumbo>
    <span></span>
</Jumbo>

<main id="pg-game">
    <Hero icon="dice" title="Morpion" subtitle={game.winnerInfo === undefined ? "C'est parti !" : "Partie terminée !"}>
        <GameStatus bind:game />

        <div>
            {#if game.endTime === undefined} <!-- Partie en cours -->
                {#if !botIsPlaying}
                    <ToolBox bind:game />
                {:else}
                    <div class="info" transition:slide>
                        <Icon icon="info" size={20} />
                        <span>{game.players.getCurrentPlayer()?.name} est en train de jouer...</span>
                    </div>
                {/if}
            {/if}

            {#if game.endTime !== undefined}
                {#if game.winnerInfo !== undefined && game.players.getCurrentPlayer() !== null}
                    {@const player = game.players.getCurrentPlayer()!}
                    <div class="winner" transition:slide>
                        <h3>Bravo !</h3>
                        <div class="ident">
                            <AvatarPlayer
                                name={ player.name }
                                color={ player.color }
                                symbol={ player.symbol }
                                type={ player.type }
                            />
                            <Icon icon="thumb_up" size={90} />
                        </div>
                        <p>{ player.name } a gagné !</p>
                    </div>
                {/if}

                {#if game.winnerInfo === undefined}
                    <div class="winner" transition:slide>
                        <h3>Match nul !</h3>
                        <div class="ident">
                            <Icon icon="thumb_down" size={90} />
                        </div>
                        <p>Pas de gagnant 😥</p>
                    </div>
                {/if}
            {/if}
        </div>

        <Leaderboard bind:game />
    </Hero>

    <div class="flex" in:scale>
        <Grid bind:game />
    </div>

    <div in:fade={{delay: 250}}>
        <h3>Participants</h3>
        <PlayerTurn bind:game />
    </div>
</main>

<style>
    #pg-game {
        display: grid;
        grid-template-columns: 350px 1fr 350px;
        align-items: start;
        gap: 2rem;
        margin-top: -4.75rem;
    }

    .flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info {
        display: flex;
        align-items: center;
        gap: .5rem;
        font-size: .9em;
        color: var(--main_color);
    }

    .winner {
        text-align: center;
        font-size: .9em;

        .ident {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: .5rem;
        }

        h3, p { margin: 0; }
        h3 {font-size: 3em;}
    }

    @media (prefers-color-scheme: dark) {
        .info {
            color: var(--main_color_bright);
        }
    }
</style>
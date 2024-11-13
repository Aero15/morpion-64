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
    import { selectedPlayers } from "$core/store/players.svelte";
    import AvatarPlayer from "$lib/player/AvatarPlayer.svelte";
    import { gridSize } from "$core/store/settings.svelte";

    let game: GameEngine = $state(undefined);

    initGame()

    let botIsPlaying = $derived(game?.players.getCurrentPlayer() instanceof Bot)

    function onCellClick(position: Point) {
        game.playMoveAt(position)
    }

    function initGame() {
        if (selectedPlayers.length < 2) {
            push('/')
            return
        }
        
        game = new GameEngine([
            /*//new Human("Bob", Symbols.Circle, "blue"),
            new Bot("Cortana", Symbols.Cross, "red", Difficulty.Medium),
            ...listPlayers.slice(0, 3)*/

            ...selectedPlayers
        ], gridSize.x, gridSize.y);
    }

    function abandon() {
        push('/')
    }
</script>

<main>
    <Hero icon="dice" title="Morpion" subtitle={game.winnerSymbol === null ? "C'est parti !" : "Partie terminée !"}>
        <div class="actions" in:fade>
            <Button onclick={initGame} center variant="primary">
                <Icon icon="rotate" size={18} />
                <span>Recommencer</span>
            </Button>
            <Button onclick={abandon} center>
                <Icon icon="cross" size={18} />
                <span>Quitter</span>
            </Button>
        </div>

        <div>
            {#if game.endTime === undefined} <!-- Partie en cours -->
                {#if !botIsPlaying}
                    <div class="tools" transition:slide>
                        <Button onclick={() => game.eraserEnabled = false} center>
                            <Icon icon="gps_fix" size={32} />
                            <span>Placer</span>
                            <div class="indicator" style:opacity={!game.eraserEnabled ? 1 : 0}></div>
                        </Button>

                        <Button onclick={() => game.eraserEnabled = true} center>
                            <Icon icon="gps_slash" size={32} />
                            <span>Effacer</span>
                            <div class="indicator" style:opacity={game.eraserEnabled ? 1 : 0}></div>
                        </Button>

                        <Button center>
                            <Icon icon="info" size={32} />
                            <span>Astuce</span>
                        </Button>
                    </div>
                {:else}
                    <div class="info" transition:slide>
                        <Icon icon="info" size={20} />
                        <span>{game.players.getCurrentPlayer()?.name} est en train de jouer...</span>
                    </div>
                {/if}
            {/if}

            {#if game.endTime !== undefined}
                {#if game.winnerSymbol !== null && game.players.getCurrentPlayer() !== null}
                    {@const player = game.players.getCurrentPlayer()}
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

                {#if game.winnerSymbol === null}
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
    </Hero>

    <div class="flex" in:scale>
        <Grid
            lock={botIsPlaying || game.winnerSymbol !== null}
            displayHalo={game.endTime === undefined && botIsPlaying}
            bind:grid={game.board.grid}
            bind:eraserEnabled={game.eraserEnabled}
            onCellClick={onCellClick}
        />
    </div>

    <div in:fade={{delay: 250}}>
        <h3>Participants</h3>
        <PlayerTurn
            players={game.players.list()}
            bind:currentTurn={game.players.currentTurn}
        />
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 350px 1fr 350px;
        align-items: start;
        gap: 2rem;
    }

    .flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .actions {
        display: grid;
        gap: .5rem;

        :global(button:first-child) {
            padding-block: 1rem;
        }
    }

    .info {
        display: flex;
        align-items: center;
        gap: .5rem;
        font-size: .9em;
        color: var(--main_color);
    }

    .tools {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: .5rem;

        :global {
            button {
                display: grid;
                place-content: center;
                aspect-ratio: 1;
                position: relative;

                span {
                    font-size: .8em;
                }

                .indicator {
                    position: absolute;
                    inset: auto 0 3px 0;
                    border-radius: 50px;
                    background-color: var(--main_color_bright);
                    height: 4px;
                    width: 30px;
                    margin: auto;
                }
            }
        }
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
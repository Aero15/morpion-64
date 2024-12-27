<script lang="ts">
    import { onMount } from "svelte";
    import Grid from "$lib/game/Grid.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import Jumbo from "$lib/shared/Jumbo.svelte";
    import Winner from "$lib/game/Winner.svelte";
    import ToolBox from "$lib/game/ToolBox.svelte";
    import Bot from "$core/entity/player/Bot.svelte";
    import { scale, slide } from "svelte/transition";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import Panel from "$lib/shared/panel/Panel.svelte";
    import GameStatus from "$lib/game/GameStatus.svelte";
    import PlayerTurn from "$lib/player/PlayerTurn.svelte";
    import Leaderboard from "$lib/game/Leaderboard.svelte";
    import Responsive from "$lib/shared/Responsive.svelte";
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import PanelSection from "$lib/shared/panel/PanelSection.svelte";
    import { newGameWithSelectedPlayers } from "$core/helpers/Game.svelte";

    let size: BreakpointSize = $state('sm');
    let game: GameEngine = $state(undefined);
    let displayRanking = $state(false);

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

    $effect(() => {
        // Display the ranking when the game is over
        displayRanking = game.endTime !== undefined
    })
</script>

<Responsive bind:size />

{#if !['sm', 'md', 'lg'].includes(size)}
    <Jumbo>
        <span></span>
    </Jumbo>
{/if}

<main id="pg-game">
    <div class="topbar">
        <GameStatus bind:game />
        <PlayerTurn bind:game compact />
    </div>

    <PageWrap>
        <div id="gameCenter">
            <aside class="panel">
                <Panel>
                    <PanelSection icon="play" open
                        title={game.endTime === undefined ? "Partie en cours" : "Partie terminée"} >
                        <div class="pane-content">
                            <GameStatus bind:game />
                        </div>
                    </PanelSection>

                    <PanelSection title="Classement" icon="podium" variant="transparent" bind:open={displayRanking}>
                        <div class="pane-content">
                            <Leaderboard bind:game limit={3} />
                        </div>
                    </PanelSection>
                </Panel>

                <Panel>
                    <PanelSection title={game.endTime === undefined ? "Ordre de passage" : "Résultat"} icon="profile" open>
                        <div class="pane-content">
                            {#if game.endTime === undefined}
                                <PlayerTurn bind:game compact />
                            {/if}
                            {#if game.endTime !== undefined}
                                <Winner bind:game />
                            {/if}
                        </div>
                    </PanelSection>

                    {#if game.endTime === undefined}
                        <PanelSection title="Outils" icon="menu_dots" variant="tinted" open>
                            <div class="pane-content">
                                {#if !botIsPlaying}
                                    <ToolBox bind:game />
                                {:else}
                                    <div class="info" transition:slide>
                                        <Icon icon="bot" size={34} />
                                        <p><strong>{game.players.getCurrentPlayer()?.name}</strong> est en train de jouer...</p>
                                    </div>
                                {/if}
                            </div>
                        </PanelSection>
                    {/if}
                </Panel>
            </aside>

            <div class="game" in:scale>
                <Grid bind:game />
            </div>
        </div>
    </PageWrap>
</main>

<style>
    #pg-game {
        .topbar {
            display: grid;
            gap: .25rem;
            padding: 1rem;
        }

        #gameCenter {
            display: grid;
            gap: .5rem;
            align-items: flex-start;

            .panel {
                display: none;
                transition: margin .5s;

                .pane-content {
                    padding: 0 1rem 1rem;
                }
            }

            .game {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                z-index: 5;
            }
        }

        .info {
            display: grid;
            align-items: center;
            gap: .5rem;
            font-size: .78em;
            color: light-dark(var(--main_color), var(--main_color_bright));
            justify-content: center;
            place-items: center;
            margin-top: -1rem;

            p {margin: 0;}
            strong {color: light-dark(#ab00ce, #fff);}
        }
    }

    @media (width >= 640px) {
        #pg-game .topbar { display: none; }

        #pg-game #gameCenter {
            grid-template-columns: 300px 1fr;
            align-items: start;
            gap: 1rem;

            .panel {
                display: grid;
                place-content: start stretch;
                gap: 1rem;
            }
        }
    }

    @media (width >= 1024px) {
        #pg-game {
            margin-top: -86px;
        }
    }
</style>
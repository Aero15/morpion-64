<script lang="ts">
    import { _ } from "svelte-i18n";
    import { onMount } from "svelte";
    import Grid from "$lib/game/Grid.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import Winner from "$lib/game/Winner.svelte";
    import ToolBox from "$lib/game/ToolBox.svelte";
    import { GameView } from "$core/enums/GameView";
    import Bot from "$core/entity/player/Bot.svelte";
    import { fade, scale, slide } from "svelte/transition";
    import Panel from "$lib/shared/panel/Panel.svelte";
    import BottomBar from "$lib/game/BottomBar.svelte";
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

    // View mode for smartphone
    let currentView = $state(GameView.Game);

    onMount(() => {
        return () => {
            game.stop()
            game.players.clearTemporaryScore()
        };
    })

    $effect(() => {
        // Display the ranking when the game is over
        displayRanking = game.endTime !== undefined

        // Display the game when the current player is not a bot
        if (botIsPlaying) {
            currentView = GameView.Game
        }
    })
</script>

<Responsive bind:size />

<main id="pg-game" class="gradient-grid"
    class:sm={size == 'sm'}
    class:center={currentView == GameView.Game || size != 'sm'}
>
    <div class="top-bar">
        <GameStatus bind:game
            orientation={['sm'].includes(size) ? 'vertical' : 'horizontal'} />
        <PlayerTurn bind:game compact
            limit={size == 'sm' ? 2 : 3} />
    </div>

    <div id="gameCenter">
        <aside class="panel">
            <Panel>
                <PanelSection icon="play" open
                    title={game.endTime === undefined ? $_('game.message.game_is_running') : $_('game.message.game_is_finished') } >
                    <div class="pane-content">
                        <GameStatus bind:game />
                    </div>
                </PanelSection>

                <PanelSection
                    title={ $_('ranking.title') }
                    icon="podium"
                    variant="transparent"
                    bind:open={displayRanking}
                >
                    <div class="pane-content">
                        <Leaderboard bind:game compact limit={3} />
                    </div>
                </PanelSection>
            </Panel>

            <Panel>
                <PanelSection title={game.endTime === undefined ? $_('game.running_order') : $_('game.result') }
                    icon="profile" open>
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
                    <PanelSection title={ $_('game.tools.name') } icon="menu_dots" variant="transparent" open>
                        <div class="pane-content">
                            {#if !botIsPlaying}
                                <ToolBox bind:game />
                            {:else}
                                {@const message = $_('game.message.player_is_playing').split('{name}') }
                                <div class="info" transition:slide style:color={game.players.getCurrentPlayer()?.color}>
                                    <Icon icon={game.players.getCurrentPlayer()?.symbol || 'bot2'} size={44} />
                                    <p>
                                        {#each message as text}
                                            {#if text.length > 0}
                                                {text}
                                            {:else}
                                                <strong>{game.players.getCurrentPlayer()?.name}</strong>
                                            {/if}
                                        {/each}
                                    </p>
                                </div>
                            {/if}
                        </div>
                    </PanelSection>
                {/if}
            </Panel>
        </aside>

        <div class="page" in:scale
            class:game={size != 'sm' || (['sm'].includes(size) && currentView == GameView.Game)}
            class:leaderboard={size == 'sm' && currentView == GameView.Leaderboard}
        >
            {#if size != 'sm' || (['sm'].includes(size) && currentView == GameView.Game)}
                <div in:fade class="tab-game">
                    <Grid bind:game
                        flat={size == 'sm'}
                        compact={['sm', 'md', 'lg'].includes(size)} />
                </div>
            {/if}
            
            {#if ['sm'].includes(size) && currentView == GameView.Leaderboard}
                <div in:fade class="tab-leaderboard">
                    <div class="title">
                        <Icon icon="podium" size={24} />
                        <h2>{ $_('ranking.title') }</h2>
                    </div>
                    <Leaderboard bind:game hightlightFirstRows />
                </div>
            {/if}
        </div>
    </div>

    {#if size == 'sm'}
        <BottomBar bind:game bind:currentView />
    {/if}
</main>

<style>
    #pg-game {
        min-height: 100vh;
        display: flex;
        background-position: center center;
        
        --color_gradient: linear-gradient(
            to right bottom,
            light-dark(#b6fffb, #006e72),
            light-dark(#e2e2e2, #0a1a25),
            light-dark(#9ec6ff, #003a8b),
            light-dark(#e2e2e2, #120727),
            light-dark(#f8caf3, #830074)
        );

        &.sm {
            padding: 105px 0 76px;
            min-height: calc(100vh - (105px + 76px));

            &.center {
                align-items: center;
                flex-direction: column;
                justify-content: center;
            }

            &:has(.page.leaderboard) {
                flex: 1;
                padding: 7.25rem 1rem 6rem;
                min-height: calc(100vh - (7.25rem + 6rem));
                display: grid;
            }
        }

        &:not(.sm).center {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .top-bar {
            position: fixed;
            inset: 0 0 auto;
            z-index: 10;
            gap: .25rem;
            padding: 1rem 1rem .5rem;
            display: flex;
            align-items: start;
            flex-flow: row-reverse;
            justify-content: space-between;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 15px #00000033;
            background: light-dark(#ffffff33, #00000033);
            border-bottom: 1px solid light-dark(#00000055, #ffffff55);
        }

        #gameCenter {
            display: grid;
            gap: .5rem;
            align-items: flex-start;

            .panel {
                display: none;

                .pane-content {
                    padding: 0 1rem 1rem;
                }
            }

            .page {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                z-index: 5;

                .tab-leaderboard {
                    flex: 1;
                    max-width: 400px;

                    .title {
                        display: flex;
                        align-items: center;
                        gap: .5rem;
                        margin-bottom: 1rem;

                        h2 {
                            margin: 0;
                        }
                    }
                }
            }
        }

        .info {
            display: grid;
            align-items: center;
            font-size: .78em;
            color: light-dark(var(--main_color), var(--main_color_bright));
            justify-content: center;
            place-items: center;
            margin-top: -1.5rem;

            p {margin: 0;}
            strong {color: light-dark(#000, #fff);}
        }
    }

    @media (width >= 640px) {
        #pg-game .top-bar { display: none; }

        #pg-game #gameCenter {
            grid-template-columns: 300px 1fr;
            align-items: start;

            &, .panel {
                gap: 1rem;
            }

            .panel {
                display: grid;
                place-content: start stretch;
            }
        }
    }

    @media (width >= 1024px) {
        #pg-game #gameCenter {
            &, .panel {
                gap: 2rem;
            }
        }
    }
</style>
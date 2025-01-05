<script lang="ts">
    import { displayPlayersWithoutScore } from "$core/store/settings.svelte";
    import { listBots, listPlayers } from "$core/store/players.svelte";
    import PanelSection from "$lib/shared/panel/PanelSection.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import Responsive from "$lib/shared/Responsive.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import Panel from "$lib/shared/panel/Panel.svelte";
    import TabBar from "$lib/shared/TabBar.svelte";
    import Ranking from "$lib/rank/Ranking.svelte";
    import Button from "$lib/form/Button.svelte";
    import Jumbo from "$lib/shared/Jumbo.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import { scale } from "svelte/transition";
    import { push } from "svelte-spa-router";
    import { _ } from "svelte-i18n";

    let players = $derived.by(() => {
        let results = [];

        if ([Categories.Humans, Categories.General].includes(selectedTab)) {
            results.push(...listPlayers)
        }

        if ([Categories.Bots, Categories.General].includes(selectedTab)) {
            results.push(...listBots)
        }

        return results
    });

    let avgScore = $derived(players.reduce((acc, player) => acc + player.score, 0) / players.length)
    let maxScore = $derived(Math.max(...players.map(player => player.score)))

    let Categories = {
        General: 0,
        Humans: 1,
        Bots: 2
    }
    let selectedTab = $state(Categories.General)
    let tabs = [
        { name: $_('ranking.categories.general'), icon: 'asterisk', id: Categories.General },
        { name: $_('players.sections.humans'), icon: 'user', id: Categories.Humans },
        { name: $_('players.sections.bots'), icon: 'bot2', id: Categories.Bots },
    ]

    let size: BreakpointSize = $state('sm')

    function resetAllScores() {
        if (confirm($_('ranking.confirm_reset_score'))) {
            listPlayers.forEach(player => player.score = 0)
            listBots.forEach(bot => bot.score = 0)
        }
    }

    function toggleDisplayPlayersWithoutScore() {
        displayPlayersWithoutScore.set(!$displayPlayersWithoutScore)
    }
</script>

<Responsive bind:size />

{#if size != 'sm'}
    <Jumbo icon="podium" title={ $_('ranking.title') }>
        <span></span>
    </Jumbo>
{/if}

{#snippet actions()}
    {#if maxScore > 0}
        {#if $displayPlayersWithoutScore}
            <Button center variant="primary"
                onclick={toggleDisplayPlayersWithoutScore}>
                <Icon icon="hide" size={20} />
                <p>{ $_('ranking.hide_players_without_score') }</p>
            </Button>
        {:else}
            <Button center variant="primary"
                onclick={toggleDisplayPlayersWithoutScore}>
                <Icon icon="eye" size={20} />
                <p>{ $_('ranking.show_players_without_score') }</p>
            </Button>
        {/if}

        <Button center
            onclick={resetAllScores}>
            <Icon icon="bin" size={20} />
            <p>{ $_('ranking.reset_scores') }</p>
        </Button>
    {/if}

    {#if players.length < 1}
        <Button variant="primary" center
            onclick={() => push('/players/0')}>
            <Icon icon="plus" size={20} />
            <p>{ $_('players.create_profile') }</p>
        </Button>
    {/if}

    {#if players.length > 0 && maxScore < 1}
        <Button variant="primary" center
            onclick={() => push('/new-game/grid')}>
            <Icon icon="play" size={20} />
            <p>{ $_('home.new_game.title') }</p>
        </Button>
    {/if}
{/snippet}

<PageWrap>
    <div id="pg-ranking">
        <div class="tabs">
            <TabBar {tabs} bind:selectedId={selectedTab}
                variant={['sm'].includes(size) ? 'squared' : 'rounded'} />
        </div>

        <div class="toolbar">
            {@render actions()}
        </div>

        <div class="panel" in:scale={{duration: 250}}>
            <Panel>
                <PanelSection title={ $_('common.informations') } icon="info" open>
                    <div class="infos">
                        <Icon icon="podium" size={100} />
                    </div>

                    <div class="stats">
                        {#snippet score(value: number, legend: string)}
                            <div class="score">
                                <p>
                                    <strong class="value">{value.toFixed(0)}</strong>
                                    <span>pts</span>
                                </p>
                                <p class="legend"><strong>{legend}</strong></p>
                            </div>
                        {/snippet}

                        {@render score(maxScore, $_('ranking.maximum'))}
                        {@render score(avgScore, $_('ranking.average'))}
                    </div>
                </PanelSection>

                <PanelSection title={ $_('common.actions') } icon="play" variant="tinted" open>
                    <div class="actions">
                        {@render actions()}
                    </div>
                </PanelSection>
            </Panel>
        </div>
        
        {#key selectedTab || $displayPlayersWithoutScore}
            <Ranking {players} displayType tilesMode />
        {/key}
    </div>
</PageWrap>

<style>
    #pg-ranking {
        display: grid;
        gap: 1rem;

        .panel { display: none; transition: margin .5s; }
        .toolbar { display: grid; }
        .actions {
            display: grid;
            padding: 0 1rem 1rem;
        }

        .toolbar, .actions {
            gap: .25rem;

            p {
                margin: 0;
                font-size: .9em;
                text-align: start;
                width: calc(100% - 2rem);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            :global(button) {
                padding: .75rem 1rem;
                justify-content: start;
            }
        }

        .infos {
            display: grid;
            place-items: center;
            padding: 1.5rem 0 1rem;
            gap: .5rem;
        }

        .stats {
            display: flex;
            flex-flow: wrap;
            justify-content: center;
            gap: 2rem;
            text-align: center;
            padding-bottom: 2rem;

            .score {
                display: grid;

                p {
                    margin: 0;

                    .value {
                        font-size: 1.5em;
                        background: linear-gradient(
                            to right,
                            light-dark(rgb(255, 0, 200), rgb(255, 145, 243)),
                            light-dark(rgb(0, 153, 255), cyan)
                        );
                        background-clip: text;
                        color: transparent;
                    }

                    span {
                        font-size: .75em;
                    }

                    &.legend {
                        font-size: .7em;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                    }
                }
            }
        }
    }

    @media (width >= 640px) {
        #pg-ranking {
            grid-template-columns: 300px 1fr;
            align-items: start;
            gap: 1rem;
            transition: gap .5s;

            .toolbar { display: none; }

            .tabs {
                grid-column: 1/3;
                margin-top: -52px;
            }

            .panel {
                display: grid;
                place-content: start stretch;
            }
        }
    }

    @media (width >= 1024px) {
        #pg-ranking {
            gap: 3rem;
            .panel {
                margin-top: -289px;
            }
        }
    }
</style>
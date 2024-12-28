<script lang="ts">
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

    let players = $derived.by(() => {
        let results = [];
        
        if (selectedTab === Categories.Humans || selectedTab === Categories.General) {
            results.push(...listPlayers)
        }

        if (selectedTab === Categories.Bots || selectedTab === Categories.General) {
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
        { name: 'Général', icon: 'asterisk', id: Categories.General },
        { name: 'Humains', icon: 'user', id: Categories.Humans },
        { name: 'Bots', icon: 'bot', id: Categories.Bots },
    ]

    let size: BreakpointSize = $state('sm')

    function resetAllScores() {
        if (confirm('Voulez-vous vraiment réinitialiser les scores ?')) {
            listPlayers.forEach(player => player.score = 0)
            listBots.forEach(bot => bot.score = 0)
        }
    }
</script>

<Responsive bind:size />

{#if size != 'sm'}
    <Jumbo icon="podium" title="Classement">
        <span></span>
    </Jumbo>
{/if}

{#snippet actions()}
    {#if maxScore > 0}
        <Button variant="primary" center
            onclick={resetAllScores}>
            <Icon icon="bin" />
            Réinitialiser les scores
        </Button>
    {/if}

    {#if players.length < 1}
        <Button variant="primary" center
            onclick={() => push('/players')}>
            <Icon icon="plus" />
            Créer des joueurs
        </Button>
    {/if}

    {#if players.length > 0 && maxScore < 1}
        <Button variant="primary" center
            onclick={() => push('/opponents')}>
            <Icon icon="play" />
            Lancer une partie
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
                <PanelSection title="Informations" icon="info" open>
                    <div class="infos">
                        <Icon icon="podium" size={100} />
                    </div>

                    <div class="stats">
                        {#snippet score(value: number, legend: string)}
                            <div class="score">
                                <p>
                                    <strong class="value">{value}</strong>
                                    <span>pts</span>
                                </p>
                                <p class="legend"><strong>{legend}</strong></p>
                            </div>
                        {/snippet}

                        {@render score(maxScore, 'Maximum')}
                        {@render score(avgScore, 'Moyenne')}
                    </div>
                </PanelSection>

                <PanelSection title="Actions" icon="play" variant="tinted">
                    <div class="actions">
                        {@render actions()}
                    </div>
                </PanelSection>
            </Panel>
        </div>
        
        {#key selectedTab}
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
            gap: .25rem;
            padding: 0 1rem 1rem;
        }

        .toolbar, .actions {
            :global(button) {
                padding: 1rem 1.2rem;
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

                .tabs {
                    padding-bottom: 1.75rem;
                }
            }
        }
    }

    @media (width >= 1024px) {
        #pg-ranking {
            gap: 3rem;
            .panel {
                margin-top: -266px;
            }
        }
    }
</style>
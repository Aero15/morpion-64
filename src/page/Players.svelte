<script lang="ts">
    import type Player from "$core/entity/player/Player.svelte";
    import { filterListPlayersWith } from "$core/helpers/Players.svelte";
    import { listBots, listPlayers } from "$core/store/players.svelte";
    import ListPlayers from "$lib/player/ListPlayers.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import Panel from "$lib/shared/panel/Panel.svelte";
    import Button from "$lib/form/Button.svelte";
    import { fade, scale } from "svelte/transition";
    import Icon from "$lib/shared/Icon.svelte";
    import { push } from "svelte-spa-router";
    import Jumbo from "$lib/shared/Jumbo.svelte";
    import SearchBar from "$lib/shared/SearchBar.svelte";
    import Responsive from "$lib/shared/Responsive.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import PanelSection from "$lib/shared/panel/PanelSection.svelte";
    import Collapse from "$lib/shared/Collapse.svelte";
    import { _ } from "svelte-i18n";

    let size: BreakpointSize = $state('sm')
    let searchValue: string = $state('')
    let isSearching: boolean = $derived(searchValue.length > 0)
    let bots: Player[] = $derived(isSearching ? filterListPlayersWith(searchValue, listBots) : listBots)
    let humans: Player[] = $derived(isSearching ? filterListPlayersWith(searchValue, listPlayers) : listPlayers)
    let globalCount: number = $derived(bots.length + humans.length)
    let subtitle: string = $derived(isSearching ?
        $_('players.search.count_players_found', {values: { count: globalCount }}) :
        $_('players.count_players', {values: { count: globalCount }})
    )

    function openEditor() {
        push('/players/0')
    }

    function onPlayerClick(id: number) {
        push('/players/' + id)
    }
</script>

<Responsive bind:size />

<Jumbo icon="user" title={ $_('players.title') } >
    <span></span>
</Jumbo>

<SearchBar overlap thick
    bind:value={searchValue}
    placeholder={ $_('players.search.placeholder') } />

<PageWrap>
    <div id="pg-players">
        <div class="toolbar">
            <Button variant="primary" center
                onclick={openEditor}>
                <Icon icon="plus" />
                { $_('players.create_profile') }
            </Button>
        </div>

        <div class="panel" in:scale={{duration: 250}}>
            <Panel>
                <PanelSection title={ $_('common.informations') } icon="info" open>
                    <div class="infos">
                        <Icon icon={ isSearching ? 'search' : 'user' } size={100} />
                        <h3>{subtitle}</h3>
                    </div>
                </PanelSection>

                <PanelSection title={ $_('common.actions') } icon="play" open variant="tinted">
                    <div class="actions">
                        <Button variant="primary" center
                            onclick={openEditor}>
                            <Icon icon="plus" />
                            { $_('players.create_profile') }
                        </Button>
                    </div>
                </PanelSection>
            </Panel>
        </div>
    
        <div in:fade={{duration: 200, delay: 100}} class="sections"
            class:space={ !['sm', 'md', 'lg'].includes(size) }
            class:cols-2={ ['xl', '2xl'].includes(size) }>
            <Collapse title={ $_('players.sections.humans') } icon="user" open
                subtitle={ $_('players.search.count_results', {values: { count: humans.length }}) }
            >
                {#if humans.length > 0}
                    <ListPlayers players={humans} {onPlayerClick} />
                {:else}
                    <div class="empty">
                        <Icon icon="user" size={64} />
                        <p>{ $_('players.no_players_to_display') }</p>
                        <Button variant="primary" center
                            onclick={openEditor}>
                            <Icon icon="plus" />
                            { $_('players.create_profile') }
                        </Button>
                    </div>
                {/if}
            </Collapse>
            
            <Collapse title={ $_('players.sections.bots') } icon="bot2" open
                subtitle={ $_('players.search.count_results', {values: { count: bots.length }}) }
            >
                {#if bots.length > 0}
                    <ListPlayers players={bots} {onPlayerClick} />
                {:else}
                    <div class="empty">
                        <Icon icon="bot2" size={64} />
                        <p>{ $_('players.no_bots_to_display') }</p>
                        <Button variant="primary" center
                            onclick={openEditor}>
                            <Icon icon="plus" />
                            { $_('players.create_bot') }
                        </Button>
                    </div>
                {/if}
            </Collapse>
        </div>
    </div>
</PageWrap>

<style>
    .infos {
        display: grid;
        place-items: center;
        padding: 3rem 0 5rem;
        gap: .5rem;

        h3 {
            margin: 0;
        }
    }

    #pg-players {
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

        .sections {
            display: grid;
            align-items: start;
            gap: 1rem;

            &.cols-2 {
                grid-template-columns: 1fr 1fr;
            }

            &.space :global(.bx-collapse .bx-content) {
                padding: 2rem;
            }
        }

        .empty {
            text-align: center;
            padding: 1rem 0;

            p {
                margin: .25rem 0 1.5rem;
                font-size: .9em;
            }

            :global(button) {
                padding: 1rem 1.2rem;
            }
        }
    }

    @media (width >= 500px) {
        #pg-players {
            grid-template-columns: 300px 1fr;
            align-items: start;
            gap: 1rem;

            .toolbar { display: none; }

            .panel {
                display: grid;
                place-content: start stretch;
            }
        }
    }

    @media (width >= 1300px) {
        #pg-players .panel {
            margin-top: -228px;
        }
    }
</style>
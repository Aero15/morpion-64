<script lang="ts">
    import {
        clearSelectedPlayers,
        filterListPlayersWith,
        selectPlayerById
    } from "$core/helpers/Players.svelte";
    import {
        listBots,
        selectedPlayers,
        listPlayers
    } from "$core/store/players.svelte";
    import { _ } from "svelte-i18n";
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import Icon from "$lib/shared/Icon.svelte";
    import Button from "$lib/form/Button.svelte";
    import TabBar from "$lib/shared/TabBar.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import SearchBar from "$lib/shared/SearchBar.svelte";
    import Responsive from "$lib/shared/Responsive.svelte";
    import { fade, scale, slide } from "svelte/transition";
    import ListPlayers from "$lib/player/ListPlayers.svelte";
    import Pagination from "$lib/new-game/Pagination.svelte";
    import { randomBetween } from "$core/helpers/Math.svelte";
    import type Player from "$core/entity/player/Player.svelte";
    import NavigButtons from "$lib/new-game/NavigButtons.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import ProgressNbPlayers from "$lib/new-game/ProgressNbPlayers.svelte";
    import SelectedParticipants from "$lib/player/SelectedParticipants.svelte";
    import { FilterPlayers, selectedFilterPlayers } from "$core/store/settings.svelte";

    let size: BreakpointSize = $state('sm');

    let pageIndex = 1

    let searchValue: string = $state('')
    let isSearching: boolean = $derived(searchValue.length > 0)

    // Global tabs
    let Tabs = {
        Available: 0,
        Preview: 1,
    }
    let tabs = [
        { name: $_('assistant.participants.available'), icon: 'profile', id: Tabs.Available },
        { name: $_('assistant.participants.selected'), icon: 'checkbox', id: Tabs.Preview },
    ]
    let selectedId = $state(Tabs.Available);

    // Filter tabs
    let filterTabs = [
        { name: $_('common.all'), icon: 'asterisk', id: FilterPlayers.All },
        { name: $_('players.sections.humans'), icon: 'user', id: FilterPlayers.Humans },
        { name: $_('players.sections.bots'), icon: 'bot2', id: FilterPlayers.Bots },
    ]

    // List players
    let remainingBots: Player[] = $derived(listBots.filter(bot => !selectedPlayers.includes(bot)))
    let remainingHumans: Player[] = $derived(listPlayers.filter(player => !selectedPlayers.includes(player)))
    let availablePlayers: Player[] = $derived.by(() => {
        switch ($selectedFilterPlayers) {
            case FilterPlayers.All:
                return [...remainingBots, ...remainingHumans]
            case FilterPlayers.Humans:
                return remainingHumans
            case FilterPlayers.Bots:
                return remainingBots
        }
        return []
    })
    let sortedPlayers = $derived(availablePlayers.toSorted((a, b) => a.name.localeCompare(b.name)))
    let filteredPlayers = $derived(isSearching ? filterListPlayersWith(searchValue, sortedPlayers) : sortedPlayers)

    interface BoxInfo {
        variant: string
        icon: string
        title: string
        description: string
        iconSize?: number
    }

    function selectRandomBot() {
        let index = randomBetween(0, remainingBots.length - 1)
        selectedPlayers.push(remainingBots[index])
    }

    function selectRandomHuman() {
        let index = randomBetween(0, remainingHumans.length - 1)
        selectedPlayers.push(remainingHumans[index])
    }

    onMount(() => {
        if (selectedPlayers.length > 0) {
            selectedId = Tabs.Preview
        }
    })
</script>

<Responsive bind:size />

<main id="pg-participants">
    {#snippet head(outside: boolean = false)}
        <div class="ng-head"
            class:outside class:inside={!outside}
            class:gradient-grid={outside}
        >
            <Pagination compact selectedIndex={pageIndex} />
            <h1>{ $_('assistant.participants.title') }</h1>
            
            <div class="head-bar">
                <div class="status">
                    <ProgressNbPlayers />
                </div>

                <div class="actions">
                    <Button onclick={selectRandomHuman} center shape="squared"
                        title={ $_('assistant.participants.select_random_player') }
                        variant={remainingHumans.length < 1 ? 'flat' : 'primary'}
                        disabled={remainingHumans.length < 1}>
                        <Icon icon="user" size={20} />
                        <span class="expo">
                            <Icon icon="plus" size={14} />
                        </span>
                    </Button>

                    <Button onclick={selectRandomBot} center shape="squared"
                        title={ $_('assistant.participants.select_random_bot') }
                        variant={remainingBots.length < 1 ? 'flat' : 'default'}
                        disabled={remainingBots.length < 1}>
                        <Icon icon="bot2" size={20} />
                        <span class="expo">
                            <Icon icon="plus" size={14} />
                        </span>
                    </Button>
                    
                    <Button center shape="squared"
                        title={ $_('common.clear_selection') }
                        variant={selectedPlayers.length < 1 ? 'flat' : 'primary-red'}
                        disabled={selectedPlayers.length < 1}
                        onclick={clearSelectedPlayers}>
                        <Icon icon="bin" size={20} />
                    </Button>
                </div>
            </div>

            {#if outside}
                <div class="tabs">
                    <TabBar tabs={tabs} bind:selectedId />
                </div>
            {/if}
        </div>
    {/snippet}

    {#if ['sm', 'md'].includes(size)}
        {@render head(true)}
    {/if}

    {#snippet bxInfo(data: BoxInfo)}
        <div class="info"
            class:empty={data.variant == 'empty'}
            class:emptyResult={data.variant == 'emptyResult'}
            in:scale|global
        >
            <Icon icon={data.icon} size={data.iconSize} />
            <p class="title"><strong>{data.title}</strong></p>
            <p class="desc">{data.description}</p>
        </div>
    {/snippet}

    <PageWrap>
        {#if selectedId == Tabs.Preview || !['sm', 'md'].includes(size)}
            <div class="preview ng-paneContent" in:fade={{duration: 250}}>
                {#if !['sm', 'md'].includes(size)}
                    <div>
                        {@render head(false)}

                        {#if selectedPlayers.length > 0}
                            <div in:slide
                                class="players-selected"
                                style:padding-top="2rem">
                                <SelectedParticipants />
                            </div>
                        {/if}
                    </div>
                {/if}

                {#if selectedPlayers.length > 0 && ['sm', 'md'].includes(size)}
                    <SelectedParticipants />
                {/if}

                {#if selectedPlayers.length == 0}
                    {@render bxInfo({
                        variant: 'empty', icon: 'profile', iconSize: 100,
                        title: $_('assistant.participants.empty_selection.title'),
                        description: $_('assistant.participants.empty_selection.legend')
                    })}
                {/if}

                {#if !['sm', 'md'].includes(size)}
                    <NavigButtons index={pageIndex} />
                {/if}
            </div>
        {/if}

        {#if selectedId == Tabs.Available || !['sm', 'md'].includes(size)}
            <div class="picker">
                <div class="tabs-filters">
                    <TabBar tabs={filterTabs}
                        variant="squared"
                        bind:selectedId={$selectedFilterPlayers} />
                </div>

                <SearchBar bind:value={searchValue}
                    placeholder={ $_('players.search.placeholder') } />

                <div class="players">
                    {#if filteredPlayers.length > 0}
                        <ListPlayers
                            players={filteredPlayers}
                            onPlayerClick={selectPlayerById} />
                    {/if}

                    {#if filteredPlayers.length == 0}
                        {#if isSearching}
                            {@render bxInfo({
                                variant: 'emptyResult', icon: 'search', iconSize: 100,
                                title: $_('assistant.participants.no_player_found.title'),
                                description: $_('assistant.participants.no_player_found.legend')
                            })}
                        {/if}

                        {#if !isSearching}
                            {@render bxInfo({
                                variant: 'emptyResult', icon: 'disable', iconSize: 100,
                                title: $_('assistant.participants.no_player_available.title'),
                                description: $_('assistant.participants.no_player_available.legend')
                            })}
                        {/if}
                    {/if}

                    <div class="newPlayer">
                        <Button onclick={() => push('/players/0')} >
                            <Icon icon="plus" size={20} />
                            <p class="text">{ $_('players.create_profile') }</p>
                        </Button>
                    </div>
                </div>
            </div>
        {/if}
    </PageWrap>
</main>

<style>
    #pg-participants {
        .picker {
            display: grid;
            gap: 1rem;

            .newPlayer {
                display: flex;
                justify-content: center;
                margin-top: 1rem;

                p {
                    margin: 0;
                    font-size: .9em;
                }

                :global(button) {
                    gap: .5rem;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    padding: .8rem 1rem;
                    text-align: start;
                }
            }
        }

        .info {
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            max-width: 16rem;
            padding: 2rem;
            margin: auto;

            p {
                &.title {
                    margin: 1.5rem 0 0;
                }

                &.desc {
                    margin: .25rem 0;
                    font-size: .85em;
                }
            }

            &.emptyResult :global(.icon) {
                color: light-dark(#c47500, #ff9900);
            }
        }

        .head-bar {
            display: flex;
            justify-content: space-between;
            gap: 1rem;

            .status {
                flex: 1;
                display: flex;
                align-items: center;
            }

            .actions {
                display: flex;
                gap: .5rem;
                justify-content: end;

                :global(button) {
                    position: relative;
                    height: 3rem;

                    &:not(.flat) {
                        border-color: light-dark(#00000077, #ffffff77);
                    }
                }

                .expo {
                    position: absolute;
                    inset: 0 0 auto auto;
                    display: flex;
                    align-items: center;
                    padding: .25rem;
                }
            }
        }

        @media (width >= 768px) {
            .picker {
                height: calc(100vh - 8rem);
                display: flex;
                flex-flow: column;
                justify-content: start;
            }
        }
    }
</style>
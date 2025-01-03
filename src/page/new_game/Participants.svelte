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
        { name: 'Disponibles', icon: 'profile', id: Tabs.Available },
        { name: 'Sélectionnes', icon: 'checkbox', id: Tabs.Preview },
    ]
    let selectedId = $state(Tabs.Available);

    // Filter tabs
    let FilterTabs = {
        All: 5,
        Humans: 6,
        Bots: 7
    }
    let filterTabs = [
        { name: 'Tous', icon: 'asterisk', id: FilterTabs.All },
        { name: 'Joueurs', icon: 'user', id: FilterTabs.Humans },
        { name: 'Bots', icon: 'bot2', id: FilterTabs.Bots },
    ]
    let selectedFilterId = $state(FilterTabs.All);

    // List players
    let remainingBots: Player[] = $derived(listBots.filter(bot => !selectedPlayers.includes(bot)))
    let remainingHumans: Player[] = $derived(listPlayers.filter(player => !selectedPlayers.includes(player)))
    let availablePlayers: Player[] = $derived.by(() => {
        switch (selectedFilterId) {
            case FilterTabs.All:
                return [...remainingBots, ...remainingHumans]
            case FilterTabs.Humans:
                return remainingHumans
            case FilterTabs.Bots:
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

{#snippet headBar()}
    <div class="head-bar">
        <div class="status">
            <ProgressNbPlayers />
        </div>

        <div class="actions">
            <Button onclick={selectRandomHuman} center shape="squared"
                title="Ajouter une joueur au hasard"
                variant={remainingHumans.length < 1 ? 'flat' : 'primary'}
                disabled={remainingHumans.length < 1}>
                <Icon icon="user" size={20} />
                <span class="expo">
                    <Icon icon="plus" size={14} />
                </span>
            </Button>

            <Button onclick={selectRandomBot} center shape="squared"
                title="Ajouter un bot au hasard"
                variant={remainingBots.length < 1 ? 'flat' : 'default'}
                disabled={remainingBots.length < 1}>
                <Icon icon="bot2" size={20} />
                <span class="expo">
                    <Icon icon="plus" size={14} />
                </span>
            </Button>
            
            <Button center shape="squared"
                title="Vider la sélection"
                variant={selectedPlayers.length < 1 ? 'flat' : 'primary-red'}
                disabled={selectedPlayers.length < 1}
                onclick={clearSelectedPlayers}>
                <Icon icon="bin" size={20} />
            </Button>
        </div>
    </div>
{/snippet}

<main id="pg-participants">
    {#if ['sm', 'md'].includes(size)}
        <div class="ng-head outside gradient-grid">
            <Pagination compact selectedIndex={pageIndex} />
            <h1>Participants</h1>

            {@render headBar()}

            <div class="tabs">
                <TabBar tabs={tabs} bind:selectedId />
            </div>
        </div>
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
                    <div class="ng-head inside">
                        <Pagination selectedIndex={pageIndex} compact />
                        <h1>Participants</h1>

                        {@render headBar()}

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
                        title: 'Aucun joueur selectionné',
                        description: 'Choisissez un ou plusieurs joueurs pour pouvoir lancer une partie.'
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
                        bind:selectedId={selectedFilterId} />
                </div>

                <SearchBar bind:value={searchValue} placeholder="Rechercher un joueur" />

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
                                title: 'Aucun joueur trouvé',
                                description: 'Votre recherche ne donne aucun résultat.'
                            })}
                        {/if}

                        {#if !isSearching}
                            {@render bxInfo({
                                variant: 'emptyResult', icon: 'disable', iconSize: 100,
                                title: 'Aucun joueur disponible',
                                description: 'Vous pouvez créer des nouveaux joueurs depuis la page de gestion des "Joueurs".'
                            })}
                        {/if}
                    {/if}

                    <div class="newPlayer">
                        <Button
                            onclick={() => push('/players/0')}
                        >
                            <Icon icon="plus" size={28} />
                            <div class="text">
                                <p class="title"><strong>Créer un joueur</strong></p>
                                <p class="legend">Cliquez ici si vous ne figurez pas dans la liste</p>
                            </div>
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

                    &.title {font-size: .9em;}
                    &.legend {font-size: .8em;}
                }

                :global(button) {
                    gap: 1rem;
                    display: flex;
                    align-items: center;
                    padding: 1rem 1.5rem;
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
            max-width: 300px;
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

            &.empty {
                border: 3px dashed light-dark(#000, #fff);
                border-radius: 2rem;
                backdrop-filter: blur(10px);
                aspect-ratio: 1;
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
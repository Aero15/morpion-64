<script lang="ts">
    import Icon from "$lib/shared/Icon.svelte";
    import TabBar from "$lib/shared/TabBar.svelte";
    import { fade, scale } from "svelte/transition";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import SearchBar from "$lib/shared/SearchBar.svelte";
    import Responsive from "$lib/shared/Responsive.svelte";
    import ListPlayers from "$lib/player/ListPlayers.svelte";
    import Pagination from "$lib/new-game/Pagination.svelte";
    import NavigButtons from "$lib/new-game/NavigButtons.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import SelectedParticipants from "$lib/player/SelectedParticipants.svelte";
    import { listBots, selectedPlayers, listPlayers } from "$core/store/players.svelte";
    import { filterListPlayersWith, selectPlayerById } from "$core/helpers/Players.svelte";

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
        { name: 'Joueurs', icon: 'profile', id: FilterTabs.Humans },
        { name: 'Bots', icon: 'bot', id: FilterTabs.Bots },
    ]
    let selectedFilterId = $state(FilterTabs.All);

    // List players
    let remainingBots = $derived(listBots.filter(bot => !selectedPlayers.includes(bot)))
    let remainingHumans = $derived(listPlayers.filter(player => !selectedPlayers.includes(player)))
    let availablePlayers = $derived.by(() => {
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
</script>

<Responsive bind:size />

<main id="pg-participants">
    {#if ['sm', 'md'].includes(size)}
        <div class="ng-head outside gradient-grid">
            <Pagination compact selectedIndex={pageIndex} />
            <h1>Participants</h1>

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
                    </div>
                {/if}

                {#if selectedPlayers.length == 0}
                    {@render bxInfo({
                        variant: 'empty', icon: 'profile', iconSize: 100,
                        title: 'Aucun joueur selectionné',
                        description: 'Choisissez un ou plusieurs joueur pour pouvoir lancer une partie.'
                    })}
                {/if}

                {#if selectedPlayers.length > 0}
                    <SelectedParticipants />
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
                    {/if}
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
    }
</style>
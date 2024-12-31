<script lang="ts">
    import { fade } from "svelte/transition";
    import TabBar from "$lib/shared/TabBar.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import Responsive from "$lib/shared/Responsive.svelte";
    import ListPlayers from "$lib/player/ListPlayers.svelte";
    import Pagination from "$lib/new-game/Pagination.svelte";
    import NavigButtons from "$lib/new-game/NavigButtons.svelte";
    import { selectPlayerById } from "$core/helpers/Players.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import SelectedParticipants from "$lib/player/SelectedParticipants.svelte";
    import { listBots, selectedPlayers, listPlayers } from "$core/store/players.svelte";

    let size: BreakpointSize = $state('sm');

    let pageIndex = 1

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
    let selectedFilterId = $state(FilterTabs.Humans);

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

    <PageWrap>
        {#if selectedId == Tabs.Preview || !['sm', 'md'].includes(size)}
            <div class="preview ng-paneContent" in:fade={{duration: 250}}>
                {#if !['sm', 'md'].includes(size)}
                    <div class="ng-head inside">
                        <Pagination selectedIndex={pageIndex} compact />
                        <h1>Participants</h1>
                    </div>
                {/if}

                <SelectedParticipants />

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

                <div class="players">
                    <ListPlayers
                        players={sortedPlayers}
                        onPlayerClick={selectPlayerById} />
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
    }
</style>
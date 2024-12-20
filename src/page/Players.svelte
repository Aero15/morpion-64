<script lang="ts">
    import type Player from "$core/entity/player/Player.svelte";
    import { filterPlayerWith } from "$core/helpers/Players.svelte";
    import { listBots, listPlayers } from "$core/store/players.svelte";
    import ListPlayers from "$lib/player/ListPlayers.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import Panel from "$lib/shared/panel/Panel.svelte";
    import Button from "$lib/form/Button.svelte";
    import { fade } from "svelte/transition";
    import Icon from "$lib/shared/Icon.svelte";
    import { push } from "svelte-spa-router";
    import Jumbo from "$lib/shared/Jumbo.svelte";
    import SearchInput from "$lib/form/SearchInput.svelte";
    import Responsive from "$lib/shared/Responsive.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import PanelSection from "$lib/shared/panel/PanelSection.svelte";

    let size: BreakpointSize = $state('sm')
    let searchValue: string = $state('')
    let isSearching: boolean = $derived(searchValue.length > 0)
    let players: Player[] = $derived(isSearching ? filterPlayerWith(searchValue) : [...listPlayers, ...listBots])
    let countPlayers: number = $derived(players.length)
    let subtitle: string = $derived(isSearching ? `${countPlayers} joueurs trouvés` : `${countPlayers} joueurs`)

    function openEditor() {
        push('/players/0')
    }

    function onPlayerClick(id: number) {
        push('/players/' + id)
    }
</script>

<Responsive bind:size />

<Jumbo icon="user" title="Joueurs" subtitle="Gestion des joueurs">
    <span></span>
</Jumbo>

<div class="search-bar" class:thick={!['sm'].includes(size)}>
    <SearchInput
        bind:value={searchValue}
        placeholder="Rechercher un joueur" />
</div>

<PageWrap>
    <div id="pg-players">
        <div class="toolbar">
            <Button variant="primary" center
                onclick={openEditor}>
                <Icon icon="plus" />
                Créer un joueur
            </Button>
        </div>

        <div class="panel">
            <Panel>
                <PanelSection title="Informations" icon="info" variant="transparent">
                    <div class="infos">
                        <Icon icon="user" size={100} />
                        <h3>{subtitle}</h3>
                    </div>
                </PanelSection>

                <PanelSection title="Actions" icon="play" variant="tinted">
                    <div class="actions">
                        <Button variant="primary" center
                            onclick={openEditor}>
                            <Icon icon="plus" />
                            Créer un joueur
                        </Button>
                    </div>
                </PanelSection>
            </Panel>
        </div>
    
        <div in:fade={{delay: 150}}>
            <h2>Liste des joueurs</h2>
            {#if players.length > 0}
                <ListPlayers {players} {onPlayerClick} />
            {:else}
                <center>
                    <Icon icon="user" size={100} />
                    <p>Aucun joueur à afficher</p>
                    <Button variant="primary" center
                        onclick={openEditor}>
                        <Icon icon="plus" />
                        Créer un joueur
                    </Button>
                </center>
            {/if}
        </div>
    </div>
</PageWrap>

<style>
    .search-bar {
        display: grid;
        max-width: 600px;
        margin: auto;
        margin-top: -1.5rem;
        padding: 0 1rem;

        &.thick {
            margin-top: -2rem;
        }
    }

    .infos {
        display: grid;
        place-items: center;
        padding-top: 2rem;

        h3 {
            margin: 0;
        }
        }
    }

    .actions {
        display: grid;
        gap: .25rem;
        padding: 0 1rem 1rem;
    }

    #pg-players {
        display: grid;
        gap: 2rem;

        h2 {
            margin-top: 0;
        }

        .panel { display: none; }
        .toolbar { display: grid; }
    }

    @media (width >= 500px) {
        #pg-players {
            grid-template-columns: 300px 1fr;

            .toolbar { display: none; }

            .panel {
                display: grid;
                place-content: start stretch;
            }
        }
    }
</style>
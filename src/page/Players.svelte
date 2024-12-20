<script lang="ts">
    import type Player from "$core/entity/player/Player.svelte";
    import { filterPlayerWith } from "$core/helpers/Players.svelte";
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

<SearchBar bind:value={searchValue} placeholder="Rechercher un joueur" />

<PageWrap>
    <div id="pg-players">
        <div class="toolbar">
            <Button variant="primary" center
                onclick={openEditor}>
                <Icon icon="plus" />
                Créer un joueur
            </Button>
        </div>

        <div class="panel" in:scale={{duration: 250}}>
            <Panel>
                <PanelSection title="Informations" icon="info">
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
    
        <div in:fade={{delay: 200}}>
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

        .panel { display: none; transition: margin .5s; }
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

    @media (width >= 1300px) {
        #pg-players {
            .panel {
                margin-top: -266px;
            }
        }
    }
</style>
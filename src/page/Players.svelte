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

    let size: BreakpointSize = $state('sm')
    let searchValue: string = $state('')
    let isSearching: boolean = $derived(searchValue.length > 0)
    let bots: Player[] = $derived(isSearching ? filterListPlayersWith(searchValue, listBots) : listBots)
    let humans: Player[] = $derived(isSearching ? filterListPlayersWith(searchValue, listPlayers) : listPlayers)
    let globalCount: number = $derived(bots.length + humans.length)
    let subtitle: string = $derived(isSearching ? `${globalCount} joueurs trouvés` : `${globalCount} joueurs`)

    function openEditor() {
        push('/players/0')
    }

    function onPlayerClick(id: number) {
        push('/players/' + id)
    }
</script>

<Responsive bind:size />

<Jumbo icon="user" title="Joueurs"
    subtitle="Gestion des joueurs">
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
                        <Icon icon={ isSearching ? 'search' : 'user' } size={100} />
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
    
        <div in:fade={{duration: 200, delay: 100}} class="sections"
            class:space={ !['sm', 'md', 'lg'].includes(size) }
            class:cols-2={ ['xl', '2xl'].includes(size) }>
            <Collapse title="Joueurs" icon="user" open
                subtitle={ humans.length + ' résultats' }
            >
                {#if humans.length > 0}
                    <ListPlayers players={humans} {onPlayerClick} />
                {:else}
                    <div class="empty">
                        <Icon icon="user" size={64} />
                        <p>Aucun joueur à afficher</p>
                        <Button variant="primary" center
                            onclick={openEditor}>
                            <Icon icon="plus" />
                            Créer un joueur
                        </Button>
                    </div>
                {/if}
            </Collapse>
            
            <Collapse title="Bots" icon="bot" open
                subtitle={ bots.length + ' résultats' }
            >
                {#if bots.length > 0}
                    <ListPlayers players={bots} {onPlayerClick} />
                {:else}
                    <div class="empty">
                        <Icon icon="bot" size={64} />
                        <p>Aucun bot à afficher</p>
                        <Button variant="primary" center
                            onclick={openEditor}>
                            <Icon icon="plus" />
                            Créer un bot
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
            margin-top: -230px;
        }
    }
</style>
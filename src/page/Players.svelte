<script lang="ts">
    import type Player from "$core/entity/player/Player.svelte";
    import { filterPlayerWith } from "$core/helpers/Players.svelte";
    import { listBots, listPlayers } from "$core/store/players.svelte";
    import ListPlayers from "$lib/player/ListPlayers.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import Button from "$lib/form/Button.svelte";
    import Input from "$lib/form/Input.svelte";
    import Hero from "$lib/shared/Hero.svelte";
    import { fade } from "svelte/transition";
    import Icon from "$lib/shared/Icon.svelte";
    import { push } from "svelte-spa-router";
    import Jumbo from "$lib/shared/Jumbo.svelte";
    import SearchInput from "$lib/form/SearchInput.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import Responsive from "$lib/shared/Responsive.svelte";

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

<Jumbo icon="user" title="Joueurs" {subtitle}>
    <span></span>
</Jumbo>

<div class="search-bar" class:thick={!['sm'].includes(size)}>
    <SearchInput
        bind:value={searchValue}
        placeholder="Rechercher un joueur" />
</div>

<PageWrap>
    <div class="page-with-hero">
        <div class="hero">
            <Hero icon="profile" title="Joueurs" {subtitle}>
                <div class="toolbar">
                    <Button variant="primary" center
                        onclick={openEditor}>
                        <Icon icon="plus" />
                        Créer un joueur
                    </Button>
                </div>
            </Hero>
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

    .page-with-hero {
        display: grid;
        gap: 2rem;
        padding-top: 2rem;

        h2 {
            margin-top: 0;
        }
    }

    .toolbar {
        display: grid;
        gap: .5rem;
    }

    @media (width >= 900px) {
        .page-with-hero {
            grid-template-columns: 350px 1fr;
        }
    }
</style>
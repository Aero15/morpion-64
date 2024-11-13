<script lang="ts">
    import type Player from "$core/entity/player/Player.svelte";
    import { randomColor } from "$core/helpers/Colors.svelte";
    import { filterPlayerWith } from "$core/helpers/Players.svelte";
    import { randomSymbol } from "$core/helpers/Symbols.svelte";
    import { listPlayers } from "$core/store/players.svelte";
    import ListPlayers from "$lib/player/ListPlayers.svelte";
    import Button from "$lib/form/Button.svelte";
    import Input from "$lib/form/Input.svelte";
    import Hero from "$lib/shared/Hero.svelte";
    import { fade } from "svelte/transition";
    import Icon from "$lib/shared/Icon.svelte";

    let editPlayerId: number = $state(0)
    let editPlayerName: string = $state('')
    let editPlayerColor: string = $state(randomColor())
    let editPlayerSymbol: string = $state(randomSymbol())

    let searchValue: string = $state('')
    let isSearching: boolean = $derived(searchValue.length > 0)
    let players: Player[] = $derived(isSearching ? filterPlayerWith(searchValue) : listPlayers)
    let countPlayers: number = $derived(players.length)
    let subtitle: string = $derived(isSearching ? `${countPlayers} joueurs trouvés` : `${countPlayers} joueurs`)

    function openEditor() {
        //dialogForm?.showModal()
    }

    function onPlayerClick(id: number) {
        editPlayerId = id
        let p = players.find(p => p.id === id)!
        editPlayerName = p.name
        editPlayerColor = p.color
        editPlayerSymbol = p.symbol

        openEditor()
    }

    function resetForm() {
        editPlayerId = 0
        editPlayerName = ''
        editPlayerColor = randomColor()
        editPlayerSymbol = randomSymbol()
    }
</script>
<main>
    <div class="hero">
        <Hero icon="profile" title="Joueurs" {subtitle}>
            <div class="toolbar">
                <Button variant="primary" center
                    onclick={openEditor}>
                    <Icon icon="plus" />
                    Créer un joueur
                </Button>

                <Input type="search"
                    placeholder="Rechercher un joueur"
                    bind:value={searchValue} />
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
</main>

<style>
    main {
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
        main {
            grid-template-columns: 350px 1fr;
        }
        
    }
</style>
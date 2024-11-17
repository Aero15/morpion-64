<script lang="ts">
    import { randomColor } from "$core/helpers/Colors.svelte";
    import { randomSymbol } from "$core/helpers/Symbols.svelte";
    import { listBots, listPlayers } from "$core/store/players.svelte";
    import Button from "$lib/form/Button.svelte";
    import Input from "$lib/form/Input.svelte";
    import Hero from "$lib/shared/Hero.svelte";
    import { fade } from "svelte/transition";
    import Icon from "$lib/shared/Icon.svelte";
    import type { Color } from "$core/enums/Color";
    import type { Symbol } from "$core/enums/Symbol";
    import { push } from "svelte-spa-router";
    import Human from "$core/entity/player/Human.svelte";
    import SelectColor from "$lib/form/SelectColor.svelte";
    import SelectSymbol from "$lib/form/SelectSymbol.svelte";
    import { onMount } from "svelte";
    import { PlayerType } from "$core/enums/PlayerType";
    import Bot from "$core/entity/player/Bot.svelte";
    import { Difficulty } from "$core/enums/Difficulty";
    import SelectDifficulty from "$lib/form/SelectDifficulty.svelte";

    let { params }: { params: any } = $props();

    // Variables réactives
    let id: number = $derived(params.id)
    let name: string = $state('')
    let type: PlayerType = $state(PlayerType.Human)
    let color: Color|string = $state(randomColor())
    let symbol: Symbol = $state(randomSymbol())
    let difficulty: Difficulty = $state(Difficulty.Peaceful)

    // Paramètres de transition
    const duration: number = 200
    const delay: number = 100

    onMount(() => {
        // Rechercher le joueur dans la liste des joueurs humains
        let p = listPlayers.find(p => p.id == id)

        // Rechercher le joueur dans la liste des joueurs bots si aucun joueur humain trouvé
        if (!p)
            p = listBots.find(p => p.id == id)

        // Rediriger vers la page d'accueil si aucun joueur trouvé
        if (!p)
            return push('/players')

        // Remplir les champs
        name = p.name
        type = p.type
        color = p.color
        symbol = p.symbol

        if (type == PlayerType.Bot) {
            let bot = p as Bot
            difficulty = bot.difficulty
        }
    })

    function save() {
        // Créer le joueur
        if (id < 1) {
            if (type == PlayerType.Bot)
                listBots.push(new Bot(name, symbol, color, difficulty))
            if (type == PlayerType.Human)
                listPlayers.push(new Human(name, symbol, color))
        }

        // Modifier le joueur
        if (id > 0) {
            if (type == PlayerType.Human) {
                let p = listPlayers.find(p => p.id == id)!
                let index = listPlayers.indexOf(p)
                listPlayers[index].name = name
                listPlayers[index].color = color
                listPlayers[index].symbol = symbol
            }

            if (type == PlayerType.Bot) {
                let p = listBots.find(p => p.id == id)!
                let index = listBots.indexOf(p)
                listBots[index].name = name
                listBots[index].color = color
                listBots[index].symbol = symbol;
                (listBots[index] as Bot).difficulty = difficulty
            }
        }

        push('/players')
    }
</script>

<main>
    <div class="hero">
        <Hero icon="write" title="Profil">
            <div class="toolbar">
                <Button variant="primary" center
                    onclick={save}>
                    {#if id > 0}
                        <Icon icon="save" /> Enregistrer
                    {:else}
                        <Icon icon="plus" /> Créer le joueur
                    {/if}
                </Button>

                <Button center
                    onclick={() => push('/players')}>
                    <Icon icon="undo" />
                    Abandonner
                </Button>
            </div>
        </Hero>
    </div>

    <div in:fade={{delay: delay * 1}}>
        {#if type == PlayerType.Bot}
            <h2>{id > 0 ? 'Modifier le bot' : 'Créer un bot'}</h2>
        {/if}
        {#if type == PlayerType.Human}
            <h2>{id > 0 ? 'Modifier le joueur' : 'Créer un joueur'}</h2>
        {/if}

        <div class="username" in:fade={{delay: delay * 2, duration}}>
            <label for="username">Nom de joueur</label>
            <Input type="text" id="username"
                placeholder="Nom du joueur"
                bind:value={name} />
        </div>

        <div class="selects">
            <div class="colors" in:fade={{delay: delay * 3, duration}}>
                <p class="label">Couleur</p>
                <SelectColor bind:value={color} />
            </div>
            <div class="symbols" in:fade={{delay: delay * 4, duration}}>
                <p class="label">Symbole</p>
                <SelectSymbol bind:value={symbol} />
            </div>

            {#if type == PlayerType.Bot}
                <div class="difficulty" in:fade={{delay: delay * 5, duration}}>
                    <p class="label">Difficulté</p>
                    <SelectDifficulty bind:value={difficulty} />
                </div>
            {/if}
        </div>
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

        :global(button:first-child) {
            padding-block: 1rem;
        }
    }

    .selects {
        display: flex;
        flex-flow: wrap;
        gap: 2rem;
        margin-top: 2rem;
    }

    label, .label {
        margin: .5rem 0;
    }

    .username {
        display: grid;
        max-width: 310px;
    }

    @media (width >= 900px) {
        main {
            grid-template-columns: 350px 1fr;
        }
        
    }
</style>
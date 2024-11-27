<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { push } from "svelte-spa-router";
    import Icon from "$lib/shared/Icon.svelte";
    import Input from "$lib/form/Input.svelte";
    import Hero from "$lib/shared/Hero.svelte";
    import Button from "$lib/form/Button.svelte";
    import type { Color } from "$core/enums/Color";
    import Bot from "$core/entity/player/Bot.svelte";
    import type { Symbol } from "$core/enums/Symbol";
    import { PlayerType } from "$core/enums/PlayerType";
    import { Difficulty } from "$core/enums/Difficulty";
    import SelectColor from "$lib/form/SelectColor.svelte";
    import SelectSymbol from "$lib/form/SelectSymbol.svelte";
    import { randomColor } from "$core/helpers/Colors.svelte";
    import type Player from "$core/entity/player/Player.svelte";
    import { randomSymbol } from "$core/helpers/Symbols.svelte";
    import SelectDifficulty from "$lib/form/SelectDifficulty.svelte";
    import SelectTypePlayer from "$lib/form/SelectTypePlayer.svelte";
    import {
        createBotPlayer, createHumanPlayer,
        findPlayerById, updatePlayer
    } from "$core/helpers/Players.svelte";

    let { params }: { params: any } = $props();

    // Reactive values
    let id: number = $derived(params.id)
    let name: string = $state('')
    let type: PlayerType = $state(PlayerType.Human)
    let color: Color|string = $state(randomColor())
    let symbol: Symbol = $state(randomSymbol())
    let difficulty: Difficulty = $state(Difficulty.Peaceful)

    // Transitions options
    const duration: number = 200
    const delay: number = 100

    onMount(() => {
        // Default values
        name = ''
        type = PlayerType.Human
        color = randomColor()
        symbol = randomSymbol()

        // Find a player by id
        if (id > 0) {
            const player = findPlayerById(id)
            if (player) {
                name = player.name
                type = player.type
                color = player.color
                symbol = player.symbol

                if (type == PlayerType.Bot) {
                    let bot = player as Bot
                    difficulty = bot.difficulty
                }
            } 
        }
    })

    // Save player
    function save() {
        // Create a new player
        if (id < 1) {
            switch (type) {
                case PlayerType.Bot:
                    createBotPlayer(name, symbol, color, difficulty)
                    break;
                case PlayerType.Human:
                    createHumanPlayer(name, symbol, color)
                    break;
            }
        }

        // Update a player
        if (id > 0) {
            switch (type) {
                case PlayerType.Bot:
                    updatePlayer({ id, name, symbol, color, type, difficulty } as Bot)
                    break;
                case PlayerType.Human:
                    updatePlayer({ id, name, symbol, color, type } as Player)
                    break;
            }
        }

        push('/players')
    }
</script>

<main>
    <div class="hero">
        <Hero icon="write" title="Profil">
            <div class="toolbar">
                {#if name.length > 0}
                    <Button variant="primary" center
                        onclick={save}>
                        {#if id > 0}
                            <Icon icon="save" /> Enregistrer
                        {:else}
                            <Icon icon="plus" /> Créer le joueur
                        {/if}
                    </Button>
                {/if}

                <Button center
                    onclick={() => push('/players')}>
                    <Icon icon="undo" />
                    Abandonner
                </Button>
            </div>
        </Hero>

        {#if id < 1}
            <div class="type" in:fade={{delay: delay * 0, duration}}>
                <p class="label">Type de joueur</p>
                <SelectTypePlayer bind:value={type} />
            </div>
        {/if}
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

    .type {
        margin-top: 2rem;
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
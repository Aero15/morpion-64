<script lang="ts">
    import { randomColor } from "$core/helpers/Colors.svelte";
    import { randomSymbol } from "$core/helpers/Symbols.svelte";
    import { listPlayers } from "$core/store/players.svelte";
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

    let { params }: { params: any } = $props();

    let id: number = $derived(params.id)
    let name: string = $state('')
    let color: Color|string = $state(randomColor())
    let symbol: Symbol = $state(randomSymbol())

    const duration: number = 250
    const delay: number = 100

    onMount(() => {
        let p = listPlayers.find(p => p.id == id)
        if (!p) return

        name = p.name
        color = p.color
        symbol = p.symbol
    })

    function save() {
        if (id > 0) {
            let p = listPlayers.find(p => p.id == id)
            if (!p) return

            let index = listPlayers.indexOf(p)
            listPlayers[index].name = name
            listPlayers[index].color = color
            listPlayers[index].symbol = symbol
        }

        if (id < 1) {
            listPlayers.push(new Human(name, symbol, color))
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
        <h2>{id > 0 ? 'Modifier le joueur' : 'Créer un joueur'}</h2>

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
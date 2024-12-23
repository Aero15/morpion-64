<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { push } from "svelte-spa-router";
    import Icon from "$lib/shared/Icon.svelte";
    import Input from "$lib/form/Input.svelte";
    import Button from "$lib/form/Button.svelte";
    import type { Color } from "$core/enums/Color";
    import Bot from "$core/entity/player/Bot.svelte";
    import type { Symbol } from "$core/enums/Symbol";
    import PageWrap from "$lib/global/PageWrap.svelte";
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
        deletePlayerById, findPlayerById, updatePlayer
    } from "$core/helpers/Players.svelte";
    import Jumbo from "$lib/shared/Jumbo.svelte";
    import AvatarPreview from "$lib/player/AvatarPreview.svelte";
    import Panel from "$lib/shared/panel/Panel.svelte";
    import PanelSection from "$lib/shared/panel/PanelSection.svelte";
    import AvatarContrastPreview from "$lib/player/AvatarContrastPreview.svelte";
    import TabBar from "$lib/shared/TabBar.svelte";
    import Responsive from "$lib/shared/Responsive.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";

    let { params }: { params: any } = $props();

    // Reactive values
    let id: number = $derived(params.id)
    let name: string = $state('')
    let type: PlayerType = $state(PlayerType.Human)
    let color: Color|string = $state(randomColor())
    let symbol: Symbol = $state(randomSymbol())
    let difficulty: Difficulty = $state(Difficulty.Peaceful)
    let color_and_symbol: string = $derived(color+' '+symbol)

    // Transitions options
    const duration: number = 200
    const delay: number = 100

    let Tabs = {
        Look: 0,
        Color: 1,
        Symbol: 2,
        Rename: 3,
        Difficulty: 4,
    }
    let selectedId = $state(Tabs.Rename)
    let tabsMobile = [
        { name: 'Symbole', icon: 'compass', id: Tabs.Symbol },
        { name: 'Couleur', icon: 'palette', id: Tabs.Color },
        { name: 'Identité', icon: 'write', id: Tabs.Rename },
        { name: 'Difficulté', icon: 'bot', id: Tabs.Difficulty },
    ]
    let tabsPC = [
        { name: 'Apparence', icon: 'palette', id: Tabs.Look },
        { name: 'Identité', icon: 'write', id: Tabs.Rename },
        { name: 'Difficulté', icon: 'bot', id: Tabs.Difficulty },
    ]

    let size: BreakpointSize = $state('sm')

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

    $effect(() => {
        selectedId = ['xl', '2xl'].includes($state.snapshot(size)) ? Tabs.Look : Tabs.Symbol
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

    // Delete player
    function deletePlayer() {
        const ok = confirm('Voulez-vous vraiment supprimer ce joueur ?')
        if (ok) {
            deletePlayerById(id)
            push('/players')
        }
    }
</script>

<Responsive bind:size />

{#if size != 'sm'}
    <Jumbo icon="profile" title="Profil" />
{/if}

{#snippet profileInfos(insidePanel = false)}
    <div class="infos" class:insidePanel>
        {#key color_and_symbol}
            <AvatarPreview symbol={symbol} color={color} />
        {/key}

        <div class="identity">
            <p class="name"><strong>{name}</strong></p>

            <div class="type">
                {#if type == PlayerType.Bot}
                    <Icon icon="bot" size={16} />
                    <p>Bot</p>
                {/if}
                {#if type == PlayerType.Human}
                    <Icon icon="user" size={16} />
                    <p>Humain</p>
                {/if}
            </div>

            {#if type == PlayerType.Bot}
                <p class="difficulty">{difficulty}</p>
            {/if}
        </div>
    </div>
{/snippet}

<div class="toolbar">
    {#if name.length > 0}
        <Button variant="primary" center
            title={id > 0 ? 'Enregistrer les modifications' : 'Créer le joueur'}
            onclick={save}>
            <Icon icon="save" size={24} />
        </Button>
    {/if}

    <Button center title="Annuler"
        onclick={() => push('/players')}>
        <Icon icon="undo" size={24} />
    </Button>

    {#if id > 0}
        <Button center variant="flat" title="Supprimer"
            onclick={deletePlayer}>
            <Icon icon="bin" size={24} />
        </Button>
    {/if}
</div>

{#if size == 'sm'}
    {@render profileInfos()}
{/if}

<PageWrap>
    <div id="pg-profile">
        <div class="panel">
            <Panel>
                <PanelSection title="Aperçu du profil" icon="info">
                    {@render profileInfos(true)}
                </PanelSection>
        
                <PanelSection title="Actions" icon="play" variant="transparent">
                    <div class="actions">
                        {#if name.length > 0}
                            <Button variant="primary" center
                                onclick={save}>
                                {#if id > 0}
                                    <Icon icon="save" size={24} /><p>Enregistrer</p>
                                {:else}
                                    <Icon icon="plus" size={24} /><p>Créer</p>
                                {/if}
                            </Button>
                        {/if}
                    
                        <Button center
                            onclick={() => push('/players')}>
                            <Icon icon="undo" size={24} />
                            <p>Annuler</p>
                        </Button>
                    
                        {#if id > 0}
                            <Button center variant="flat"
                                onclick={deletePlayer}>
                                <Icon icon="bin" size={24} />
                                <p>Supprimer</p>
                            </Button>
                        {/if}
                    </div>
                </PanelSection>
            </Panel>
        </div>

        <div in:fade={{delay: delay * 1}} class="page-content"
            class:vertical={['sm', 'md'].includes(size)}
            class:horizontal={!['sm', 'md'].includes(size)}
        >
        {#if ['sm', 'md', 'lg'].includes(size)}
            <TabBar tabs={type != PlayerType.Bot ? tabsMobile.slice(0, 3) : tabsMobile}
                orientation={['sm', 'md'].includes(size) ? 'horizontal' : 'vertical'}
                bind:selectedId />
        {:else}
            <TabBar tabs={type != PlayerType.Bot ? tabsPC.slice(0, 2) : tabsPC}
                orientation={['sm', 'md'].includes(size) ? 'horizontal' : 'vertical'}
                bind:selectedId />
        {/if}

            {#if selectedId == Tabs.Rename}
                <div class="rename">
                    {#if id < 1}
                        <div class="edit-type">
                            <p class="label"><strong>Type de joueur</strong></p>
                            <SelectTypePlayer bind:value={type} />
                        </div>
                    {/if}

                    <div class="username">
                        <p class="label"><strong>Pseudo</strong></p>
                        <Input type="text" id="username"
                            placeholder="Pseudo du joueur"
                            bind:value={name} />
                    </div>
                </div>
            {/if}

            {#if selectedId == Tabs.Color}
                <div class="colors">
                    <div class="editor">
                        <p class="label"><strong>Couleur</strong></p>
                        <SelectColor bind:value={color} />
                    </div>

                    <div class="contrast">
                        <p class="label"><strong>Aperçu</strong></p>
                        <AvatarContrastPreview {symbol} {color} />
                    </div>
                </div>
            {/if}

            {#if selectedId == Tabs.Look}
                <div class="colors">
                    <div class="editor">
                        <p class="label"><strong>Couleur</strong></p>
                        <SelectColor bind:value={color} />
                    </div>

                    <div class="contrast">
                        <p class="label"><strong>Aperçu</strong></p>
                        <AvatarContrastPreview {symbol} {color} />
                    </div>

                    <div class="symbols">
                        <p class="label"><strong>Symbole</strong></p>
                        <SelectSymbol bind:value={symbol} />
                    </div>
                </div>
            {/if}

            {#if selectedId == Tabs.Symbol}
                <div class="symbols">
                    <p class="label"><strong>Symbole</strong></p>
                    <SelectSymbol bind:value={symbol} />
                </div>
            {/if}

            {#if type == PlayerType.Bot && selectedId == Tabs.Difficulty}
                <div class="difficulty">
                    <p class="label"><strong>Niveaux de difficulté</strong></p>
                    <SelectDifficulty bind:value={difficulty} />
                </div>
            {/if}
        </div>
    </div>
</PageWrap>

<style>
    .infos {
        &.insidePanel {
            margin-top: -52px;
            padding-bottom: 1rem;
        }

        .identity {
            display: flex;
            flex-flow: column;
            align-items: center;
            text-align: center;

            .name {
                margin: -2.5rem 0 0;
                font-size: 1.5em;
                width: calc(300px - 2rem);
                padding: 0 1rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .type {
                display: flex;
                align-items: center;
                gap: .5rem;
                margin: 0;

                p {
                    margin: 0;
                    font-size: .87em;
                }
            }

            .difficulty {
                font-size: .6em;
                text-transform: uppercase;
                border: 1px solid light-dark(#000, #fff);
                border-radius: 6px;
                padding: 3px 7px 5px;
                margin: .5rem 0 0;
            }
        }
    }

    .toolbar {
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        gap: .25rem;
        position: absolute;
        inset: 56px 0 auto;
        z-index: 1;
        padding: .5rem;

        :global(button) {
            aspect-ratio: 1;
        }
    }

    #pg-profile {
        display: grid;
        gap: 1rem;
        align-items: flex-start;

        .panel {
            display: none;
            transition: margin .5s;
        }

        .actions {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: .25rem;
            height: 100%;
            padding: 0 1rem 1rem;

            :global(button) {
                aspect-ratio: 1;
                flex-flow: column;
                gap: .25rem;

                p {
                    margin: 0 -10px;
                    font-size: .78em;
                    width: 80px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

        .page-content {
            &.vertical {
                display: grid;
                align-items: start;
                justify-content: center;
                gap: 1rem;
            }

            &.horizontal {
                display: flex;
                align-items: start;
                gap: 2rem;
            }

            .label {
                margin: .25rem 0;
                text-align: start;
                font-size: 1em;
            }

            .username, .symbols, .difficulty, .contrast {
                display: grid;
                justify-content: center;
                place-items: start;
            }

            .colors, .rename {
                gap: 1rem;
                display: flex;
                flex-flow: wrap;
                justify-content: center;
                align-items: start;
            }
        }
    }

    @media (width >= 640px) {
        .toolbar { display: none; }

        #pg-profile {
            grid-template-columns: 300px 1fr;
            align-items: start;
            gap: 2rem;

            .panel {
                display: grid;
                place-content: start stretch;
            }

            .page-content {
                .colors {
                    gap: 2rem
                }

                .username, .symbols, .difficulty, .contrast {
                    display: grid;
                    justify-content: start;
                    place-items: start;
                }
            }
        }
    }

    @media (width >= 900px) {
        #pg-profile .panel {
            margin-top: -196px;
        }
    }
</style>
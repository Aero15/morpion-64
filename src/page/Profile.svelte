<script lang="ts">
    import {
        createBotPlayer, createHumanPlayer,
        deletePlayerById, findPlayerById, updatePlayer
    } from "$core/helpers/Players.svelte";
    import { onMount } from "svelte";
    import { fade, slide } from "svelte/transition";
    import { pop } from "svelte-spa-router";
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
    import Jumbo from "$lib/shared/Jumbo.svelte";
    import AvatarPreview from "$lib/player/AvatarPreview.svelte";
    import Panel from "$lib/shared/panel/Panel.svelte";
    import PanelSection from "$lib/shared/panel/PanelSection.svelte";
    import AvatarContrastPreview from "$lib/player/AvatarContrastPreview.svelte";
    import TabBar from "$lib/shared/TabBar.svelte";
    import Responsive from "$lib/shared/Responsive.svelte";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import { _ } from "svelte-i18n";

    let { params }: { params: any } = $props();

    // Reactive values
    let id: number = $derived(params.id)
    let name: string = $state('Bob')
    let type: PlayerType = $state(PlayerType.Human)
    let color: Color|string = $state(randomColor())
    let symbol: Symbol = $state(randomSymbol())
    let score: number = $state(0)
    let difficulty: Difficulty = $state(Difficulty.Peaceful)
    let color_and_symbol: string = $derived(color+' '+symbol)

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
        { name: $_('profile.symbol'), icon: 'compass', id: Tabs.Symbol },
        { name: $_('profile.color'), icon: 'palette', id: Tabs.Color },
        { name: $_('profile.identity'), icon: 'write', id: Tabs.Rename },
        { name: $_('profile.difficulty'), icon: 'filters', id: Tabs.Difficulty },
    ]
    let tabsPC = [
        { name: $_('profile.appearance'), icon: 'palette', id: Tabs.Look },
        { name: $_('profile.identity'), icon: 'write', id: Tabs.Rename },
        { name: $_('profile.difficulty'), icon: 'filters', id: Tabs.Difficulty },
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
                score = player.score

                if (type == PlayerType.Bot) {
                    let bot = player as Bot
                    difficulty = bot.difficulty
                }
            } 
        } else {
            name = ''
            type = PlayerType.Human
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
            const player = findPlayerById(id)
            switch (type) {
                case PlayerType.Bot:
                    updatePlayer({
                        id, name, symbol, color,
                        type, score, difficulty
                    } as Bot)
                    break;
                case PlayerType.Human:
                    updatePlayer({
                        id, name, symbol, color,
                        type, score
                    } as Player)
                    break;
            }
        }

        pop()
    }

    // Delete player
    function deletePlayer() {
        const ok = confirm($_('profile.confirm_delete_profile'))
        if (ok) {
            deletePlayerById(id)
            pop()
        }
    }

    // Reset score
    function resetScore() {
        const ok = confirm($_('profile.confirm_reset_score'))

        if (ok && id > 0) {
            score = 0
        }
    }

    // Get text for difficulty
    function getDifficultyName(difficulty: Difficulty): string {
        switch (difficulty) {
            case Difficulty.Peaceful:
                return $_('profile.difficulties.peaceful.name')
            case Difficulty.Easy:
                return $_('profile.difficulties.easy.name')
            case Difficulty.Medium:
                return $_('profile.difficulties.medium.name')
            case Difficulty.Hard:
                return $_('profile.difficulties.hard.name')
            case Difficulty.Impossible:
                return $_('profile.difficulties.impossible.name')
        }
    }
</script>

<Responsive bind:size />

{#if size != 'sm'}
    <Jumbo icon="profile" title={ $_('profile.title') } />
{/if}

{#snippet profileInfos(insidePanel = false)}
    <div class="infos" class:insidePanel>
        {#key color_and_symbol}
            <AvatarPreview symbol={symbol} color={color} />
        {/key}

        <div class="identity">
            {#if name.length > 0}
                <p class="name" transition:slide><strong>{name}</strong></p>
            {:else}
                <div class="warning" transition:slide>
                    <Icon icon="warning" size={64} />
                    <p>{ $_('profile.warning_no_name') }</p>
                </div>
            {/if}

            <div class="type">
                {#if type == PlayerType.Bot}
                    <Icon icon="bot2" size={16} />
                    <p>{ $_('profile.type.bot') }</p>
                {/if}
                {#if type == PlayerType.Human}
                    <Icon icon="user" size={16} />
                    <p>{ $_('profile.type.human') }</p>
                {/if}
            </div>

            {#if type == PlayerType.Bot}
                <p class="difficulty">{ getDifficultyName(difficulty) }</p>
            {/if}

            {#if id > 0}
                <div class="score">
                    <p><strong>{score}</strong> points</p>
                </div>
            {/if}
        </div>
    </div>
{/snippet}

<div class="toolbar">
    {#if name.length > 0}
        <Button variant="primary" center shape="squared"
            title={id > 0 ? $_('common.save_changes') : 'Créer le joueur'}
            onclick={save}>
            <Icon icon="save" size={24} />
        </Button>
    {/if}

    <Button center shape="squared"
        title={ $_('common.cancel') }
        onclick={() => pop()}>
        <Icon icon="undo" size={24} />
    </Button>

    {#if id > 0}
        <Button center variant="flat" shape="squared"
            title={ $_('common.delete') }
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
                <PanelSection title={ $_('profile.preview') } icon="info" open>
                    {@render profileInfos(true)}
                </PanelSection>
        
                <PanelSection title={ $_('common.actions') } icon="play" open variant="transparent">
                    <div class="actions squared">
                        {#if name.length > 0}
                            <Button variant="primary" center shape="squared"
                                onclick={save}>
                                {#if id > 0}
                                    <Icon icon="save" size={24} /><p>{ $_('common.save') }</p>
                                {:else}
                                    <Icon icon="plus" size={24} /><p>{ $_('common.create') }</p>
                                {/if}
                            </Button>
                        {/if}
                    
                        <Button center shape="squared"
                            onclick={() => pop()}>
                            <Icon icon="undo" size={24} />
                            <p>{ $_('common.cancel') }</p>
                        </Button>
                    
                        {#if id > 0}
                            <Button center variant="flat" shape="squared"
                                onclick={deletePlayer}>
                                <Icon icon="bin" size={24} />
                                <p>{ $_('common.delete') }</p>
                            </Button>
                        {/if}
                    </div>
                    
                    {#if id > 0 && score > 0}
                        <div class="actions list">
                            <Button center variant="default"
                                onclick={resetScore}>
                                <Icon icon="numbers" size={18} />
                                <p>{ $_('profile.reset_score') }</p>
                            </Button>
                        </div>
                    {/if}
                </PanelSection>
            </Panel>
        </div>

        <div in:fade={{delay: delay * 1}} class="page-content vertical">
            <div class="tabs" class:after-jumbo={size != 'sm'}>
                {#if ['sm', 'md', 'lg'].includes(size)}
                    <TabBar tabs={type != PlayerType.Bot ? tabsMobile.slice(0, 3) : tabsMobile}
                        variant={['sm'].includes(size) ? 'squared' : 'rounded'}
                        bind:selectedId />
                {:else}
                    <TabBar tabs={type != PlayerType.Bot ? tabsPC.slice(0, 2) : tabsPC}
                        variant={['sm'].includes(size) ? 'squared' : 'rounded'}
                        bind:selectedId />
                {/if}
            </div>

            {#if selectedId == Tabs.Rename}
                <div class="rename">
                    {#if id < 1}
                        <div class="edit-type">
                            <p class="label"><strong>{ $_('profile.player_type') }</strong></p>
                            <SelectTypePlayer bind:value={type} />
                        </div>
                    {/if}

                    <div class="username">
                        <p class="label"><strong>{ $_('profile.username') }</strong></p>
                        <Input type="text" id="username"
                            bind:value={name} />
                    </div>
                    
                    {#if id > 0 && ['sm'].includes(size) && score > 0}
                        <div class="actions list">
                            <Button center variant="default"
                                onclick={resetScore}>
                                <Icon icon="numbers" size={18} />
                                <p>{ $_('profile.reset_score') }</p>
                            </Button>
                        </div>
                    {/if}
                </div>
            {/if}

            {#if selectedId == Tabs.Color}
                <div class="colors">
                    <div class="editor">
                        <p class="label"><strong>{ $_('profile.color') }</strong></p>
                        <SelectColor bind:value={color} />
                    </div>

                    <div class="contrast">
                        <p class="label"><strong>{ $_('common.preview') }</strong></p>
                        <AvatarContrastPreview {symbol} {color} />
                        <p class="legend">{ $_('profile.legend_color_contrast') }</p>
                    </div>
                </div>
            {/if}

            {#if selectedId == Tabs.Look}
                <div class="colors">
                    <div class="editor">
                        <p class="label"><strong>{ $_('profile.color') }</strong></p>
                        <SelectColor bind:value={color} />
                    </div>

                    <div class="contrast">
                        <p class="label"><strong>{ $_('common.preview') }</strong></p>
                        <AvatarContrastPreview {symbol} {color} />
                        <p class="legend">{ $_('profile.legend_color_contrast') }</p>
                    </div>

                    <div class="symbols">
                        <p class="label"><strong>{ $_('profile.symbol') }</strong></p>
                        <SelectSymbol bind:value={symbol} />
                    </div>
                </div>
            {/if}

            {#if selectedId == Tabs.Symbol}
                <div class="symbols">
                    <p class="label"><strong>{ $_('profile.symbol') }</strong></p>
                    <SelectSymbol bind:value={symbol} />
                </div>
            {/if}

            {#if type == PlayerType.Bot && selectedId == Tabs.Difficulty}
                <div class="difficulty">
                    <p class="label"><strong>{ $_('profile.difficulties.name') }</strong></p>
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

            .warning {
                color: light-dark(#ca8a04, #facc15);
                margin: -4.5rem 1rem 1rem;
                display: grid;
                align-items: center;
                place-content: center;
                text-align: center;

                p {
                    margin: 0;
                    font-size: .8em;
                    text-wrap: balance;
                }
            }

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

            .score p {
                margin: 1rem 0 0;

                strong {
                    background: linear-gradient(
                        to right,
                        light-dark(rgb(255, 0, 200), rgb(255, 114, 243)),
                        light-dark(rgb(0, 153, 255), cyan)
                    );
                    background-clip: text;
                    color: transparent;
                    font-size: 1.5em;
                }
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
            padding: .75rem;
        }
    }

    .tabs.after-jumbo {
        margin-top: -52px;
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
            gap: .25rem;
            overflow: clip;

            &.squared {
                grid-template-columns: 1fr 1fr 1fr;
                padding: 0 1rem .25rem;

                :global(button) {
                    flex-flow: column;
                    gap: .25rem;
                }

                p {
                    margin: 0 -10px;
                    font-size: .78em;
                    width: 80px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

            &.list {
                padding: 0 1rem 1rem;

                p {
                    margin: .25rem 0;
                    font-size: .8em;
                    width: 210px;
                    text-align: start;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

            &:last-child {
                padding-bottom:  1rem;
            }
        }

        .page-content {
            &.vertical {
                display: grid;
                align-items: start;
                justify-content: center;
                gap: 1rem;
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

            .contrast .legend {
                width: 194px;
                text-align: center;
                font-size: .75em;
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
            margin-top: -164px;
        }
    }
</style>
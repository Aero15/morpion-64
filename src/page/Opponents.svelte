<script lang="ts">
    import {
        clearSelectedPlayers,
        removeSelectedPlayerById,
        selectPlayerById
    } from "$core/helpers/Players.svelte";
    import {
        listPlayers,
        selectedPlayers,
        listBots
    } from "$core/store/players.svelte";
    import { randomBetween } from "$core/helpers/Math.svelte";
    import ListPlayers from "$lib/player/ListPlayers.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import { fade, slide } from "svelte/transition";
    import Button from "$lib/form/Button.svelte";
    import Jumbo from "$lib/shared/Jumbo.svelte";
    import Hero from "$lib/shared/Hero.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import { push } from "svelte-spa-router";
    import Panel from "$lib/shared/panel/Panel.svelte";
    import PanelSection from "$lib/shared/panel/PanelSection.svelte";
    import SelectedParticipants from "$lib/player/SelectedParticipants.svelte";

    // Reset selected players
    clearSelectedPlayers()

    // Derived values
    let remainingHumans = $derived(listPlayers.filter(player => !selectedPlayers.includes(player)))
    let remainingBots = $derived(listBots.filter(bot => !selectedPlayers.includes(bot)))
    let canLaunchGame = $derived(selectedPlayers.length >= 2 || (selectedPlayers.length >= 1 && remainingBots.length > 0))

    // Actions
    function launch() {
        // Add a bot if only one player is selected
        if (selectedPlayers.length == 1 && remainingBots.length > 0) {
            selectedPlayers.push(remainingBots[0])
        }

        // Abort if less than 2 players
        if (selectedPlayers.length < 2) return

        // Go to game
        push('/game')
    }

    function selectRandomBot() {
        let index = randomBetween(0, remainingBots.length - 1)
        selectedPlayers.push(remainingBots[index])
    }

    function selectRandomHuman() {
        let index = randomBetween(0, remainingHumans.length - 1)
        selectedPlayers.push(remainingHumans[index])
    }
</script>

<Jumbo icon="play" title="Nouvelle partie" subtitle="Sélection des participants" />

<PageWrap>
    <div class="page-with-hero">
        <div class="hero">
            <Panel>
                <PanelSection title="Actions" icon="asterisk">
                    {#if canLaunchGame || selectedPlayers.length > 0}
                        <div class="actions" transition:slide>
                            {#if canLaunchGame}
                                <Button onclick={launch} center variant="primary">
                                    <Icon icon="play" size={32} />
                                    <span>Lancer la partie</span>
                                </Button>
                            {/if}
                            
                            {#if selectedPlayers.length > 0}
                                <Button onclick={clearSelectedPlayers} center>
                                    <Icon icon="bin" size={32} />
                                    <span>Vider la sélection</span>
                                </Button>
                            {/if}
                        </div>
                    {/if}

                    {#if selectedPlayers.length < 1}
                        <div class="warning" transition:slide>
                            <Icon icon="warning" size={64} />
                            <p>Choisissez un ou plusieurs joueur pour pouvoir lancer une partie.</p>
                        </div>
                    {/if}
                </PanelSection>

                <PanelSection title="Participants sélectionnés ({selectedPlayers.length})" icon="user" variant="transparent">
                    <div class="actions square-buttons">
                        {#if remainingHumans.length > 0}
                            <Button onclick={selectRandomHuman} center>
                                <Icon icon="user" size={32} />
                                <span>Choisir une personne au hasard</span>
                            </Button>
                        {:else}
                            <div class="fake-button">
                                <Icon icon="disable" size={32} />
                                <p>Aucun joueur disponible</p>
                            </div>
                        {/if}
                        
                        {#if remainingBots.length > 0}
                            <Button onclick={selectRandomBot} center variant="flat">
                                <Icon icon="bot" size={32} />
                                <span>Ajouter un bot au hasard</span>
                            </Button>
                        {:else}
                            <div class="fake-button">
                                <Icon icon="disable" size={32} />
                                <p>Aucun bot disponible</p>
                            </div>
                        {/if}
                    </div>

                    {#if canLaunchGame}
                        <div class="info" transition:slide>
                            <Icon icon="checkbox" size={64} />
                            {#if selectedPlayers.length == 1}
                                <p>Vous pouvez maintenant lancer la partie de {selectedPlayers[0].name} qui affrontera un bot.</p>
                            {:else}
                                <p>Vous pouvez lancer la partie pour faire affronter vos {selectedPlayers.length} participants.</p>
                            {/if}
                        </div>
                    {/if}

                    {#if selectedPlayers.length > 0}
                        <SelectedParticipants />
                    {/if}
                </PanelSection>
            </Panel>
        </div>

        {#snippet sectionHeader(icon: string, title: string)}
            <div class="head">
                <Icon icon={icon} size={32} />
                <h3>{ title }</h3>
            </div>
        {/snippet}

        <div class="sections">
            <section in:fade={{delay: 150}}>
                {@render sectionHeader("profile", "Joueurs disponibles")}
                {#if remainingHumans.length > 0}
                    <ListPlayers
                        players={remainingHumans}
                        onPlayerClick={selectPlayerById} />
                {:else}
                    <div class="empty">
                        <Icon icon="info" size={64} />
                        <p>Aucun joueur disponible.</p>

                        {#if listPlayers.length == 0}
                            <Button center variant="primary"
                                onclick={() => push('/players/0')}
                            >
                                <Icon icon="settings" size={16} />
                                Gestion des joueurs
                            </Button>
                        {/if}
                        
                        {#if remainingBots.length > 0}
                            <Button center onclick={selectRandomBot} >
                                <Icon icon="plus" size={14} />
                                Ajouter un robot
                            </Button>
                        {/if}
                    </div>
                {/if}
            </section>
        </div>
    </div>
</PageWrap>

<style>
    .page-with-hero {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 2rem;
        align-items: start;
        padding-top: 2rem;

        .hero {
            display: grid;
        }
    }

    .toolbar {
        display: grid;
        gap: .5rem;

        :global(button:first-child) {
            padding-block: 1rem;
        }
    }

    .actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: .5rem;
        padding: 0 1rem 1rem;

        :global {
            button {
                display: grid;
                place-content: center;
                aspect-ratio: 4/3;
                position: relative;

                span {
                    font-size: .8em;
                }
            }
        }

        .fake-button {
            display: grid;
            place-content: center;
            place-items: center;
            gap: .5rem;
            padding: .7rem 1rem;
            aspect-ratio: 4/3;
            text-align: center;
            border: 2px dashed light-dark(#aaa, #999);
            border-radius: 10px;

            p {
                font-size: .7em;
                margin: 0;
            }
        }

        &.square-buttons {
            :global(button),
            .fake-button {
                aspect-ratio: 1;
            }

            .fake-button {
                padding: 1rem;
            }
        }
    }

    .info, .warning, .empty {
        --tint: red;
        /*display: grid;
        place-items: center;*/
        gap: .5rem;
        font-size: .8em;
        color: var(--tint);
        text-align: center;

        display: flex;
        align-items: center;
        padding: 1rem .8rem 1.5rem;
        text-align: start;

        p {
            margin: 0;
        }
    }
    .info    {--tint: #65a30d;}
    .warning {--tint: #ca8a04;}
    .empty {
        --tint: inherit;
        padding: 1rem 0 2rem 0;
    }

    .sections {
        --border-color: rgba(0,0,0,.3);
        display: grid;
        box-shadow: 0 5px 30px rgba(0,0,0,.3);
        border-radius: 1rem;
        background: #fff;

        section {
            padding: 1rem;

            .head {
                padding: 1rem;
                display: flex;
                align-items: center;
                gap: .5rem;
            }
            h3 {
                margin: 0;
            }
        }
    }

    @media (prefers-color-scheme: dark) {
        .info    {--tint: #a3e635;}
        .warning {--tint: #facc15;}

        .sections {
            --border-color: rgba(255,255,255,.3);
            background: #323232;
            box-shadow: 0 0 0 1px var(--border-color), 0 5px 30px rgba(0,0,0,.3);
        }
    }
</style>
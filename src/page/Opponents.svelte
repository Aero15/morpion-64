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
    import Hero from "$lib/shared/Hero.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import { push } from "svelte-spa-router";

    // Effacer la selection
    clearSelectedPlayers()

    // Liste des joueurs non selectionnés
    let notSelectedPlayers = $derived(listPlayers.filter(player => !selectedPlayers.includes(player)))
    let remainingBots = $derived(listBots.filter(bot => !selectedPlayers.includes(bot)))

    // Actions
    let launch = () => push('/game')
    let abandon = () => push('/')

    function selectRandomBot() {
        let index = randomBetween(0, remainingBots.length - 1)
        selectedPlayers.push(remainingBots[index])
    }
</script>

<PageWrap>
    <div class="page-with-hero">
        <Hero icon="user" title="Participants">
            <div class="toolbar">
                {#if selectedPlayers.length > 1}
                    <Button onclick={launch} center variant="primary">
                        <Icon icon="play" size={18} />
                        <span>Lancer la partie</span>
                    </Button>
                {/if}
                <Button onclick={abandon} center>
                    <Icon icon="undo" size={18} />
                    <span>Annuler</span>
                </Button>
            </div>

            <div class="actions">
                {#if remainingBots.length > 0}
                    <Button onclick={selectRandomBot} center>
                        <Icon icon="bot" size={32} />
                        <span>Ajouter un robot</span>
                    </Button>
                {:else}
                    <span></span>
                {/if}
                
                {#if selectedPlayers.length > 0}
                    <Button onclick={clearSelectedPlayers} center>
                        <Icon icon="bin" size={32} />
                        <span>Vider la sélection</span>
                    </Button>
                {/if}
            </div>

            <div class="status">
                {#if selectedPlayers.length < 2}
                    <div class="warning" transition:slide>
                        <Icon icon="warning" size={64} />
                        <p>Vous devez choisir au moins deux joueurs pour pouvoir lancer une partie.</p>
                    </div>
                {/if}

                {#if selectedPlayers.length >= 2}
                    <div class="info" transition:slide>
                        <Icon icon="checkbox" size={64} />
                        <p>Vous pouvez lancer la partie pour faire affronter vos {selectedPlayers.length} participants.</p>
                    </div>
                {/if}
            </div>
        </Hero>

        {#snippet sectionHeader(icon: string, title: string)}
            <div class="head">
                <Icon icon={icon} size={32} />
                <h3>{ title }</h3>
            </div>
        {/snippet}

        <div class="sections">
            <section in:fade={{delay: 150}}>
                {@render sectionHeader("profile", "Joueurs disponibles")}
                {#if notSelectedPlayers.length > 0}
                    <ListPlayers
                        players={notSelectedPlayers}
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

            <div class="separator"></div>

            <section in:fade={{delay: 300}}>
                {@render sectionHeader("checkbox", "Joueurs sélectionnés")}
                {#if selectedPlayers.length > 0}
                    <ListPlayers players={selectedPlayers} onPlayerClick={removeSelectedPlayerById} />
                {:else}
                    <div class="empty">
                        <Icon icon="warning" size={64} />
                        <p>Aucun joueur séléctionné.</p>
                    </div>
                {/if}
            </section>
        </div>
    </div>
</PageWrap>

<style>
    .page-with-hero {
        display: grid;
        grid-template-columns: 350px 1fr;
        gap: 2rem;
        align-items: start;
        padding-top: 2rem;
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
    }

    .info, .warning, .empty {
        --tint: red;
        display: grid;
        place-items: center;
        gap: .5rem;
        font-size: .9em;
        color: var(--tint);
        text-align: center;

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
        grid-template-columns: 1fr 1px 1fr;
        box-shadow: 0 5px 30px rgba(0,0,0,.3);
        border-radius: 2rem;
        background: #fff;

        .separator {
            border-left: 1px solid var(--border-color);
        }

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
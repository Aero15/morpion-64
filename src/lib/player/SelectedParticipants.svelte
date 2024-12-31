<script lang="ts">
    import Bot from "$core/entity/player/Bot.svelte";
    import Human from "$core/entity/player/Human.svelte";
    import { Difficulty } from "$core/enums/Difficulty";
    import { Symbol } from "$core/enums/Symbol";
    import { randomColor } from "$core/helpers/Colors.svelte";
    import { removeSelectedPlayerById } from "$core/helpers/Players.svelte";
    import { selectedPlayers } from "$core/store/players.svelte";
    import Button from "$lib/form/Button.svelte";
    import Icon from "$lib/shared/Icon.svelte";

    let bots: Bot[] = $state([])
    let humans: Human[] = $state([])

    function sorter(
        player1: Bot | Human,
        player2: Bot | Human
    ) {
        return player1.name.localeCompare(player2.name)
    }

    $effect(() => {
        bots = selectedPlayers
            .filter(player => player instanceof Bot)
            .sort(sorter)
        humans = selectedPlayers
            .filter(player => player instanceof Human)
            .sort(sorter)
    })
</script>

{#snippet item(player: Bot | Human, ghost: boolean = false)}
    <li class:ghost>
        <div class="identity">
            <div class="avatar" style:color={player.color}>
                <Icon icon={player.symbol} size={32} />
            </div>
    
            <p class="name">{player.name}</p>
    
            {#if player instanceof Bot}
                {#if ghost}
                    <p class="difficulty">Aléatoire</p>
                {:else}
                    <p class="difficulty">{player.difficulty}</p>
                {/if}
            {/if}
        </div>
        
        {#if !ghost}
            <Button variant="flat" onclick={() => removeSelectedPlayerById(player.id)}>
                <Icon icon="bin" size={18} />
            </Button>
        {/if}
    </li>
{/snippet}

<ul class="bx-selected_players">
    {#each humans as human}
        {@render item(human)}
    {/each}
    {#each bots as bot}
        {@render item(bot)}
    {/each}

    {#if selectedPlayers.length == 1}
        {@render item(new Bot('Bot', Symbol.Bot, randomColor(), Difficulty.Peaceful), true)}
    {/if}
</ul>

<style>
    .bx-selected_players {
        display: grid;
        padding: 0;
        margin: 0;
        list-style: none;

        li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: .5rem;
            padding: .25rem .25rem .25rem .5rem;
            border: 1px solid transparent;
            border-radius: 1rem;
            transition: border-color .2s, background .2s, backdrop-filter .2s;

            &:hover {
                background: light-dark(#00000022, #ffffff22);
                border-color: light-dark(#00000055, #ffffff55);
                backdrop-filter: blur(10px);
            }

            .identity {
                display: flex;
                align-items: center;
                gap: .5rem;

                .avatar {
                    display: grid;
                    place-content: center;
                    border-radius: 2rem;
                    background: var(--color);
                    width: 2rem;
                    height: 2rem;
                }

                .name {
                    margin: 0;
                    font-size: .87em;
                }

                .difficulty {
                    margin: 0;
                    font-size: .6em;
                    text-transform: uppercase;
                    border: 1px solid light-dark(#000, #fff);
                    border-radius: 6px;
                    padding: 2px 5px 4px;
                }
            }
        }
    }
</style>
<script lang="ts">
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import AvatarPlayer from "$lib/player/AvatarPlayer.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import { slide } from "svelte/transition";
    import { _ } from "svelte-i18n";

    interface Props {
        game: GameEngine,
    }

    let {
        game = $bindable(new GameEngine([], 0, 0))
    }: Props = $props();
</script>

<div class="bx-endgame_winner">
    {#if game.endTime !== undefined}
        {#if game.winnerInfo !== undefined && game.players.getCurrentPlayer() !== null}
            {@const player = game.players.getCurrentPlayer()!}
            <div class="winner" transition:slide>
                <h3>{ $_('game.message.well_done') }</h3>
                <div class="ident">
                    <AvatarPlayer tinted
                        shape="circular"
                        name={ player.name }
                        color={ player.color }
                        symbol={ player.symbol }
                        type={ player.type }
                    />
                    <Icon icon="thumb_up" size={90} />
                </div>
                <p>{ $_('game.message.player_won', {values: {name: player.name}}) }</p>
            </div>
        {/if}

        {#if game.winnerInfo === undefined}
            <div class="winner" transition:slide>
                <h3>{ $_('game.message.draw') }</h3>
                <div class="ident">
                    <Icon icon="thumb_down" size={90} />
                </div>
                <p>{ $_('game.message.no_winner') }</p>
            </div>
        {/if}
    {/if}
</div>

<style>
    .bx-endgame_winner {
        .winner {
            text-align: center;
            font-size: .9em;

            .ident {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                margin-bottom: .5rem;
            }

            h3, p { margin: 0; }
            h3 {font-size: 3em;}
        }
    }
</style>
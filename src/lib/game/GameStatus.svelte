<script lang="ts">
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import { newGameWithSelectedPlayers } from "$core/helpers/Game.svelte";
    import Button from "$lib/form/Button.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import { push } from "svelte-spa-router";
    import Timer from "./Timer.svelte";
    import { _ } from "svelte-i18n";

    interface Props {
        game: GameEngine,
        orientation?: 'horizontal' | 'vertical'
    }

    let {
        game = $bindable(new GameEngine([], 0, 0)),
        orientation = 'horizontal'
    }: Props = $props();

    function newGame() {
        game.players.clearTemporaryScore()
        let g = newGameWithSelectedPlayers()
        if (g != null) {
            game = g
        }
    }
</script>

<main class="bx-game_status"
    class:horizontal={orientation === 'horizontal'}
    class:vertical={orientation === 'vertical'}
>
    <Timer secondsTotal={game.timer.seconds} />

    <div class="actions">
        {#if game.endTime === undefined}
            {#if game.timer.isRunning}
                <Button center
                    variant="primary-green"
                    shape="rounded"
                    title={ $_('game.actions.pause') }
                    onclick={() => game.timer.stop()}
                >
                    <Icon icon="pause" size={18} />
                </Button>
            {:else}
                <Button center
                    variant="primary"
                    shape="rounded"
                    title={ $_('game.actions.resume') }
                    onclick={() => game.timer.resume()}
                >
                    <Icon icon="play" size={18} />
                </Button>
            {/if}
        {/if}

        <Button center
            variant={game.endTime === undefined ? 'primary-yellow' : 'primary'}
            shape="rounded"
            title={ $_('game.actions.restart') }
            onclick={newGame}
        >
            <Icon icon="rotate" size={18} />
        </Button>

        <Button center
            variant="primary-red"
            shape="rounded"
            title={ $_('common.leave') }
            onclick={() => push('/')}
        >
            <Icon icon="cross" size={18} />
        </Button>
    </div>
</main>

<style>
    .bx-game_status {
        display: flex;
        justify-content: space-between;

        &.vertical {
            flex-direction: column-reverse;
            align-items: end;
        }

        &.horizontal {
            flex-direction: row;
            align-items: center;
            gap: 1rem;
        }

        .actions {
            display: flex;
            justify-content: end;
            align-items: center;
            gap: .25rem;
        }
    }
</style>
<script lang="ts">
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import Button from "$lib/form/Button.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import { slide } from "svelte/transition";
    import { _ } from "svelte-i18n";

    interface Props {
        game: GameEngine,
        compact?: boolean
    }

    let {
        game = $bindable(new GameEngine([], 0, 0)),
        compact = false
    }: Props = $props();

    let iconSize = $derived(compact ? 24 : 32)
</script>

<div class="bx-tools"
    class:compact
    transition:slide>
    <Button onclick={() => game.eraserEnabled = false} center shape="squared"
        variant={game.eraserEnabled ? 'default' : 'primary'}
        title={ $_('game.tools.place_symbol') }>
        <Icon icon="gps_fix" size={iconSize} />
        {#if !compact}
            <p>{ $_('game.tools.place') }</p>
        {/if}
        <div class="indicator" style:opacity={!game.eraserEnabled ? 1 : 0}></div>
    </Button>

    <Button onclick={() => game.eraserEnabled = true} center shape="squared"
        variant={game.eraserEnabled ? 'primary' : 'default'}
        title={ $_('game.tools.remove_symbol') }>
        <Icon icon="gps_slash" size={iconSize} />
        {#if !compact}
            <p>{ $_('game.tools.erase') }</p>
        {/if}
        <div class="indicator" style:opacity={game.eraserEnabled ? 1 : 0}></div>
    </Button>

    <Button center shape="squared" onclick={() => game.showHint()}
        disabled={game.eraserEnabled}
        title={ $_('game.tools.show_hint') }>
        <Icon icon="info" size={iconSize} />
        {#if !compact}
            <p>{ $_('game.tools.hint') }</p>
        {/if}
    </Button>
</div>

<style>
    .bx-tools {
        gap: .25rem;

        &.compact {
            height: 3.5rem;
            display: flex;
            align-items: stretch;
            justify-content: start;
        }

        &:not(.compact) {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
        }

        :global(button) {
            display: grid;
            place-content: center;
            justify-content: stretch;
            position: relative;
            gap: .25rem;
            padding: 0;
        }

        p {
            font-size: .78em;
            margin: 0;
            width: calc(100% - 10px);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 5px;
        }

        .indicator {
            position: absolute;
            inset: auto 0 4px 0;
            border-radius: 50px;
            background: #fff;
            height: 4px;
            width: 30px;
            margin: auto;
        }
    }
</style>
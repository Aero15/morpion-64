<script lang="ts">
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import Button from "$lib/form/Button.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import { slide } from "svelte/transition";

    interface Props {
        game: GameEngine,
    }

    let {
        game = $bindable(new GameEngine([], 0, 0))
    }: Props = $props();
</script>

<div class="bx-tools" transition:slide>
    <Button onclick={() => game.eraserEnabled = false} center shape="squared"
        variant={game.eraserEnabled ? 'default' : 'primary'}>
        <Icon icon="gps_fix" size={32} />
        <p>Placer</p>
        <div class="indicator" style:opacity={!game.eraserEnabled ? 1 : 0}></div>
    </Button>

    <Button onclick={() => game.eraserEnabled = true} center shape="squared"
        variant={game.eraserEnabled ? 'primary' : 'default'}>
        <Icon icon="gps_slash" size={32} />
        <p>Effacer</p>
        <div class="indicator" style:opacity={game.eraserEnabled ? 1 : 0}></div>
    </Button>

    <Button center onclick={() => game.showHint()}>
        <Icon icon="info" size={32} />
        <p>Astuce</p>
    </Button>
</div>

<style>
    .bx-tools {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: .25rem;

        :global {
            button {
                display: grid;
                place-content: center;
                justify-content: stretch;
                position: relative;
                gap: .25rem;
                padding: 0;
            }
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
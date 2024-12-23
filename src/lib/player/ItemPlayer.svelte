<script lang="ts">
    import { Difficulty } from "$core/enums/Difficulty";
    import { PlayerType } from "$core/enums/PlayerType";
    import { improveContrast } from "$core/helpers/Colors.svelte";
    import AvatarPlayer from "./AvatarPlayer.svelte";

    interface Props {
        id?: number,
        name: string,
        color: string,
        symbol: string,
        type: PlayerType;
        compact?: boolean,
        difficulty?: Difficulty,

        onclick?: ((id: number) => void) | null
    }

    let {
        id = $bindable(0),
        name = $bindable(''),
        color = $bindable(''),
        symbol = $bindable(''),
        type = PlayerType.Human,
        compact = $bindable(false),
        difficulty = $bindable(),

        onclick = null,
    }: Props = $props();

    let symbolColor = $derived.by(() => {
        let { light, dark } = improveContrast(color);
        return `light-dark(${light}, ${dark})`;
    })
</script>

<button
    style:--tint={symbolColor}
    class:clickable={ !!onclick }
    class:compact
    onclick={ () => onclick ? onclick(id) : null } >
    <AvatarPlayer { name } { color } { symbol } { type } { compact } />
    <p class="name">{ name }</p>
    {#if type === PlayerType.Bot && difficulty}
        <p class="difficulty">{ difficulty }</p>
    {/if}
</button>

<style>
    button {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: none;
        background: transparent;
        gap: .25rem;

        p {
            margin: 0;
            font-family: Marianne, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;

            &.name {
                font-size: .9em;
            }

            &.difficulty {
                font-size: .6em;
                text-transform: uppercase;
                border: 1px solid light-dark(#000, #fff);
                border-radius: 6px;
                padding: 2px 5px 3px;
            }
        }

        &.clickable {
            --tint: red;
            cursor: crosshair;
            border-radius: .5rem;
            border: 1px solid transparent;
            transition: background .2s, border-color .2s, color .2s;

            &.compact {
                padding: .5rem;

                p.name {
                    font-size: .78em;
                    width: calc(100% + .5rem);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

            &:not(.compact) {
                padding: 1rem;
            }

            &:hover {
                background: var(--tint);
                border-color: light-dark(#00000077, #ffffff77);
                color: #fff;
            }
        }
    }
</style>
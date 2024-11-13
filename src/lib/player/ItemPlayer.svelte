<script lang="ts">
    import { PlayerType } from "$core/enums/PlayerType";
    import AvatarPlayer from "./AvatarPlayer.svelte";

    interface Props {
        id?: number,
        name: string,
        color: string,
        symbol: string,
        type: PlayerType

        onclick?: ((id: number) => void) | null
    }

    let {
        id = $bindable(0),
        name = $bindable(''),
        color = $bindable(''),
        symbol = $bindable(''),
        type = PlayerType.Human,

        onclick = null,
    }: Props = $props();
</script>

<button
    class:clickable={ !!onclick }
    onclick={ () => onclick ? onclick(id) : null } >
    <AvatarPlayer { name } { color } { symbol } { type } />
    <p>{ name }</p>
</button>

<style>
    button {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: none;
        background: transparent;
        gap: .5rem;

        p {
            margin: 0;
            font-size: .9em;
            font-family: Marianne, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        }

        &.clickable {
            cursor: pointer;
            border-radius: 1rem;
            padding: 1rem;
            border: 4px solid transparent;

            &:hover {
                background: linear-gradient(to top, var(--main_color), transparent);
                border-color: var(--main_color);
                color: #fff;
            }
        }
    }
</style>
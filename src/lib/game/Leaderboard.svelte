<script lang="ts">
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import { improveContrast } from "$core/helpers/Colors.svelte";
    import Icon from "$lib/shared/Icon.svelte";

    interface Props {
        game: GameEngine
    }

    let {
        game = $bindable(new GameEngine([], 0, 0))
    }: Props = $props();

    let ranking = $derived(game.players.players.toSorted((a, b) => b.score - a.score))

    function improveColor(color: string) {
        let { light, dark } = improveContrast(color);
        return `light-dark(${light}, ${dark})`;
    }
</script>

<table class="bx-leaderboard">
    <thead>
        <tr>
            <th><strong>#</strong></th>
            <th><strong>Nom</strong></th>
            <th><strong>Score</strong></th>
        </tr>
    </thead>

    <tbody>
        {#each ranking as { color, name, symbol, score }, index}
            <tr>
                <td><p class="rank">{index + 1}</p></td>
                <td>
                    <div class="identity">
                        <p style:color={improveColor(color)} class="symbol">
                            <Icon icon={symbol} size={18} />
                        </p>
                        <p class="name">{name}</p>
                    </div>
                </td>
                <td>
                    <p class="score">
                        <strong>{score}</strong>
                    </p>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    .bx-leaderboard {
        border-collapse: collapse;
        padding: 0;
        margin: 0;

        th, td {
            font-size: .8em;
            text-align: start;
        }

        tbody tr:hover {
            background: light-dark(#ebbffa, #45727a);
        }

        p {
            margin: 0;
        }

        .identity {
            display: flex;
            align-items: center;
            gap: .25rem;
            padding: .25rem 0;

            .symbol { font-size: 0; }
        }

        .score strong {
            background: linear-gradient(
                to right,
                light-dark(rgb(255, 0, 200), rgb(255, 145, 243)),
                light-dark(rgb(0, 153, 255), cyan)
            );
            background-clip: text;
            color: transparent;
        }
    }
</style>
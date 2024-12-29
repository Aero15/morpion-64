<script lang="ts">
    import GameEngine from "$core/entity/engine/GameEngine.svelte";
    import { improveContrast } from "$core/helpers/Colors.svelte";
    import Button from "$lib/form/Button.svelte";
    import Icon from "$lib/shared/Icon.svelte";

    interface Props {
        game: GameEngine,
        limit?: number,
        compact?: boolean,
        hightlightFirstRows?: boolean
    }

    let {
        game = $bindable(new GameEngine([], 0, 0)),
        hightlightFirstRows = false,
        compact = false,
        limit = $bindable(0)
    }: Props = $props();

    let sorted = $derived(game.players.players.toSorted((a, b) => b.temporaryScore - a.temporaryScore))
    let ranking = $derived(limit > 0 ? sorted.slice(0, limit) : sorted)

    function improveColor(color: string) {
        let { light, dark } = improveContrast(color);
        return `light-dark(${light}, ${dark})`;
    }

    function formatScore(score: number) {
        return score.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }
</script>

<div class="bx-leaderboard">
    <table class:hightlightFirstRows class:compact>
        <thead>
            <tr>
                <th><strong>#</strong></th>
                <th><strong>Nom</strong></th>
                <th style:text-align="end"><strong>Score</strong></th>
            </tr>
        </thead>
    
        <tbody>
            {#each ranking as { color, name, symbol, temporaryScore }, index}
                <tr class:podium={index < 3}>
                    <td><p class="rank"><strong>{index + 1}</strong></p></td>
                    <td>
                        <div class="identity">
                            <p style:color={improveColor(color)} class="symbol">
                                <Icon icon={symbol} size={compact ? 16 : 24} />
                            </p>
                            <p class="name">{name}</p>
                        </div>
                    </td>
                    <td>
                        <p class="score">
                            <strong>{formatScore(temporaryScore)}</strong>
                            <span>pts</span>
                        </p>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    
    <div class="actions">
        {#if sorted.length > limit && limit > 0}
            <Button center title="Ouvrir le classement"
                onclick={() => limit = sorted.length}>
                <Icon icon="chevron_down" size={16} />
                <span>Afficher le reste du classement ({sorted.length - limit})</span>
            </Button>
        {/if}
    
        {#if limit == sorted.length}
            <Button center title="Ouvrir le classement"
                onclick={() => limit = 3}>
                <Icon icon="chevron_up" size={16} />
                <span>Réduire le classement</span>
            </Button>
        {/if}
    </div>
</div>

<style>
    .bx-leaderboard {
        display: grid;
        gap: .5rem;
    }

    .bx-leaderboard table {
        border-collapse: collapse;
        padding: 0;
        margin: 0;

        th, td {
            text-align: start;
        }

        &:not(.compact) :where(td, th) {
            padding: .25rem 0;
            font-size: .9em;
        }

        &.compact :where(td, th) {
            font-size: .8em;
        }

        &.hightlightFirstRows tr.podium {
            background: linear-gradient(
                to left,
                transparent,
                light-dark(#00000033, #ffffff33),
                transparent
            );
        }

        tbody tr {
            border-top: 1px solid light-dark(#00000033, #ffffff33);

            &:hover {
                background: light-dark(#ebbffa, #45727a);
            }
        }

        p {
            margin: 0;
        }

        .identity {
            display: flex;
            align-items: center;
            gap: .5rem;
            padding: .25rem 0;

            .symbol { font-size: 0; }
        }

        .score {
            text-align: end;

            strong {
                background: linear-gradient(
                    to right,
                    light-dark(rgb(255, 0, 200), rgb(255, 145, 243)),
                    light-dark(rgb(0, 153, 255), cyan)
                );
                background-clip: text;
                color: transparent;
                font-size: 1.2em;
            }
        }
    }

    .bx-leaderboard .actions {
        display: grid;

        :global(button) {
            justify-content: start;
            span {
                font-size: .8em;
            }
        }
    }
</style>
<script>
    import { listBots, listPlayers } from "$core/store/players.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import Ranking from "$lib/rank/Ranking.svelte";
    import Jumbo from "$lib/shared/Jumbo.svelte";

    let players = $state([
        ...listBots,
        ...listPlayers
    ])
</script>

<Jumbo icon="podium" title="Classement" />

<PageWrap>
    <div id="pg-ranking">
        <Ranking {players} displayType tilesMode />
    </div>
</PageWrap>

<style>
    #pg-ranking {
        display: grid;
    }
</style>
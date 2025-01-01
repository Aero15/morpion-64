import { wrap } from 'svelte-spa-router/wrap';

// Create a route asynchronously
function createAsyncRoute (
    path: string,
    component: any
) {
    return {
        [path]: wrap({
            asyncComponent: component
        })
    };
}

export const rt_newGame = '/new-game';

export const routes = {
    ...createAsyncRoute('/',            () => import('$page/Home.svelte')),

    ...createAsyncRoute('/players',     () => import('$page/Players.svelte')),
    ...createAsyncRoute('/players/:id', () => import('$page/Profile.svelte')),

    ...createAsyncRoute(rt_newGame,     () => import('$page/NewGame.svelte')),
    ...createAsyncRoute(rt_newGame+'/:section',     () => import('$page/NewGame.svelte')),
    ...createAsyncRoute('/game',        () => import('$page/Game.svelte')),

    ...createAsyncRoute('/ranking',     () => import('$page/Ranking.svelte')),
    ...createAsyncRoute('/settings',    () => import('$page/Settings.svelte')),
    ...createAsyncRoute('/about',       () => import('$page/About.svelte')),

    ...createAsyncRoute('/menu',        () => import('$page/Menu.svelte')),
    ...createAsyncRoute('*',            () => import('$page/NotFound.svelte')),
};

export const routes_newGame = {
    ...createAsyncRoute('/grid',        () => import('$page/new_game/GridSize.svelte')),
    ...createAsyncRoute('/participants',() => import('$page/new_game/Participants.svelte')),
    ...createAsyncRoute('/recap',       () => import('$page/new_game/Recap.svelte')),
};
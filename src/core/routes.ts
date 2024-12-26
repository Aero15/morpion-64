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

export const routes = {
    ...createAsyncRoute('/',            () => import('$page/Home.svelte')),
    ...createAsyncRoute('/players',     () => import('$page/Players.svelte')),
    ...createAsyncRoute('/players/:id', () => import('$page/Profile.svelte')),
    ...createAsyncRoute('/opponents',   () => import('$page/Opponents.svelte')),
    ...createAsyncRoute('/game',        () => import('$page/Game.svelte')),
    ...createAsyncRoute('/ranking',     () => import('$page/Ranking.svelte')),
    ...createAsyncRoute('/settings',    () => import('$page/Settings.svelte')),
    ...createAsyncRoute('/about',       () => import('$page/About.svelte')),
    ...createAsyncRoute('/menu',        () => import('$page/Menu.svelte')),
    ...createAsyncRoute('*',            () => import('$page/NotFound.svelte')),
};

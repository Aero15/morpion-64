import { wrap } from 'svelte-spa-router/wrap';

// Créer une route asynchrone
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
    ...createAsyncRoute('/settings',    () => import('$page/Settings.svelte')),
    //...createAsyncRoute('/game',        () => import('$page/Game.svelte')),
    ...createAsyncRoute('/about',       () => import('$page/About.svelte')),
    ...createAsyncRoute('*',            () => import('$page/NotFound.svelte')),
};

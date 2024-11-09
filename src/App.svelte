<script lang="ts">
    import { routes } from "$core/routes";
    import Router from "svelte-spa-router";
    import Header from "$lib/global/Header.svelte";
</script>

<main>
    <Header />

    <Router { routes } />
</main>

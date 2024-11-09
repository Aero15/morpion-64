<script>
    import Icon from "$lib/shared/Icon.svelte";

</script>

<main>
    <Icon icon="bot" size={100} />
    <h2>Vous vous êtes égaré</h2>
    <p>Erreur 404</p>

    <a href="#/">
        <Icon icon="house" size={20} />
        Retourner à l'accueil
    </a>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: clamp(5rem, 4vw, 7rem) 2rem;
    }

    h2 {
        margin: 0;
        font-size: clamp(1.5rem, 4vw, 3rem);
    }

    a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 2rem;
        text-decoration: none;
    }
</style>
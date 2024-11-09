<script>
    import Button from "$lib/form/Button.svelte";
import Icon from "$lib/shared/Icon.svelte";

</script>

<main>
    <Icon icon="bot" size={100} />
    <h2>Rien à voir par ici</h2>
    <p>Erreur 404 : page non trouvée</p>

    <a href="#/">
        <Button center variant="primary">
            <Icon icon="house" size={18} />
            Retourner à l'accueil
        </Button>
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
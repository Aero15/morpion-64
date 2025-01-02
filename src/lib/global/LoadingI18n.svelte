<script lang="ts">
    import favicon from '/favicon.svg';
    import Loader from "$lib/shared/Loader.svelte";
</script>

<main id="bx-loadingI18n">
    <img src={favicon} alt="Logo of Morpion 64" />

    <h1>Morpion <span>64</span></h1>

    <Loader variant="xl" />
</main>

<style>
    #bx-loadingI18n {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
            max-width: clamp(100px, 16vw, 250px);
        }

        h1 {
            margin: 0;
            background: linear-gradient(to right, #00FFFF, #0099FF, #FF00FF);
            background-clip: text;
            color: transparent;
            font-size: clamp(2rem, 6vw, 5rem);
            margin: 2rem 0 clamp(1rem, 6vw, 2rem);

            span {
                font-family: Marianne-Light, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
            }
        }
    }
</style>
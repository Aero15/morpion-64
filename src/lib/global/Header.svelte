<script>
</script>

<header>
    <h1>
        <a href="#/">Morpion <span>64</span></a>
    </h1>
</header>

<style>
    header {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        margin: 0;
        font-size: clamp(1.5rem, 4vw, 3rem);
        transition: transform .2s;

        a {
            background: linear-gradient(to right, rgb(157, 82, 255), rgb(0, 153, 255), cyan);
            background-clip: text;
            color: transparent;

            span {
                font-family: Marianne-Light, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
            }
        }

        &:hover {
            transform: scale(1.2) rotate(-3deg);
            text-decoration: underline;
        }

        &:active {
            transform: scale(1);
        }
    }
</style>
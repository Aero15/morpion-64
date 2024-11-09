<script lang="ts">
    // Props
    let {
        id = '',
        type = 'text',
        disabled = false,
        placeholder = '',
        value = $bindable('')
    } = $props();
</script>

<input
    { id } { type }
    { placeholder }
    { disabled }
    bind:value
/>

<style> 
    input {
        font-family: Marianne, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        border: 1px solid rgba(0,0,0,.3);
        background: transparent;
        box-sizing: content-box;
        border-radius: 10px;
        padding: 6px 10px;
        font-size: 14px;
        color: black;
        min-width: 200px;
        margin: 2px;
        transition: box-shadow .2s;

        &:hover, &:focus {
            margin: 1px;
            border-width: 2px;
        }

        &:hover {
            box-shadow: 0 0 0 #000;
        }

        &:focus {
            border-color: var(--main_color);
            box-shadow: 0 0 30px rgba(0,120,200,.7);
            outline: none;
        }
    }

    @media (prefers-color-scheme: dark) {
        input {
            border-color: rgba(255,255,255,.3);
            color: #fff;

            &:hover {
                margin: 1px;
                border-width: 2px;
                box-shadow: 0 0 0 #000;
            }

            &:focus {
                border-color: var(--main_color);
                box-shadow: 0 0 30px rgba(0,120,200,.9);
            }
        }
    }
</style>
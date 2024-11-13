<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title?: string,
        variant?: string,
        rounded?: string,
        disabled?: boolean,
        center?: boolean,
        onclick?: () => void,
        children?: Snippet
    }

    let {
        children,
        title = '',
        variant = '',
        rounded = 'default',
        disabled = $bindable(false),
        center = false,
        onclick = () => {},
        ...restProps
    }: Props = $props();
</script>

<button { title } { onclick }
    class:primary={variant === 'primary'}
    class:flat={variant === 'flat'}

    class:rounded={rounded === 'rounded'}
    class:squared={rounded === 'squared'}

    disabled={ disabled ? true : false }
    class:centered-content={center}

    {...restProps}
>
    {@render children()}
</button>

<style>
    button {
        font-family: Marianne, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        border: 1px solid transparent;
        background: rgb(215, 215, 215);
        border-radius: 10px;
        padding: 8px .8em;
        font-weight: 500;
        font-size: .9em;
        cursor: pointer;
        color: #000;
        transition:
            transform .2s,
            border-color .2s,
            background-color .2s,
            box-shadow .2s,
            color .2s;

        /* Color */
        &.primary {
            background: var(--main_color);
            color: #fff;
        }

        /* Look */
        &.rounded {border-radius: 1000px; padding: 7px 20px;}
        &.squared {border-radius: 0;}
        &.flat {background: transparent;}
        &.primary.flat {color: var(--main_color);}
    
        /* Content */
        &.centered-content {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
        
        /* Events */
        &:hover, &:focus, &:focus-visible {
            background: rgb(200,200,200);
            border-color: rgba(0,0,0,.3);
            box-shadow: 0px 0 30px rgba(0,0,0,.3), 0 0 0 rgba(0,0,0,.3) inset;
        
            &.primary, 
            &.primary {
                color: #fff;
                background: var(--main_color);
                box-shadow: 0px 0 30px var(--main_color), 0 0 0 rgba(0,0,0,.5) inset;
            }
        }

        &:active {
            background: rgb(200,200,200);
            border-color: rgba(0,0,0,.3);
            transform: translateY(2px);
            box-shadow: 0 0 0 rgba(0,0,0,.3), 0 0 10px rgba(0,0,0,.3) inset;
        }
    }

    @media (prefers-color-scheme: dark) {
        button {
            color: #fff;
            background: rgb(60,60,60);
        
            /* Color */
            &.primary {background: var(--main_color);}
            &.flat {background: transparent;}
            &.primary.flat {color: var(--main_color_bright);}
        
            /* Content */
            &:hover, &:focus {
                background: rgb(80,80,80);
                border-color: rgba(255,255,255,.2);
                box-shadow: 0px 0 30px rgba(255,255,255,.2), 0 0 0 rgba(0,0,0,.3) inset;
            
                &.primary {border-color: rgba(255,255,255,.3);}
                &.primary {
                    color: #fff;
                    background: var(--main_color);
                    box-shadow: 0px 0 30px var(--main_color), 0 0 0 rgba(0,0,0,.5) inset;
                }
                &.primary.flat {background: var(--main_color);}
            }

            &:active {
                background: rgb(60,60,60);
                border-color: rgba(255,255,255,.2);
                box-shadow: 0 0 0 rgba(255,255,255,.3), 0 0 10px rgba(0,0,0,.3) inset;
            }
        }
    }
</style>
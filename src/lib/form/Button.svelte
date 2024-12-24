<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title?: string,
        variant?: 'primary' | 'default' | 'flat' | 'primary-red' | 'primary-green' | 'primary-yellow',
        shape?: 'default' | 'rounded' | 'squared',
        disabled?: boolean,
        center?: boolean,
        onclick?: () => void,
        children?: Snippet
    }

    let {
        children,
        title = '',
        variant = 'default',
        shape = 'default',
        disabled = $bindable(false),
        center = false,
        onclick = () => {},
        ...restProps
    }: Props = $props();
</script>

<button { title } { onclick }
    class:primary={variant === 'primary'}
    class:flat={variant === 'flat'}
    class:primary-red={variant === 'primary-red'}
    class:primary-green={variant === 'primary-green'}
    class:primary-yellow={variant === 'primary-yellow'}

    class:rounded={shape === 'rounded'}
    class:squared={shape === 'squared'}

    disabled={ disabled ? true : false }
    class:centered-content={center}

    {...restProps}
>
    {#if children}
        {@render children()}
    {/if}
</button>

<style>
    button {
        font-family: inherit;
        border: 1px solid transparent;
        background: light-dark(rgb(215, 215, 215), rgb(80, 80, 80));
        border-radius: 10px;
        padding: 8px .8em;
        font-weight: 500;
        font-size: .9em;
        cursor: pointer;
        color: light-dark(#000, #fff);
        transition:
            transform .2s,
            border-color .2s,
            background-color .2s,
            box-shadow .2s,
            color .2s;

        /* Color */
        &.primary,
        &.primary-yellow,
        &.primary-green,
        &.primary-red {
            background: var(--main_color);
            color: #fff;
        }

        /* Look */
        &.rounded {border-radius: 1000px; padding: .75rem;}
        &.squared {aspect-ratio: 1; padding: 5px;}
        &.flat {background: transparent; color: inherit;}
        &.primary.flat {color: var(--main_color);}
        &.primary-red {--main_color: #dc2626;}
        &.primary-green {--main_color: #65a30d;}
        &.primary-yellow {--main_color: #f59e0b;}
    
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
            &.primary-yellow, 
            &.primary-green, 
            &.primary-red {
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
            /* Color */
            &.primary {background: var(--main_color);}
            &.flat {background: transparent;}
            &.primary.flat {color: var(--main_color_bright);}
        
            /* Content */
            &:hover, &:focus {
                background: rgb(80,80,80);
                border-color: rgba(255,255,255,.2);
                box-shadow: 0px 0 30px rgba(255,255,255,.2), 0 0 0 rgba(0,0,0,.3) inset;
            
                &.flat {color: #fff;}
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
<script lang="ts">
    import { fade } from "svelte/transition";
    import Icon from "./Icon.svelte";

    interface Props {
        tabs: {name: string, icon: string, id: number}[],
        alignement?: 'start' | 'center' | 'end',
        orientation?: 'horizontal' | 'vertical',
        variant?: 'squared' | 'rounded' | 'default',
        selectedId?: number,
    }

    let {
        tabs = $bindable<{name: string, icon: string, id: number}[]>([]),
        selectedId = $bindable(0),
        orientation = 'horizontal',
        alignement = 'center',
        variant = 'default',
    }: Props = $props();

    let iconSize = $derived.by(() => {
        switch (variant) {
            case 'squared': return 24;
            case 'rounded': return 32;
            default: return 18;
        }
    })
</script>

<nav class="bx-tabs"
    class:horizontal={orientation === 'horizontal'}
    class:vertical={orientation === 'vertical'}
    class:start={alignement === 'start'}
    class:center={alignement === 'center'}
    class:end={alignement === 'end'}
    class:default={variant === 'default'}
    class:squared={variant === 'squared'}
    class:rounded={variant === 'rounded'}
>
    {#each tabs as {name, icon, id}}
        <input type="radio" id={'tab_'+id} hidden
            name="tabs" bind:group={selectedId} value={id} />
        <label for={'tab_'+id} class:selected={id == selectedId} transition:fade={{duration: 100}}>
            <div class="icon">
                <Icon {icon} size={iconSize} />
            </div>
            <p>{name}</p>
        </label>
    {/each}
</nav>

<style>
    .bx-tabs {
        &.horizontal { flex-direction: row; }
        &.vertical { flex-direction: column; }

        &.start { justify-content: flex-start; }
        &.center { justify-content: center; }
        &.end { justify-content: flex-end; }

        label {
            gap: .25rem;
            cursor: pointer;

            .icon {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            p {
                margin: 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        &:not(.default) {
            display: flex;
            align-items: center;
            text-align: center;

            label {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                p {
                    font-size: .7em;
                    width: 60px;
                    padding: 0 .5rem;
                }
            }
        }

        &.default {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));

            label {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: .75rem .5rem;
                border-radius: .75rem .75rem 0 0;
                border-bottom: 5px solid transparent;
                transition: border-bottom-color .2s, background .2s;
                gap: .5rem;

                p {
                    font-size: .9em;
                    letter-spacing: .1em;
                    text-transform: uppercase;
                }

                &:hover {
                    border-bottom-color: light-dark(#00000077, #ffffff77);
                    background: light-dark(#ffffff99, #ffffff55);
                    backdrop-filter: blur(15px);
                }

                &.selected {
                    border-bottom-color: light-dark(#000000, #ffffff);
                }
            }
        }

        &.squared {
            gap: .25rem;

            label {
                border-radius: 25%;
                aspect-ratio: 1;
                transition: background .2s;

                &.selected {
                    background: light-dark(#000, #fff);
                    color: light-dark(#fff, #000);
                }

                &:hover {
                    background: light-dark(rgb(173, 20, 173), cyan);
                    color: light-dark(#fff, #000);
                }
            }
        }

        &.rounded label {
            padding-bottom: .5rem;

            .icon {
                box-shadow: 0 0 5px #00000011, 0 5px 10px #00000022;
                border: 1px solid light-dark(#00000055, #ffffff55);
                background: light-dark(#ffffff22, #ffffff22);
                backdrop-filter: blur(15px);
                padding: 1rem;
                border-radius: 100%;
                transition: background .2s, transform .2s;
            }

            &:hover .icon {
                background: light-dark(#00000022, #ffffff66);
            }

            &:active .icon {
                transform: scale(1.3);
            }

            &.selected .icon {
                background: light-dark(#0051ff, #fff);
                color: light-dark(#fff, #000);
            }
        }
    }
</style>
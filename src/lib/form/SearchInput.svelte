<script lang="ts">
    import type { BreakpointSize } from "$core/enums/BreakpointSize";
    import Icon from "$lib/shared/Icon.svelte";
    import Responsive from "$lib/shared/Responsive.svelte";
    import Button from "./Button.svelte";

    interface Props {
        placeholder?: string,
        value?: string
    }

    let {
        placeholder = '',
        value = $bindable('')
    }: Props = $props();

    const iconSize = 20;
    let size: BreakpointSize = $state('sm');
</script>

<Responsive bind:size />

<div class="bx-search-input" class:thick={!['sm'].includes(size)}>
    <div class="icon">
        <Icon icon="search" size={iconSize} />
    </div>
    <input class="input-search" type="search" { placeholder } bind:value />
    <div class="actions">
        {#if value.length > 0}
            <Button variant="flat" shape="rounded" center onclick={() => value = ''}>
                <Icon icon="cross" size={iconSize} />
            </Button>
        {/if}
    </div>
</div>

<style>
    .bx-search-input {
        display: grid;
        position: relative;
        color: #000;

        .icon {
            position: absolute;
            inset: 0 auto 0 0;
            display: grid;
            place-content: center;
            padding-left: 1.5rem;
            pointer-events: none;
        }

        .actions {
            position: absolute;
            inset: 0 1px 0 auto;
            display: grid;
            place-content: center;
            pointer-events: none;

            :global(button) {
                aspect-ratio: 1;
                pointer-events: all;
            }
        }

        &:not(.thick) {
            .icon {
                padding-left: .9rem;
            }
            .input-search {
                padding: 12px 45px;
            }
            .actions :global(button) {
                padding: 10px;
            }
        }

        &.thick {
            .icon {
                padding-left: 1.5rem;
            }
            .input-search {
                padding: 22px 60px;
            }
        }

    }

    .input-search {
        font-family: Marianne, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        border: none;
        background: light-dark(#fff, #333);
        background: #fff;
        box-sizing: content-box;
        border-radius: 50px;
        font-size: 14px;
        text-align: center;
        color: light-dark(#000, #fff);
        color: #000;
        min-width: 200px;
        box-shadow: 0 0 0 0 #fff, 0 0 0 0 #fff inset,
            0 0 0 1px #00000033,
            0 5px 30px #00000033;
        transition: box-shadow .2s, padding .2s;

        &:hover {
            box-shadow: 0 0 0 0 #fff, 0 0 0 0 #fff inset,
                0 0 0 1px #00000033,
                0 0 30px 0 light-dark(#00aeff, #fff);
        }

        &:focus {
            --outline-width: .5rem;
            box-shadow: 0 0 0 var(--outline-width) #fff,
                0 0 0 var(--outline-width) #fff inset,
                0 0 0 calc(var(--outline-width) + 1px) #00000033,
                0 7px 30px var(--outline-width) #00000033;
            outline: none;
        }
    }
</style>
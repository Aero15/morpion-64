<script lang="ts">
    import { rt_newGame } from "$core/routes";
    import Button from "$lib/form/Button.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import { push } from "svelte-spa-router";

    interface Props {
        index?: number,
        fixed?: boolean,
        noLabels?: boolean
    }

    let {
        index = $bindable(0),
        fixed = false,
        noLabels = false
    }: Props = $props();

    let pages = [
        /*'/rules',*/ '/grid', '/participants', '/recap'
    ]

    let abandon = () => push('/')
    let previous = () => push(rt_newGame  + pages[index - 1])
    let next = () => push(rt_newGame  + pages[index + 1])
</script>

<main class="bx-navigBar" class:fixed>
    <div class="start">
        <Button center title="Abandonner" variant="flat"
            shape={noLabels ? 'squared' : 'default'}
            onclick={abandon}>
            <Icon icon="cross" size={18} />
            {#if !noLabels}
                <p>Abandonner</p>
            {/if}
        </Button>
    </div>

    <div class="end">
        {#if index > 0}
            <Button center title="Revenir en arrière" shape="squared"
                onclick={previous}>
                <Icon icon="arrow_left" size={18} />
            </Button>
        {/if}

        <Button center title="Continuer" variant="primary"
            onclick={next}>
            <p>Continuer</p>
            <Icon icon="arrow_right" size={18} />
        </Button>
    </div>
</main>

<style>
    .bx-navigBar {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.fixed {
            position: fixed;
            inset: auto 0 0;
            z-index: 10;
            padding: .5rem;
            background: light-dark(#fff, #323232);
            border-top: 1px solid light-dark(#00000055, #ffffff55);
            box-shadow: 0 0 10px #00000055;
        }

        .start, .end {
            display: flex;
            align-items: center;
            gap: .25rem;
        }

        .end {
            justify-items: end;
        }

        p {
            margin: 0;
        }

        :global(button) {
            min-height: 3rem;
            padding: .75rem;

            &:not(.flat) {
                border-color: light-dark(#00000077, #ffffff77);
            }
        }
    }
</style>
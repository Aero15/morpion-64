<script lang="ts">
    import { fade } from "svelte/transition";
    import Icon from "./Icon.svelte";

    interface Props {
        tabs: {name: string, icon: string, id: number}[],
        alignement?: 'start' | 'center' | 'end',
        orientation?: 'horizontal' | 'vertical',
        selectedId?: number,
    }

    let {
        tabs = $bindable<{name: string, icon: string, id: number}[]>([]),
        selectedId = $bindable(0),
        orientation = 'horizontal',
        alignement = 'center',
    }: Props = $props();
</script>

<nav class="bx-tabs"
    class:horizontal={orientation === 'horizontal'}
    class:vertical={orientation === 'vertical'}
    class:start={alignement === 'start'}
    class:center={alignement === 'center'}
    class:end={alignement === 'end'}
>
    {#each tabs as {name, icon, id}}
        <input type="radio" id={'tab_'+id} hidden
            name="tabs" bind:group={selectedId} value={id} />
        <label for={'tab_'+id} class:selected={id == selectedId} transition:fade={{duration: 100}}>
            <Icon {icon} size={24} />
            <p>{name}</p>
        </label>
    {/each}
</nav>

<style>
    .bx-tabs {
        display: flex;
        align-items: center;
        text-align: center;
        gap: 5px;

        &.horizontal { flex-direction: row; }
        &.vertical { flex-direction: column; }

        &.start { justify-content: flex-start; }
        &.center { justify-content: center; }
        &.end { justify-content: flex-end; }

        label {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 25%;
            aspect-ratio: 1;
            cursor: pointer;
            transition: background .2s;

            &.selected {
                background: light-dark(#000, #fff);
                color: light-dark(#fff, #000);
            }

            &:hover {
                background: light-dark(rgb(173, 20, 173), cyan);
                color: light-dark(#fff, #000);
            }

            p {
                margin: 0;
                font-size: .78em;
                width: 60px;
                padding: 0 .5rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
</style>
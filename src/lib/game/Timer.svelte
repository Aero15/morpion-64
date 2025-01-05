<script lang="ts">
    import { _ } from "svelte-i18n";

    interface Props {
        secondsTotal: number
    }

    let {
        secondsTotal = $bindable(0),
    }: Props = $props();

    let hours = $state(0);
    let minutes = $state(0);
    let seconds = $state(0);

    $effect(() => {
        let totalSeconds = secondsTotal;
        hours = Math.floor(totalSeconds / 3600);
        minutes = Math.floor((totalSeconds - hours * 3600) / 60);
        seconds = totalSeconds - hours * 3600 - minutes * 60;
    })
</script>

<div class="bx-timer">
    {#if hours > 0}
        <p class="hours">
            <strong>{ hours }</strong>
            <span>{ $_('game.timer.abbreviations.hours') }</span>
        </p>
    {/if}

    {#if minutes > 0}
        <p class="minutes">
            <strong>{ minutes }</strong>
            <span>{ $_('game.timer.abbreviations.minutes') }</span>
        </p>
    {/if}

    <p class="seconds">
        <strong>{ seconds }</strong>
        <span>{ $_('game.timer.abbreviations.seconds') }</span>
    </p>
</div>

<style>
    .bx-timer {
        display: flex;
        align-items: center;
        gap: .75rem;

        p {
            --tint: red;
            margin: 0;
            display: flex;
            align-items: baseline;

            strong {
                color: var(--tint);
                font-size: 1.5em;
                font-feature-settings: "tnum";
                font-variant-numeric: tabular-nums;
            }

            span {
                font-size: 1em;
                position: relative;
                top: -1px;
            }

            &.seconds { --tint: light-dark(purple, magenta); }
            &.minutes { --tint: light-dark(rgb(0, 120, 200), rgb(0, 162, 255)); }
            &.hours { --tint: light-dark(rgb(0, 126, 126), cyan); }
        }
    }
</style>
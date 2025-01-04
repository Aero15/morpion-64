<script lang="ts">
    import {
        BotDelay,
        defaultBotSpeedDelay,
        fastBotSpeedDelay,
        slowBotSpeedDelay
    } from "$core/enums/Bot";
    import {
        botSpeedDelay
    } from "$core/store/settings.svelte";
    import { _ } from "svelte-i18n";
    import Radio from "$lib/form/Radio.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import RadioGroup from "$lib/form/RadioGroup.svelte";

    function speedToText(speed: Point): string {
        return `Entre ${speed.x / 1000} et ${speed.y / 1000} secondes`;
    }
</script>

<main>
    <p style:margin="0 0 .5rem"><strong>Delai de réponse des bots</strong></p>

    <RadioGroup>
        <Radio bind:group={$botSpeedDelay}
            label="Lent" value={BotDelay.Slow}
            description={ speedToText(slowBotSpeedDelay) } />

        <Radio bind:group={$botSpeedDelay}
            label="Normal" value={BotDelay.Default}
            description={ speedToText(defaultBotSpeedDelay) } />

        <Radio bind:group={$botSpeedDelay}
            label="Rapide" value={BotDelay.Fast}
            description={ speedToText(fastBotSpeedDelay) } />
    </RadioGroup>
</main>
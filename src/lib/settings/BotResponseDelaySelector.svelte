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
        return $_('settings.bot_response_time.delay_between', { values: {
            min: speed.x / 1000,
            max: speed.y / 1000
        } });
    }
</script>

<main>
    <p style:margin="0 0 .5rem"><strong>{ $_('settings.options') }</strong></p>

    <RadioGroup>
        <Radio bind:group={$botSpeedDelay}
            label={ $_('settings.bot_response_time.slow') } value={BotDelay.Slow}
            description={ speedToText(slowBotSpeedDelay) } />

        <Radio bind:group={$botSpeedDelay}
            label={ $_('settings.bot_response_time.normal') } value={BotDelay.Default}
            description={ speedToText(defaultBotSpeedDelay) } />

        <Radio bind:group={$botSpeedDelay}
            label={ $_('settings.bot_response_time.fast') } value={BotDelay.Fast}
            description={ speedToText(fastBotSpeedDelay) } />
    </RadioGroup>
</main>
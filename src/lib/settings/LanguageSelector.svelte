<script lang="ts">
    import { language } from "$core/store/settings.svelte";
    import RadioGroup from "$lib/form/RadioGroup.svelte";
    import Radio from "$lib/form/Radio.svelte";
    import { _ } from "svelte-i18n";
</script>

<p style:margin="0 0 .5rem"><strong>{ $_('settings.options') }</strong></p>
<RadioGroup>
    <Radio bind:group={language.current}
        label={ $_('settings.language.auto.name') } value="auto"
        description={ $_('settings.language.auto.legend') } />
    <Radio bind:group={language.current}
        label="English" value="en" />
    <Radio bind:group={language.current}
        label="Français" value="fr" />
</RadioGroup>
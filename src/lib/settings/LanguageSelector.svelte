<script lang="ts">
    import { language } from "$core/store/settings.svelte";
    import RadioGroup from "$lib/form/RadioGroup.svelte";
    import Radio from "$lib/form/Radio.svelte";
</script>

<RadioGroup>
    <Radio bind:group={language.current}
        label="Système" value="auto"
        description="Langue définie dans le système" />
    <Radio bind:group={language.current}
        label="English" value="en" />
    <Radio bind:group={language.current}
        label="Français" value="fr" />
</RadioGroup>
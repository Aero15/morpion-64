<script lang="ts">
    import {
        language
    } from '$core/store/settings.svelte';
    import {
        register, init, getLocaleFromNavigator
    } from 'svelte-i18n';

    register('en', () => import('$i18n/en.json'));
    register('fr', () => import('$i18n/fr.json'));

    let locale: string | null = $derived(language.current === 'auto' ? getLocaleFromNavigator() : language.current)

    $effect(() => {
        loadLocale(locale)
    })

    function loadLocale(locale: string | null) {
        init({
            fallbackLocale: 'en',
            initialLocale: locale,
        });
    }

    loadLocale(locale)
</script>
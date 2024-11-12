<script lang="ts">
    import Icon from "$lib/shared/Icon.svelte";
    import { fade } from "svelte/transition";

    interface Props {
        icon: string,
        title: string,
        delay?: number,
        children: () => any
    }

    let { icon, title, delay = 0, children }: Props = $props();
</script>

<section in:fade={{
    delay: 150 * delay,
    duration: 250
}}>
    <div class="head">
        <Icon {icon} size={32} />
        <h2>{title}</h2>
    </div>

    <div class="body">
        {@render children()}
    </div>
</section>

<style>
    .head {
        display: flex;
        align-items: center;
        gap: .75rem;
    }
</style>
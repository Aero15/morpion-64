<script lang="ts">
    import {
        app_name, app_version,
        last_update, project_status,
        license_name, license_url,
        organisation_name, organisation_url
    } from "$core/store/application";
    import { push } from "svelte-spa-router";
    import Hero from "$lib/shared/Hero.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import Button from "$lib/form/Button.svelte";
    import Section from "$lib/shared/Section.svelte";
    import { ProjectStatus } from "$core/enums/ProjectStatus";
    import { slide } from "svelte/transition";

    const date_format_options = {
        //weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    let projectStatus = $derived.by(() => {
        switch ($project_status) {
            case ProjectStatus.InProgress:
                return "En développement";
            case ProjectStatus.Completed:
                return "En production";
            case ProjectStatus.Abandoned:
                return "Abandonné";
        }
    })
</script>

<main>
    <div class="hero">
        <Hero icon="info" title="A propos"
            subtitle="Informations sur l'application">
            <div class="toolbar">
                <Button center
                    onclick={() => push('/')}>
                    <Icon icon="cross" />
                    Retour
                </Button>
            </div>
        </Hero>
    </div>

    <div>
        <div class="intro" in:slide={{delay: 200, duration: 300}}>
            <div class="ident">
                <h3>{$app_name}</h3>
                <p class="version">Version : <strong>{$app_version}</strong></p>

                <p class="description">
                    Le jeu de Morpion revisité avec une touche de modernité !
                    Jouez sur des grilles de 3x3 à 8x8 et personnalisez votre expérience avec des symboles et couleurs uniques pour chaque joueur.
                </p>
            </div>

            {#snippet info(icon: string, title: string, text: string, url?: string)}
                <li>
                    <Icon {icon} size={30} />
                    <strong>{title}</strong>
                    <p>
                        {#if url}
                            <a href={url}>{text}</a>
                        {:else}
                            {text}
                        {/if}
                    </p>
                </li>
            {/snippet}

            <ul class="infos">
                {@render info('duplicate', 'Licence', $license_name, $license_url)}
                {@render info('clock', 'Mis à jour le', $last_update.toLocaleDateString('fr-FR', date_format_options))}
                {@render info('profile', 'Développé par', $organisation_name, $organisation_url)}
                {@render info('asterisk', 'Etat du projet', projectStatus)}
            </ul>
        </div>

        <Section icon="info" title="Fonctionnalités" delay={3}>
            <p>TODO: Lister les Fonctionnalités</p>
        </Section>
    
        <Section icon="info" title="Stack technique" delay={3}>
            <p>TODO: Lister les techno utilisés (Svelte, Vite, Typescript)</p>
        </Section>
    </div>
</main>

<style>
    main {
        display: grid;
        gap: 2rem;
        padding-top: 2rem;

        h2 {
            margin-top: 0;
        }
    }

    .toolbar {
        display: grid;
        gap: .5rem;

        :global(button:first-child) {
            padding-block: 1rem;
        }
    }

    .intro {
        background: linear-gradient(
            to right,
            rgb(107, 40, 194),
            rgb(0, 93, 155),
            rgb(0, 109, 109)
        );
        padding: 3rem;
        border-radius: 2rem;
        box-shadow:
            0 0 0 1px rgba(0,0,0,.2) inset,
            0 3px 30px rgba(0,0,0,.2);

        .ident {
            h3 {
                margin: 0;
                margin-top: -1rem;
                font-size: 64px;
            }

            .version {
                margin: 0;
            }

            .description {
                font-size: .9em;
                max-width: 500px;
            }
        }

        .infos {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 2rem;
            margin: 0;
            padding: 0;
            margin-top: 4rem;
            list-style: none;

            a {
                color: inherit;
                text-underline-offset: 2px;
                text-decoration-thickness: 1px;

                &:hover {
                    text-decoration: underline;
                }
            }

            strong {
                margin-top: .5rem;
                font-size: .9em;
                display: block;
            }

            p {
                margin: 0;
                font-size: .9em;
            }
        }
    }

    @media (width >= 900px) {
        main {
            grid-template-columns: 350px 1fr;
        }
    }

    @media (prefers-color-scheme: light) {
        .intro {
            background: linear-gradient(
                to right,
                rgb(215, 183, 255),
                rgb(158, 216, 255),
                rgb(157, 234, 234)
            );
        }    
    }
</style>
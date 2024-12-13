<script lang="ts">
    import {
        app_name, app_version,
        last_update, project_status,
        license_name, license_url,
        organisation_name, organisation_url
    } from "$core/store/application";
    import logo from "/favicon.svg";
    import { push } from "svelte-spa-router";
    import Hero from "$lib/shared/Hero.svelte";
    import Icon from "$lib/shared/Icon.svelte";
    import Button from "$lib/form/Button.svelte";
    import Section from "$lib/shared/Section.svelte";
    import { ProjectStatus } from "$core/enums/ProjectStatus";
    import { scale, slide } from "svelte/transition";
    import svelteLogo from '$svg/logo/svelte.svg'
    import viteLogo from '$svg/logo/vite.svg'
    import tsLogo from '$png/typescript.png'
    import nodeLogo from '$png/node.png'
    import type IDevTool from "$core/interface/IDevTool";
    import PageWrap from "$lib/global/PageWrap.svelte";

    const date_format_options = {
        //weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const dev_tools: IDevTool[] = [
        {
            logo: svelteLogo, name: "Svelte", url: "https://svelte.dev/",
            darkTint: '#882b0c', brightTint: '#f2a58d',
            description: "Svelte est un framework d'interface utilisateur\
            permettant de concevoir des applications web incroyablement\
            concis qui effectuent un travail minimal dans le navigateur."
        },
        {
            logo: viteLogo, name: "Vite", url: "https://vitejs.dev/",
            darkTint: '#936d00', brightTint: '#eace77',
            description: "Vite est un outil de construction de projet\
            qui offre une expérience de construction rapide et facile."
        },
        {
            logo: tsLogo, name: "Typescript", url: "https://www.typescriptlang.org/",
            darkTint: '#024775', brightTint: '#97d5ff', 
            description: "Typescript est un langage de programmation\
            orienté objet qui offre des fonctionnalités\
            plus modernes et plus robustes."
        },
        {
            logo: nodeLogo, name: "Node", url: "https://nodejs.org/",
            darkTint: '#295c1a', brightTint: '#adea96', 
            description: "Node est un environnement de travail\
            pour le langage de programmation JavaScript."
        }
    ]

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

<PageWrap>
    <div class="page-with-hero">
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
                    <img src={logo} alt="Logo de Morpion 64" in:scale={{delay: 500}} />

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
        
            <Section icon="info" title="Stack technique" delay={3}>
                <ul class="tech_stack">
                    {#snippet tech_stack(logo: string, name: string, description: string, url?: string, darkTint?: string, brightTint?: string)}
                        <li style:--dark-tint={darkTint} style:--bright-tint={brightTint}>
                            <a href={url}>
                                <img src={logo} alt={name} />
                                <div class="text">
                                    <p class="name"><strong>{name}</strong></p>
                                    <p class="description">{description}</p>
                                </div>
                            </a>
                        </li>
                    {/snippet}
                    
                    {#each dev_tools as {logo, name, description, url, darkTint, brightTint}}
                        {@render tech_stack(logo, name, description, url, darkTint, brightTint)}
                    {/each}
                </ul>
            </Section>
        </div>
    </div>
</PageWrap>

<style>
    .page-with-hero {
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

        img {
            width: 256px;
            float: right;
            margin-top: -100px;
        }

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

    .tech_stack {
        display: grid;
        gap: .5rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            --bright-tint: #ddd;
            --dark-tint: #333;
            --logo-size: 100px;
            background: light-dark(var(--bright-tint), var(--dark-tint));
            padding: 2rem;
            border-radius: 1rem;
        }

        a {
            color: inherit;

            display: grid;
            grid-template-columns: var(--logo-size) 1fr;
            gap: 1rem;
        }

        p {
            margin: 0;

            &.name {
                font-size: 1.1em;
                margin-top: -.5rem;
                margin-bottom: .5rem;
            }

            &.description {
                font-size: .9em;
            }
        }

        img {
            height: var(--logo-size);
            border-radius: .5rem;
            filter: drop-shadow(0 5px 10px rgba(0,0,0,.2));
        }
    }

    @media (width >= 900px) {
        .page-with-hero {
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
<script lang="ts">
    import {
        app_version,
        last_update, project_status,
        license_name, license_url,
        organisation_name, organisation_url,
        repository_display_hostname,
        repository_url, creation_date
    } from "$core/store/application";
    import { _, getLocaleFromNavigator } from "svelte-i18n";
    import logo from "/favicon.svg";
    import nodeLogo from '$png/node.png';
    import tsLogo from '$png/typescript.png';
    import viteLogo from '$svg/logo/vite.svg';
    import Icon from "$lib/shared/Icon.svelte";
    import Jumbo from "$lib/shared/Jumbo.svelte";
    import svelteLogo from '$svg/logo/svelte.svg';
    import { fade, scale } from "svelte/transition";
    import Section from "$lib/shared/Section.svelte";
    import PageWrap from "$lib/global/PageWrap.svelte";
    import type IDevTool from "$core/interface/IDevTool";
    import Responsive from "$lib/shared/Responsive.svelte";
    import { language } from "$core/store/settings.svelte";
    import { ProjectStatus } from "$core/enums/ProjectStatus";
    import type { BreakpointSize } from "$core/enums/BreakpointSize";

    const date_format_options = {
        //weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    let locale = $derived(language.current === 'auto' ? getLocaleFromNavigator() : language.current);

    const dev_tools: IDevTool[] = [
        {
            logo: svelteLogo, name: "Svelte", url: "https://svelte.dev/",
            darkTint: '#882b0c', brightTint: '#f2a58d',
            description: $_('about.svelte')
        },
        {
            logo: viteLogo, name: "Vite.js", url: "https://vitejs.dev/",
            darkTint: '#936d00', brightTint: '#eace77',
            description: $_('about.vite')
        },
        {
            logo: tsLogo, name: "Typescript", url: "https://www.typescriptlang.org/",
            darkTint: '#024775', brightTint: '#97d5ff', 
            description: $_('about.typescript')
        },
        {
            logo: nodeLogo, name: "Node.js", url: "https://nodejs.org/",
            darkTint: '#295c1a', brightTint: '#adea96', 
            description: $_('about.nodejs')
        }
    ]

    let size: BreakpointSize = $state('sm');

    let projectStatus = $derived.by(() => {
        switch ($project_status) {
            case ProjectStatus.InProgress:
                return $_('about.project_status.under_development');
            case ProjectStatus.Completed:
                return $_('about.project_status.production');
            case ProjectStatus.Abandoned:
                return $_('about.project_status.abandoned');
        }
    })
</script>

<Responsive bind:size />

<Jumbo>
    <div class="intro"
        class:center={['sm', 'md'].includes(size)}
        class:cols={!['sm', 'md'].includes(size)}
    >
        <img src={logo} in:scale|global={{delay: 150}}
            alt={ $_('about.app_logo', { values: { name: 'Morpion 64' } }) }
        />

        <div class="ident">
            <h3>Morpion <span>64</span></h3>
            <p class="version">
                <strong>
                    { $_('about.version_number', {
                        values: { version: $app_version }
                    }) }
                </strong>
            </p>

            <p class="description">
                { $_('about.introduction') }
            </p>
        </div>
    </div>
</Jumbo>
            
{#snippet info(index: number, icon: string, title: string, text: string, url?: string)}
    <li in:fade|global={{delay: 50 * index + 150}}>
        <Icon {icon} size={34} />
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

<PageWrap>
    <ul class="infos">
        {@render info(0, 'clock', $_('about.updated_on'), $last_update.toLocaleDateString(locale, date_format_options))}
        {@render info(1, 'plus', $_('about.created_on'), $creation_date.toLocaleDateString(locale, date_format_options))}
        {@render info(2, 'profile', $_('about.developed_by'), $organisation_name, $organisation_url)}
        {@render info(3, 'info', $_('about.project_status.title'), projectStatus)}
        {@render info(4, 'duplicate', $_('about.license'), $license_name, $license_url)}
        {@render info(5, 'asterisk', $_('about.repository'), $repository_display_hostname, $repository_url)}
    </ul>

    <Section icon="info" title={ $_('about.tech_stack') } delay={1}>
        <ul class="tech_stack">
            {#snippet tech_stack(logo: string, name: string, description: string, url?: string, darkTint?: string, brightTint?: string)}
                <li style:--dark-tint={darkTint} style:--bright-tint={brightTint}>
                    <a href={url}>
                        <div class="text">
                            <img src={logo} alt={ $_('about.app_logo', { values: { name } }) } />
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
</PageWrap>

<style>
    .intro {
        img {
            filter: drop-shadow(0 0 15px rgba(0,0,0,.2));
        }

        .ident {
            h3 {
                margin: 0;
            }

            .version {
                margin: 0;
            }

            .description {
                max-width: 500px;
            }
        }

        &.center {
            display: flex;
            flex-flow: column;
            align-items: center;

            img {
                max-width: 126px;
            }
            
            .ident {
                text-align: center;
                
                h3 {
                    font-size: 32px;
                }

                .version,
                .description {
                    font-size: .8em;
                }
            }
        }

        &.cols {
            --logo_size: 200px;
            display: grid;
            grid-template-columns: var(--logo_size) 1fr;
            
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: center;
            gap: 3rem;


            img {
                width: var(--logo_size);
            }

            .ident {
                h3 {
                    font-size: 50px;
                    margin-top: -1rem;

                    span {
                        font-family: Marianne-Light, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
                    }
                }

                .version,
                .description {
                    font-size: .87em;
                }
            }
        }
    }

    .infos {
        display: grid;
        margin: 0;
        padding: 0;
        list-style: none;
        gap: 2rem;
        margin: 1rem 0;
        text-align: center;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

        a {
            color: inherit;
            text-underline-offset: 2px;
            text-decoration-thickness: 1px;

            &:hover {
                text-decoration: underline;
            }
        }

        strong, p {
            font-size: .78em;
        }

        strong {
            margin-top: .25rem;
            display: block;
        }

        p {
            margin: -.05rem 0 0;
        }
    }

    .tech_stack {
        display: grid;
        gap: .5rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        align-items: flex-start;
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            --bright-tint: #ddd;
            --dark-tint: #333;
            --logo-size: 80px;
            background: light-dark(var(--bright-tint), var(--dark-tint));
            border-radius: 1rem;
        }

        a {
            color: inherit;
            padding: 2rem;
            display: block;
        }

        p {
            margin: 0;

            &.name {
                font-size: 1.1em;
                margin-top: -.5rem;
                margin-bottom: .5rem;
            }

            &.description {
                font-size: .87em;
            }
        }

        img {
            float: right;
            margin-left: 1rem;
            margin-top: -2.5rem;
            height: var(--logo-size);
            border-radius: .5rem;
            filter: drop-shadow(0 5px 10px rgba(0,0,0,.2));
        }
    }
</style>
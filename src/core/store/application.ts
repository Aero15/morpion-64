import { ProjectStatus } from "$core/enums/ProjectStatus";
import { readable } from "svelte/store";

export const app_name = readable("Morpion 64")
export const app_version = readable("1.1.0")

export const license_name = readable("MIT License")
export const license_url = readable("https://opensource.org/license/MIT")
export const project_status = readable(ProjectStatus.InProgress)

export const last_update = readable(new Date('2024-12-31'))
export const creation_date = readable(new Date('2024-10-31'))

export const organisation_name = readable('Doocode.xyz')
export const organisation_url = readable('https://doocode.xyz/')

export const repository_display_hostname = readable('Github')
export const repository_url = readable('https://github.com/Aero15/morpion-64')
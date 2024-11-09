// Import du CSS
import '$css/fonts.css'
import '$css/app.css'

// Import de l'application
import { mount } from 'svelte'
import App from './App.svelte'

// Montage de l'application
const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app

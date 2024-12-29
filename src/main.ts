// Import style
import '$css/fonts.css'
import '$css/app.css'

// Import logic
import { mount } from 'svelte'
import App from './App.svelte'

// Mount the app
const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app

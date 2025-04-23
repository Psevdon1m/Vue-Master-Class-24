import './assets/styles/index.css'
import 'iconify-icon'

import { plugin } from '@formkit/vue'
import config from '../formkit.config.ts'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, config)

app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import BaseDateVue from './components/BaseDate.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
//             name,         component
app.component('BaseDateVue', BaseDateVue)

app.mount('#app')

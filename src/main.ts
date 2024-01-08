import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import BaseDateVue from './components/BaseDate.vue'

const forumApp = createApp(App)

forumApp.use(store)
forumApp.use(router)
//             name,         component
forumApp.component('BaseDate', BaseDateVue)

forumApp.mount('#app')

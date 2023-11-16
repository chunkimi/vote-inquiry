import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './styles/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')

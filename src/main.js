import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './plugins/firebase'
import router from './router'
import './styles/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})
app.mount('#app')

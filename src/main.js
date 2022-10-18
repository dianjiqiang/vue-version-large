import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 类似reset.css (重置样式, 统一样式规范)
import 'normalize.css'
import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

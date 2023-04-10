import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/es/locale/lang/zh-cn';//解决elementpLus一些组件是英文的问题
import * as ElIcons from "@element-plus/icons-vue";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus,{
    locale:zhCn
  })
  for (const [key, component] of Object.entries(ElIcons)) {
    app.component(key, component)
  }
app.mount('#app')

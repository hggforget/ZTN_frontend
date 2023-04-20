import { createApp } from 'vue'
import { createPinia } from 'pinia'
import  'echarts'
import Echarts from 'vue-echarts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/es/locale/lang/zh-cn';//解决elementpLus一些组件是英文的问题
import * as ElIcons from "@element-plus/icons-vue";
import JsonViewer from "vue3-json-viewer"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus,{
    locale:zhCn
  })
app.use(JsonViewer)
  for (const [key, component] of Object.entries(ElIcons)) {
    app.component(key, component)
  }
app.component('v-chart',Echarts)
app.mount('#app')

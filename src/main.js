import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';//解决elementpLus一些组件是英文的问题
import App from './App.vue';
import * as ElIcons from "@element-plus/icons-vue";

const app = createApp(App)
app.use(ElementPlus,{
  locale:zhCn
})
for (const [key, component] of Object.entries(ElIcons)) {
  app.component(key, component)
}
app.config.productionTip = false
app.mount('#app')


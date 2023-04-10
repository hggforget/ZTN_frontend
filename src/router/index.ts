import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SdpTable from '@/components/Mains/SdpTable.vue';
import VMmanager from "@/components/Mains/VMmanager.vue";
import ZTNCmanager from "@/components/Mains/ZNTCmanager.vue";
import LogsTable from "@/components/Mains/LogsTable.vue";
import LogDetails from "@/components/Mains/LogDetails.vue";
import MainBlockVue from '@/components/MainBlock.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    { path: '/SdpTable', component: SdpTable},
    { path: '/VMmanager', component: VMmanager},
    { path: '/ZTNCmanager', component: ZTNCmanager},
    { path: '/LogsTable', component: LogsTable},
    { path: '/LogDetails', component: LogDetails}
  ]
})

export default router

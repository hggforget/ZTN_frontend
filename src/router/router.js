import { createRouter, createWebHashHistory } from 'vue-router'

import SdpTable from '../components/Mains/SdpTable';
import VMmanager from "@/components/Mains/VMmanager";
import ZTNCmanager from "@/components/Mains/ZNTCmanager";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/SdpTable', component: SdpTable},
        { path: '/VMmanager', component: VMmanager},
        { path: '/ZTNCmanager', component: ZTNCmanager}
    ]
})

export default router
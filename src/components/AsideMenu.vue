<template>
  <el-container class="layout-container-demo">
    <el-container>
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>信息管理
            </template>
            <el-menu-item-group>
              <template #title>SDP数据库</template>
              <el-menu-item index="1-1" @click="SdpTableLoad">注册信息数据库</el-menu-item>
              <el-menu-item index="1-2">行为日志数据库</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>设备管理
            </template>
            <el-menu-item-group>
              <template #title>零信任组件管理</template>
              <el-menu-item index="2-1"  @click="ZTNCmLoad">网络组件</el-menu-item>
              <el-menu-item index="2-2" @click="VMmLoad">虚拟机设备</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>信息收集平台
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

      <RouterView></RouterView>
    </el-container>
    <el-footer style="margin-bottom: 0px">
      <elIcons ></elIcons>
    </el-footer>
  </el-container>
</template>

<script setup>
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { RouterView } from 'vue-router'
</script>
<script>
import elIcons from "@/components/elIcons"
import router from "@/router/router"
import "@/CSS/AsideMenu.css"

  export default {
    name:'AsideMenu',
    components: {
      elIcons,
    },
    methods:{
      SdpTableLoad () {
        router.push("/SdpTable")
      },
      ZTNCmLoad () {
        router.push("/ZTNCmanager")
      },
      VMmLoad () {
        router.push("/VMmanager")
      }
    }
  }


</script>


<style scoped>

</style>

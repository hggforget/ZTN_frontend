<template>
  <el-container>
    <EditDialog ref="myEditDialog" @refresh="loadSdps"></EditDialog>
    <AddDialog ref="myAddDialog"  @refresh="loadSdps"></AddDialog>
    <el-header style="text-align: right; font-size: 12px">
      <el-row class="mb-4">
        <el-button type="primary" @click="open">
          新建SDP
        </el-button>
        <div class="toolbar">
          <el-dropdown @command="handleCommand">
            <el-icon style="margin-right: 8px; margin-top: 1px"
            ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="view">View</el-dropdown-item>
                <el-dropdown-item command="add">Add</el-dropdown-item>
                <el-dropdown-item command="delete">Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-row>
    </el-header>

    <el-main>
      <el-scrollbar>
        <el-table
            :data="state.sdps"
            :default-sort="{ prop: 'sdpid', order: 'descending' }"
            stripe

            style="width: 100%">
          <el-table-column type="selection" width="40" />
          <el-table-column
              prop="sdpid"
              label="sdpid"
              sortable>
          </el-table-column>
          <el-table-column
              prop="valid"
              label="valid">
          </el-table-column>
          <el-table-column
              prop="type"
              label="type">
          </el-table-column>
          <el-table-column
              prop="country"
              label="country">
          </el-table-column>
          <el-table-column
              prop="state"
              label="state">
          </el-table-column>
          <el-table-column
              prop="locality"
              label="locality">
          </el-table-column>
          <el-table-column
              prop="org"
              label="org">
          </el-table-column>
          <el-table-column
              prop="alt_name"
              label="alt_name">
          </el-table-column>
          <el-table-column
              prop="email"
              label="email">
          </el-table-column>
          <SDPOperationCol @refresh="loadSdps"></SDPOperationCol>
        </el-table>
      </el-scrollbar>
    </el-main>

  </el-container>

</template>

<script lang="ts" setup>

import "@/CSS/AsideMenu.css"
import {DelSdp, getSdps} from '@/api/api'
import AddDialog from "@/components/Dialog/AddDialog.vue"
import EditDialog from "@/components/Dialog/EditDialog.vue"
import {ElMessage} from "element-plus";
import { onMounted, reactive, ref } from "vue";
import SDPOperationCol from "../utils/SDPOperationCol.vue";

const state = reactive({
    sdps : []
})
const myAddDialog = ref()
const myEditDialog = ref()
const open =()=>{
  console.log(myAddDialog.value.dialogFormVisible)
  myAddDialog.value.dialogFormVisible=true
}
const handleCommand =(command)=> {
      if (command=="delete")
      {
        ElMessage(`click on item ${command}`)

      }
    }
const loadSdps =()=> {
      getSdps().then(response => {
        state.sdps = response.data.Sdps
        console.log(response.data.Sdps)
      })
    }


  
    loadSdps()


</script>
<style>


</style>

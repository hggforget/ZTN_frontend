<template>
  <el-container>
    <EditDialog ref="EditDialog" @refresh="loadSdps"></EditDialog>
    <AddDialog ref="AddDialog"  @refresh="loadSdps"></AddDialog>
    <el-header style="text-align: right; font-size: 12px">
      <el-row class="mb-4">
        <el-button type="primary" @click="this.$refs.AddDialog.dialogFormVisible = true">
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
            :data="sdps"
            :default-sort="{ prop: 'sdpid', order: 'descending' }"
            stripe
            @cell-dblclick="handleEdit"
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
          <el-table-column label="Operations">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
              >
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-main>

  </el-container>

</template>

<script>

import "@/CSS/AsideMenu.css"
import {DelSdp, getSdps} from '@/api/api'
import AddDialog from "@/components/Dialog/AddDialog"
import EditDialog from "@/components/Dialog/EditDialog"
import {ElMessage} from "element-plus";

export default {
  data () {
    return {
      // books list data
      sdps: [
      ]
    }
  },
  components: {
    EditDialog,
    AddDialog
  },
  methods: {
    handleCommand (command) {
      if (command=="delete")
      {
        ElMessage(`click on item ${command}`)

      }
    },
    loadSdps () {
      getSdps().then(response => {
        this.sdps = response.data.Sdps
        console.log(response.data.Sdps)
      })
    },
    handleEdit (index,row) {
      console.log(index, row)
      this.$refs.EditDialog.dialogFormVisible = true
      this.$refs.EditDialog.form = row
    },

    handleDelete (index,row) {
      console.log(index, row)
      console.log(row.sdpid)
      DelSdp(row.sdpid,this)
    },
  },
  created() {
    this.loadSdps()
  }

}


</script>
<style>


</style>
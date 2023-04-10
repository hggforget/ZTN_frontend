<template>
  <el-container>
    <el-main>
      <el-scrollbar>
        <el-table
            :data="SDPComponents"
            :default-sort="{ prop: 'sdpid', order: 'descending' }"
            stripe
            style="width: 100%">
          <el-table-column type="selection" width="40" />
          <el-table-column
              label="组件SdpID"
              prop="sdpid"
              sortable
          >

          </el-table-column>
          <el-table-column
              label="组件名称"
              prop="name"
          >
          </el-table-column>
         <el-table-column
             label="组件类型"
             prop="type"
         >

         </el-table-column>
          <el-table-column label="状态">
            <el-container>
              <el-icon color="green" size="20" ><CircleCheckFilled /></el-icon>
              <span>Running</span>
            </el-container>
          </el-table-column>
          <el-table-column
              label="IP地址"
              prop="address"
          >
          </el-table-column>
          <el-table-column label="Operations">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row);"
              ><el-icon style="margin-right: 3px"><VideoPlay /></el-icon>开机</el-button
              >
              <el-button size="small" @click="handleEdit(scope.$index, scope.row);"
              ><el-icon style="margin-right: 3px"><VideoPause /></el-icon>挂起</el-button
              >
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              ><el-icon ><CircleClose /></el-icon>关机</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-main>

  </el-container>
</template>

<script lang="ts" setup>
import {getComponents} from '@/api/api'


let SDPComponents: []

const loadComponents =() =>{
      getComponents().then(response => {
        SDPComponents = response.data.Sdps
        console.log(response.data.Sdps)
      })
    }
const handleEdit =(index,row) =>{
      console.log(index, row)
    }

const handleDelete =(index,row) =>{
      console.log(index, row)

    }

    loadComponents()


</script>

<style scoped>
.el-icon{
  margin-right: 8px;
}


</style>
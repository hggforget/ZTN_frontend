<template>
  
  <el-container>

    <el-main>
      <el-scrollbar>

        <el-table
            :row-class-name="tableRowClassName"
            @row-dblclick="rowdbclicked"
            :data="state.logs.slice((state.currentPage-1)*state.pageSize,state.currentPage*state.pageSize)"
            :default-sort="{ prop: 'id', order: 'descending' }"
            stripe
            style="width: 100%">
          <el-table-column type="selection" width="40" />
          <el-table-column v-for="Config in tableConfig" :label=Config.label :prop=Config.prop>

          </el-table-column>
          <el-table-column label="Operations">


          </el-table-column>
        </el-table>
        <div class="example-pagination-block">
          <el-pagination
              layout="total,prev, sizes, pager, next"
              :current-page="state.currentPage"
              :page-sizes="[1,5,10,20]"
              :total="state.logs.length"
              :page-size="state.pageSize"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
        </div>
      </el-scrollbar>
    </el-main>

  </el-container>
</template>

<script lang="ts" setup>

import {ElMessage, rowProps} from "element-plus";
import {getLogs} from "@/api/api";
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router'
import {useLogStore} from '@/stores/Logs'
import { storeToRefs } from "pinia";
//首先在setup中定义
const router = useRouter()
// table配置
const tableConfig = [
        {
          label :"LogID" ,
          prop :"id" ,
        },
        {
          label:"SdpID" ,
          prop:"sdpid",
        },
        {
          label: "action",
          prop: "action",
        },

        {
          label: "upload_date",
          prop: "upload_date",
        },
      ]


const state = reactive({
        logs : [],
        currentPage : 1, // 当前页码
        total : 20 ,// 总条数
        pageSize : 10 // 每页的数据条数
})


const tableRowClassName =({row, rowIndex})=> {
      row.row_index = rowIndex;
    }
    //每页条数改变时触发 选择一页显示多少行
const rowdbclicked =(row)=> {
        console.log(`第 ${row.id} 个条目被双击 跳转至详细信息`);
        const store = useLogStore();
        store.$patch({
          id: row.id,
          sdpid: row.sdpid,
          action:row.action,
          upload_date:row.upload_date,
          data:row.data
        });
        console.log(store.action)
        router.push('/LogDetails')
    }
const handleSizeChange =(val)=> {
      console.log(`每页 ${val} 条`);
      state.currentPage = 1;
      state.pageSize = val;
    }
    //当前页改变时触发 跳转其他页
const handleCurrentChange =(val)=> {
      console.log(`当前页: ${val}`);
      state.currentPage = val;
    }
const handleCommand =(command)=> {
      if (command=="delete")
      {
        ElMessage(`click on item ${command}`)

      }
    }
const loadLogs =() =>{
      getLogs().then(response => {
      state.logs= response.data.Logs
        console.log(response.data.Logs)
      })
    }
    loadLogs()
</script>

<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
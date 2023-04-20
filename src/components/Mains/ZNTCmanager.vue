<template>
 <OptionalTable 

 :OperationCol="'ZNTCOperationCol'"
 :table-config="state.tableConfig" 
 :table_stat="state.table_stat" 
 :table-data="state.tableData" 
 @calc_stat="calc_stat"
 >
 </OptionalTable>
</template>

<script lang="ts" setup>
import { getComponents } from '@/api/api'
import { reactive, ref, toRaw } from 'vue'
import CustomHeader from "@/components/utils/CustomHeader.vue"
import type { condition, tableConfig_prop } from '../utils/interfaces';
import Statistic from '../statictis/statistic.vue';
import type { table_stat } from '../utils/types';
import OptionalTable from '../utils/OptionalTable.vue';
import type ZNTCOperationColVue from '../utils/ZNTCOperationCol.vue';

interface ZNTCstate{
      tableData: tableConfig_prop[],
      table_stat: table_stat[],
      tableConfig:tableConfig_prop[]
}
// table配置
const tableConfig:tableConfig_prop[] = [
        {
          label :"组件SdpID" ,
          prop :"sdpid" ,
          conditionType: "txt", // 条件类型
        },
        {
          label:"组件名称" ,
          prop:"name",
          conditionType: "txt", // 条件类型
        },
        {
          label: "组件类型",
          prop: "type",
          conditionType: "select", // 条件类型
          conditionListName :"citylist"
        },

        {
          label: "IP地址",
          prop: "address",
          conditionType: "txt", // 条件类型
          fuzzyQuery: true, //是否模糊查询
        },
      ]
const state=reactive<ZNTCstate>({
      // table数据
      tableData: [],
      table_stat:[],  //表格统计数据
      tableConfig:tableConfig
})

//  更新表格的统计数据
const calc_stat =(tableData)=>{
  let Daily_log:table_stat = {
      value : 98500,
      description : 'Daily active users',
      content : 'Number of users who logged into the product in one day',
      footer : 'than yesterday',
      footer_type : 'green',
      footer_value :  "24%",
      haveContent :true
      
  }
  let Monthly_log:table_stat = {
      value :693700,
      description : 'Monthly Active Users',
      content : 'Number of users who logged into the product in one month',
      footer : 'month on month',
      footer_type : 'red',
      footer_value :  "12%",
      haveContent :true
      
  }
  let transactions_log:table_stat = {
      value : 72000,
      description : 'New transactions today',
      content : '',
      footer : 'than yesterday',
      footer_type : 'green',
      footer_value :  "16%",
      haveContent :false
      
  }
  let total_log:table_stat = {
      value : tableData.length,
      description : 'total',
      content : 'this is the total amount of the logs',
      footer : 'month on month',
      footer_type : 'red',
      footer_value :  "12%",
      haveContent :true
      
  }
  state.table_stat = [Daily_log,Monthly_log,transactions_log,total_log]
  console.log(state.table_stat,'state.table_stat')
}

const loadComponents = () => {
  getComponents().then(response => {
    state.tableData = response.data.Sdps
  })
}
loadComponents()
</script>

<style scoped>
.el-icon {
  margin-right: 8px;
}
</style>

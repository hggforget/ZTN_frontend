<template>
    <el-container>
      <el-main>
        <el-scrollbar>
        <Statistic :statistics="state.table_stat"></Statistic>
           <!-- 条件tag -->
      <div style="margin-bottom: 10px" v-if="state.conditionList.length != 0">
        <span>条件：</span>
        <el-tag
          @close="conditionClose(index)"
          style="margin-left: 10px"
          v-for="(tag, index) in state.conditionList"
          :key="index"
          closable
        >
          {{ tag.label }} ：<span style="color: red">{{ tag.value.value1 }}</span>
          <span v-if="tag.value.value2" style="color: red"
            >- {{ tag.value.value2 }}</span
          >
  
        </el-tag>
      </div>
          <el-table :data="state.tableData" :default-sort="{ prop: 'sdpid', order: 'descending' }" stripe style="width: 100%">
  
            <el-table-column type="selection" width="40" />
            <template v-for="(item, index) in props.tableConfig" :key="index">
  
              <el-table-column sortable :label="item.label" align="center" :prop="item.prop"
                 :filters="[]">
                <template #header>
                  <CustomHeader v-if="state.customFlag"  :item="item" :customParams="state.customParams"
                    :labelColorList="state.labelColorList" @tableUpdate="tableUpdate"></CustomHeader>
                </template>
              </el-table-column>
            </template>
              <component :is="props.OperationCol"></component>
          </el-table>
        </el-scrollbar>
      </el-main>
  
    </el-container>
  </template>
  <script lang="ts">

</script>
  <script lang="ts" setup>
  import { reactive, ref, toRaw,watch } from 'vue'
  import CustomHeader from "@/components/utils/CustomHeader.vue"
  import type { condition, tableConfig_prop } from '../utils/interfaces';
  import Statistic from '../statictis/statistic.vue';
  import type { table_stat } from '../utils/types';

  type Props = {
        tableConfig :tableConfig_prop[],
        tableData: tableConfig_prop[],
        table_stat : table_stat[],
        OperationCol : string
    }
  const props = defineProps<Props>()
  interface stateData {
        customFlag: boolean,
        customParams:any, 
        conditionList: Array<condition>, 
        labelColorList: String[],
        tableData: tableConfig_prop[],
        tableDataCopy: tableConfig_prop[],
        table_stat:table_stat[],  
  }

  const state=reactive<stateData>({
     customFlag: true, // 自定义筛选是否显示
        customParams: {}, //自定义筛选参数
        conditionList: [], //自定义筛选条件
        labelColorList: [], //已经在使用的筛选条件，染色用
        // table数据
        tableData: [],
        // table数据 拷贝，我们不操作原数据
        tableDataCopy: [],
        table_stat:[],  //表格统计数据
  })
  const emit = defineEmits(['calc_stat'])
  watch(
    () => props.tableData,
    (value, oldValue) => {
      console.log(value, oldValue,'props')
      state.tableData = props.tableData
    }, {immediate:true,deep:true}
  )
  watch(
    () => props.table_stat,
    (value, oldValue) => {
      console.log(value, oldValue,'table_stat')
      state.table_stat = props.table_stat
    }, {immediate:true,deep:true}
  )
  watch(
    () => state.tableData,
    (value, oldValue) => {
      console.log(value, oldValue,'state')
        emit("calc_stat",state.tableData)
    }, {immediate:true,deep:true}
  )
  
  // 给使用筛选条件的标题加颜色
  const setlabelColor = () => {
        state.labelColorList = [];
        state.conditionList.forEach((_item:condition) => {
          state.labelColorList.push(_item.prop);
        });
      }
      // 自定义检索发射出来的事件
  const tableUpdate = (data) => {
        console.log(data, "condition");
        let flag = true;
        // 筛选条件如果已经存在，就更新
        state.conditionList.forEach((item:condition, index) => {
          if (item.prop == data.prop) {
            item.value = data.value;
            flag = false;
          }
        });
        // 如果没有就添加
        if (flag) {
          state.conditionList.push(data);
        }
        customSearch(); //筛选数据
      }
  
  // 筛选数据
  const customSearch = () => {
        /*
          这里可以说是筛选的核心部分吧，自定义的筛选规则都在这。
          以后想改什么筛选规则就来这找
        */
        console.log(state.conditionList, "this.conditionList");
        setlabelColor(); //设置使用自定义检索的表头颜色
        // 如果自定义检索 为空了，就重新调用查询
        if (state.conditionList.length == 0) {
          search()
          return false;
        }
        const result:tableConfig_prop[] = [];
        // 遍历列表数据
        for (let i = 0; i < state.tableDataCopy.length; i++) {
          const dataItem:tableConfig_prop = state.tableDataCopy[i];
          // 遍历自定义筛选条件，符合规则就push出来
          let flag = true;
          for (let l = 0; l < state.conditionList.length; l++) {
            const item = state.conditionList[l];
            // 属性名 属性值 类型 是否模糊查询
            const { prop, value, conditionType, fuzzyQuery } = item;
            console.log(dataItem[prop])
            // txt类型
            if (conditionType == "txt") {
              if (dataItem[prop] == value.value1) {
                flag = true;
              } else {
                flag = false;
              }
   
              //范围类型
            } else if (conditionType == "scope") {
              if (
                dataItem[prop] >= value.value1 &&
                dataItem[prop] <= value.value2
              ) {
                flag = true;
              } else {
                flag = false;
              }
   
              // 时间类型
            } else if (conditionType == "date") {
              // 转换为时间戳然后判断
              let current = new Date(dataItem[prop]).getTime();
              let value1 = new Date(value.value1 as string).getTime();
              let value2 = new Date(value.value2 as string).getTime();
              if (current >= value1 && current <= value2) {
                flag = true;
              } else {
                flag = false;
              }
            }
            // 下拉框类型
            else if (conditionType == "select") {
              // fuzzyQuery 为true代表模糊查询，否则为精确查询
              if (fuzzyQuery) {
                if (dataItem[prop].indexOf(value.value1) != -1) {
                  flag = true;
                } else {
                  flag = false;
                }
              } else {
                if (dataItem[prop] == value.value1) {
                  flag = true;
                } else {
                  flag = false;
                }
              }
            }
   
            if (flag === false) break;
          }
          if (flag) result.push(dataItem);
        }
        console.log(result, "result");
        state.tableData = result;
        // this.totalSize = result.length;
   
      }
  
  // 关闭条件tag
  const conditionClose = (index) => {
        state.conditionList.splice(index, 1);
        customSearch(); //筛选数据
      }
  
  const search = () => {
       state.tableData = props.tableData
      }
      const getCustomData = ()=> {
        /*
          这里的数据有必要注意下：
            1.数据格式这里处理好 全部保持一致，这样customHeader就不用再处理了
            3.因为我们后面筛选的时候查找的是文字，所以这里的value始终和列表展示的值保持一致，也是文字。
            3.可以写个Promise.All，把下拉框所需要的数据都请求到 然后再打开customFlag
          */
        state.customParams = {
          //城市列表
          
          // ...
        };
        state.customFlag = true;
      }
  getCustomData()
  search()
  
  </script>
  
  <style scoped>
  .el-icon {
    margin-right: 8px;
  }
  </style>
  